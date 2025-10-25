'use server';

/**
 * @fileOverview An AI agent for executing code snippets.
 *
 * - executeCodeSnippet - A function that executes a code snippet and returns the output.
 * - ExecuteCodeSnippetInput - The input type for the executeCodeSnippet function.
 * - ExecuteCodeSnippetOutput - The return type for the executeCodeSnippet function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExecuteCodeSnippetInputSchema = z.object({
  code: z.string().describe('The code snippet to execute.'),
  language: z.string().describe('The programming language of the code snippet.'),
});
type ExecuteCodeSnippetInput = z.infer<typeof ExecuteCodeSnippetInputSchema>;

const ExecuteCodeSnippetOutputSchema = z.object({
  output: z.string().describe('The output of the executed code snippet, or an error message if execution fails.'),
});
type ExecuteCodeSnippetOutput = z.infer<typeof ExecuteCodeSnippetOutputSchema>;

export async function executeCodeSnippet(input: ExecuteCodeSnippetInput): Promise<ExecuteCodeSnippetOutput> {
  return executeCodeSnippetFlow(input);
}

const executeCodePrompt = ai.definePrompt(
    {
        name: 'executeCodePrompt',
        model: 'googleai/gemini-2.5-flash',
        input: { schema: ExecuteCodeSnippetInputSchema },
        output: { schema: ExecuteCodeSnippetOutputSchema },
        prompt: `You are a code interpreter. Execute the following {{{language}}} code.

If the code runs successfully, return only the output that would be printed to the console.
If the code fails to execute or contains a syntax error, return the error message.

Do not include any explanation, preamble, or markdown formatting. Just return the raw console output or the raw error message.

Code:
\'\'\`{{{language}}}
{{{code}}}
\'\'\``,
    }
);

const executeCodeSnippetFlow = ai.defineFlow(
  {
    name: 'executeCodeSnippetFlow',
    inputSchema: ExecuteCodeSnippetInputSchema,
    outputSchema: ExecuteCodeSnippetOutputSchema,
  },
  async (input) => {
    if (input.language === 'html') {
      return { output: input.code };
    }
    
    const {output} = await executeCodePrompt(input);
    return output!;
  }
);
