import { z } from 'zod';

export interface RecipeDto {
  id: string;
  name: string;
  description?: string;
  ingredients: { text: string; }[];
  steps: { text: string; }[];
}

const recipeCreateSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  ingredients: z.array(z.object({
    text: z.string(),
  })).optional().transform(arg => arg ?? []),
  steps: z.array(z.object({
    text: z.string(),
  })).optional().transform(arg => arg ?? []),
});

export type RecipeCreateDto = z.infer<typeof recipeCreateSchema>;

export namespace RecipeCreateDto {
  export function parse(obj: any) {
    return recipeCreateSchema.safeParse(obj);
  }
}
