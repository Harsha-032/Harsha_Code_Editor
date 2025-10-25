'use server';
/**
 * @fileOverview AI powered code optimization assistant.
 *
 * - suggestCodeOptimizations - A function that handles the code optimization process.
 * - SuggestCodeOptimizationsInput - The input type for the suggestCodeOptimizations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestCodeOptimizationsInputSchema = z.object({
  code: z.string().describe('The code to be optimized.'),
  language: z.string().describe('The programming language of the code.'),
});
type SuggestCodeOptimizationsInput = z.infer<
  typeof SuggestCodeOptimizationsInputSchema
>;

export async function suggestCodeOptimizations(
  input: SuggestCodeOptimizationsInput
) {
  const prompt = `You are an AI assistant that helps developers optimize their code.

  You will analyze the code provided and suggest optimizations to improve its performance and readability.
  You will also provide an explanation of the optimizations made.

  Language: ${input.language}
  Code: ${input.code}

  Please provide the optimized code first, inside a markdown code block with the language identifier, and then the explanation below it.
  For example:
  ## Optimized Code
  \'\'\`${input.language}
  // optimized code here
  \'\'\`
  
  ## Explanation
  Your explanation here.
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
