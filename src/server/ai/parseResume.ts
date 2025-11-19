import { resumeSchema } from "@/schema/resumeParser.schema";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatGroq } from "@langchain/groq";
import { Context } from "../trpc/context";


/** 🧹 Clean the extracted resume text for consistency */
function cleanResumeText(text: string): string {
    return text
        .replace(/\s+/g, " ")
        .replace(/[^\x20-\x7E]/g, "") // remove weird characters
        .trim();
}

export async function parseResumeFromSupabase(fileUrl: string, ctx: Context) {
    if (!fileUrl) throw new Error("No file URL provided");

    /** Step 1️⃣ Fetch file from Supabase */
    const response = await fetch(fileUrl);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const arrayBuffer = await response.arrayBuffer();

    /** Step 2️⃣ Load PDF and extract text */
    const loader = new PDFLoader(new Blob([arrayBuffer], { type: "application/pdf" }), {
        splitPages: false,
    });
    const docs = await loader.load();
    const rawText = docs.map((d) => d.pageContent).join("\n\n");
    const resumeText = cleanResumeText(rawText);

    // update the resume raw text in database for future use
    if (!ctx.user || !ctx.user.id) {
        console.warn("No authenticated user found; skipping DB update for resume raw text.");
    } else {
        await ctx.prisma.resume.updateMany({
            where: { userId: ctx.user.id },
            data: {
                raw_extracted_text: resumeText,
            },
        });
    }
    /** Step 3️⃣ Prepare schema parser */
    const parser = StructuredOutputParser.fromZodSchema(resumeSchema);
    const formatInstructions = parser.getFormatInstructions();

    /** Step 4️⃣ Initialize Groq model */
    const model = new ChatGroq({
        model: "llama-3.1-8b-instant",
        apiKey: process.env.GROQ_API_KEY!,
        temperature: 0,
    });

    /** Step 5️⃣ Create the prompt */
    const prompt = ChatPromptTemplate.fromTemplate(`
You are a professional resume parser.  
Extract structured data from the resume below.  

STRICT RULES:
- Return ONLY valid JSON (no markdown, no commentary).
- Each field must exist.
- If a value is missing, return "" for strings or [] for arrays.
- Follow this schema exactly:
{formatInstructions}

Resume:
---
{resumeText}
---
`);

    /** Step 6️⃣ Run model and safely parse */
    try {
        const chain = prompt.pipe(model);
        const output = await chain.invoke({
            formatInstructions,
            resumeText,
        });

        console.log("🧠 Raw Model Output:", output.content);

        // Try to parse model output
        // 🧠 Extract text safely regardless of output type
        const rawText =
            typeof output.content === "string"
                ? output.content
                : output.content
                    .map((block) =>
                        typeof block === "string"
                            ? block
                            : block.type === "text"
                                ? block.text
                                : ""
                    )
                    .join(" ");

        console.log("🧠 Raw Model Output:", rawText);

        // Try to parse model output
        let parsed;
        try {
            parsed = JSON.parse(rawText);
        } catch {
            console.warn("⚠️ Model returned malformed JSON. Trying to repair...");
            const fixed = rawText
                .replace(/```json|```/g, "")
                .replace(/[\u0000-\u001F]+/g, "")
                .trim();
            parsed = JSON.parse(fixed);
        }

        // Validate + fill defaults
        const validated = resumeSchema.parse(parsed);
        console.log("✅ Parsed Resume Data:", validated);

        return validated;
    } catch (err) {
        console.error("❌ Parsing failed:", err);
        return resumeSchema.parse({}); // Return safe default structure
    }
}
