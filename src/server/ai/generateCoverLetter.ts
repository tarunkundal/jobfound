import { MatchedJobInterface } from '@/types/jobs';
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatGroq } from "@langchain/groq";
import { prisma } from '@/db';
import { Job } from '@/generated/prisma';

const model = new ChatGroq({
    model: "llama-3.1-8b-instant",
    apiKey: process.env.GROQ_API_KEY!,
    temperature: 0,
});
interface GenerateCoverLetterParams {
    userId: String;
    job: MatchedJobInterface | Job
}

export async function generateCoverLetter({ userId, job }: GenerateCoverLetterParams): Promise<string | undefined> {

    const resume = await prisma.resume.findUnique({
        where: { userId: userId! },
        select: { raw_extracted_text: true },
    });
    const resumeText = resume?.raw_extracted_text || "";

    const prompt = ChatPromptTemplate.fromTemplate(`
Using the resumeText and job write a concise, professional, personalized cover letter tailored for this job:

Job Details:
Job Title: ${job.title}
Company: ${job.company}
Job Description: ${job.description}

Applicant Resume:
${resumeText}

The cover letter should address the following:
- Start with strong introduction mentioning the job title and company.
- Highlight relevant skills and experiences from the resume that align with the job description.
- Demonstrate enthusiasm for the role and the company.
- Mention specific aspects of the job or company that attract the applicant.
- End with polite closing and call to action.
Tone: professional, confident, to the point.
Length: 150-200 words.
Return only the cover letter text without any additional commentary.
  `);

    try {
        const chain = prompt.pipe(model);
        const result = await chain.invoke({ resumeText, job });
        if (typeof result.content === 'string') {
            return result.content;
        } else if (Array.isArray(result.content)) {
            // If the content is an array of ContentBlock or Text, concatenate their text representations
            return result.content.map(block =>
                typeof block === "string"
                    ? block
                    : block.type === "text"
                        ? block.text
                        : ""
            ).join("\n");
        }
    } catch (error: any) {
        console.log("Error generating cover letter:", error);
        throw (error);
        // return "Dear Hiring Manager,\n\nI am excited to apply for this position. With my skills and experience, I am confident in my ability to contribute effectively to your team. I look forward to the opportunity to discuss how I can add value to your organization.\n\nSincerely,\n[Your Name]";
    }
}
