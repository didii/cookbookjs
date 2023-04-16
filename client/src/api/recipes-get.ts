import { Recipe } from '~models';
import { RecipeDto } from 'cookbook-shared';

export async function recipesGet(): Promise<Recipe[]> {
  const response = await fetch('/api/recipes');
  if (!response.ok) {
    throw Error('' + response.status);
  }

  const body = await response.json() as RecipeDto[];
  return body;
}
