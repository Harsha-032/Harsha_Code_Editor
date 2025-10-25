'use server';

/**
 * @fileOverview An AI agent for generating code snippets based on user descriptions.
 *
 * - generateCodeSnippet - A function that generates code snippets.
 * - GenerateCodeSnippetInput - The input type for the generateCodeSnippet function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCodeSnippetInputSchema = z.object({
  description: z.string().describe('A description of the code snippet to generate.'),
  language: z.string().optional().describe('The programming language for the code snippet (e.g., Python, JavaScript).'),
});
type GenerateCodeSnippetInput = z.infer<typeof GenerateCodeSnippetInputSchema>;

export async function generateCodeSnippet(input: GenerateCodeSnippetInput) {
  const prompt = `You are an AI assistant that generates code snippets based on user descriptions.

  Generate a functional and well-formatted code snippet in ${input.language} based on the following description:
  Description: ${input.description}
  
  Only output the code, wrapped in a markdown code block with the language identifier. Do not include any other text or explanation.
  `;
  
  const {stream, response} = ai.generateStream({
    prompt,
    model: 'googleai/gemini-2.5-flash',
  });

  return new ReadableStream({
    async pull(controller) {
      for await (const chunk of stream) {
        controller.enqueue(chunk.text);
      }
      controller.close();
    },
  });
}
