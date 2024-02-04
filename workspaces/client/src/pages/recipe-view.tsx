import React, { useCallback, useEffect, useState } from 'react';
import { useAbortEffect } from 'src/hooks/abort-effect';
import { recipesGet } from '~api';
import NavBar from '~components/nav-bar';
import { Recipe } from '~models';

export interface RecipeViewProps { }

function RecipeView({ ...props }: RecipeViewProps) {
  const [callState, setCallState] = useState<'loading' | 'done'>('loading');
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const loadRecipes = useCallback(async (signal: AbortSignal) => {
    setCallState('loading');
    try {
      const result = await recipesGet(signal);
      setRecipes(result);
    }
    finally {
      setCallState('done');
    }
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useAbortEffect(async (signal) => {
    await loadRecipes(signal);
  }, [loadRecipes]);

  return (
    <div>
      This is the recipe view
      <div>
        <NavBar />
      </div>
      {callState == 'loading' && <span>Loading...</span>}
      {callState == 'done' && <pre>{JSON.stringify(recipes)}</pre>}
    </div>
  );
}

export default RecipeView;
