import { OpenAIEmbeddings } from "@langchain/openai";

// LangChain automatically reads process.env.OPENAI_API_KEY
const embeddings = new OpenAIEmbeddings({
    modelName: "text-embedding-ada-002", // The model you want to use
    // You can specify dimensions here if needed, but it's often automatic
    // dimensions: 1536, 
});

/**
 * Generates a vector embedding for a given piece of text using LangChain's abstraction.
 */
export async function generateEmbedding(text: string): Promise<number[]> {
    // LangChain provides an 'embedQuery' method for single text inputs
    // Truncate text if it's extremely long (models have token limits)
    const cleanedText = text.replace(/\n/g, ' ').substring(0, 8000);
    const vector = await embeddings.embedQuery(cleanedText);

    if (vector.length !== 1536) {
        console.warn(`Unexpected vector dimension: ${vector.length}. Expected 1536.`);
    }
    return vector;
}

// LangChain also has a method for multiple documents (used in job fetching script later)
export async function generateEmbeddingsForDocs(texts: string[]): Promise<number[][]> {
    const vectors = await embeddings.embedDocuments(texts);
    return vectors;
}
