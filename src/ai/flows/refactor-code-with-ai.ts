'use server';

/**
 * @fileOverview An AI agent that refactors code to be cleaner and more readable.
 *
 * - refactorCodeWithAI - A function that handles the code refactoring process.
 * - RefactorCodeWithAIInput - The input type for the refactorCodeWithAI function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RefactorCodeWithAIInputSchema = z.object({
  code: z
    .string()
    .describe('The code to be refactored.'),
  language: z.string().describe('The programming language of the code.'),
});
type RefactorCodeWithAIInput = z.infer<typeof RefactorCodeWithAIInputSchema>;

export async function refactorCodeWithAI(input: RefactorCodeWithAIInput) {
  const prompt = `You are an AI code refactoring assistant. You will receive code and refactor it to be cleaner and more readable. You will also provide an explanation of the changes you made. The code is written in the following language: ${input.language}.\n\nOriginal Code: ${input.code}
  
  Please provide the refactored code first, inside a markdown code block with the language identifier, and then the explanation below it.
  For example:
  ## Refactored Code
  \'\'\`${input.language}
  // refactored code here
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
