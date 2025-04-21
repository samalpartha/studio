// The exported function generateHint generates a hint for a given question.
// It takes a question and question category as input, and returns a hint as output.
'use server';

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateHintInputSchema = z.object({
  question: z.string().describe('The question to generate a hint for.'),
  category: z.string().describe('The category of the question (e.g., Math, Science).'),
});
export type GenerateHintInput = z.infer<typeof GenerateHintInputSchema>;

const GenerateHintOutputSchema = z.object({
  hint: z.string().describe('The generated hint for the question.'),
});
export type GenerateHintOutput = z.infer<typeof GenerateHintOutputSchema>;

export async function generateHint(input: GenerateHintInput): Promise<GenerateHintOutput> {
  return generateHintFlow(input);
}

const generateHintPrompt = ai.definePrompt({
  name: 'generateHintPrompt',
  input: {
    schema: z.object({
      question: z.string().describe('The question to generate a hint for.'),
      category: z.string().describe('The category of the question (e.g., Math, Science).'),
    }),
  },
  output: {
    schema: z.object({
      hint: z.string().describe('The generated hint for the question.'),
    }),
  },
  prompt: `You are an expert tutor for 4th and 5th grade students.

  Generate a helpful hint for the following question. The hint should guide the student towards the solution without giving away the answer directly.
  Consider the category of the question when generating the hint.

  Question: {{{question}}}
  Category: {{{category}}}

  Hint:`,
});

const generateHintFlow = ai.defineFlow<
  typeof GenerateHintInputSchema,
  typeof GenerateHintOutputSchema
>({
  name: 'generateHintFlow',
  inputSchema: GenerateHintInputSchema,
  outputSchema: GenerateHintOutputSchema,
},
async input => {
  const {output} = await generateHintPrompt(input);
  return output!;
});