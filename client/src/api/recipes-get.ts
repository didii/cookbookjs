import { RecipeDto } from 'cookbook-shared/dtos';
import { Recipe } from '~models';

export async function recipesGet(signal?: AbortSignal): Promise<Recipe[]> {
  const response = await fetch('/api/recipes', {signal});
  if (!response.ok) {
    throw Error('' + response.status);
  }

  const body = await response.json() as RecipeDto[];
  return body;
}
