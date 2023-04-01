import { Recipe } from '~models';

export interface RecipeDto {
  id: string;
  name: string;
  description: string;
  ingredients: { text: string; }[];
  steps: { text: string; }[]
}

export async function recipesGet(): Promise<Recipe[]> {
  const response = await fetch('/api/recipes');
  if (!response.ok) {
    throw Error('' + response.status);
  }

  const body = await response.json() as RecipeDto[];
  return body;
}
