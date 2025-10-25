'use server';

/**
 * @fileOverview An AI agent to explain code snippets.
 *
 * - explainCodeSnippet - A function that handles explaining a code snippet.
 * - ExplainCodeSnippetInput - The input type for the explainCodeSnippet function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainCodeSnippetInputSchema = z.object({
  code: z.string().describe('The code snippet to explain.'),
  language: z.string().describe('The programming language of the code.'),
});
type ExplainCodeSnippetInput = z.infer<typeof ExplainCodeSnippetInputSchema>;


export async function explainCodeSnippet(input: ExplainCodeSnippetInput) {
  const {stream, response} = ai.generateStream({
    prompt: `You are an expert software developer and technical writer. Your task is to explain the given code snippet in simple terms so that even a beginner can understand it.

Language: ${input.language}
Code:
${input.code}`,
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
