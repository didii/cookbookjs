import React, { useEffect, useState } from 'react';
import { useAbortEffect } from 'src/hooks/abort-effect';
import { recipesGet } from '~api';
import NavBar from '~components/nav-bar';
import { Recipe } from '~models';

export interface RecipeViewProps { }

function RecipeView({ ...props }: RecipeViewProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useAbortEffect(async (signal) => {
    setIsLoading(true);
    try {
      const result = await recipesGet(signal);
      setRecipes(result);
    }
    finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div>
      This is the recipe view
      <div>
        <NavBar/>
      </div>
      {isLoading && <span>Loading...</span>}
      {!isLoading && <pre>{JSON.stringify(recipes)}</pre>}
    </div>
  );
}

export default RecipeView;
