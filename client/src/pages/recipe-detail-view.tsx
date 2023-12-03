import React, { useCallback, useEffect, useState } from 'react';
import { recipeCreate } from 'src/api/recipe-create';
import { Recipe } from '~models';

interface FormModel {
  title: string;
  description: string;
}

export interface RecipeDetailViewProps {}

function RecipeDetailView({ ...props }: RecipeDetailViewProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [recipe, setRecipe] = useState<Recipe>();
  const [form, setForm] = useState<FormModel>({ title: '', description: '' });

  useEffect(() => {
    setForm({
      title: recipe?.name ?? '',
      description: recipe?.description ?? '',
    });
  }, [recipe?.description, recipe?.name]);

  const onSave = useCallback(async () => {
    const response = await recipeCreate({
      ingredients: [],
      name: form.title,
      steps: [],
      description: form.description,
    });
    console.log(response);
  }, [form.description, form.title]);

  return (
    <div>
      <h1>RecipeDetailView</h1>
      <form>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm((x) => ({ ...x, title: e.target.value }))}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm((x) => ({ ...x, description: e.target.value }))}
          />
        </div>

        <div>
          <button type="submit">Save</button>
          <button type="button" onClick={onSave}>
            Save as new
          </button>
          <button type="button">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default RecipeDetailView;
