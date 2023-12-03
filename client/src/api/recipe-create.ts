import { RecipeCreateDto } from 'cookbook-shared/dtos';
import { Recipe } from '~models';

export async function recipeCreate(recipe: Omit<Recipe, 'id'>) {
  const body: RecipeCreateDto = {
    ingredients: recipe.ingredients,
    name: recipe.name,
    steps: recipe.steps,
    description: recipe.description,
  };
  const response = await fetch('/api/recipe', {
    method: 'POST',
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw Error('' + response.status);
  }

  const result = JSON.parse(await response.json()) as { id: string };
  return result.id;
}
