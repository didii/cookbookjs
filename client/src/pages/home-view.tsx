import { useMemo, useState } from 'react';
import { useAbortEffect } from 'src/hooks/abort-effect';
import { recipesGet } from '~api';
import Link from '~components/link';
import NavBar from '~components/nav-bar';
import { Recipe } from '~models';

function HomeView() {
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useAbortEffect(async (signal) => {
    if (isLoading) {
      try {
        const fetched = await recipesGet(signal);
        setRecipes(fetched);
      }
      finally {
        setIsLoading(false);
      }
    }
  }, [isLoading]);

  const display = useMemo(() => {
    if (isLoading) return 'loading';
    if (recipes == null) return 'idle';
    if (recipes.length === 0) return 'empty';
    return 'data';
  }, [isLoading, recipes]);

  return (
    <div>
      <div>This is home</div>
      <div>
        <NavBar/>
      </div>
      <div>
        <button onClick={() => setIsLoading(true)}>Load recipes</button>
      </div>
      {display === 'idle' && <p>Click load to load all recipes</p>}
      {display === 'empty' && <p>No recipes found</p>}
      {display === 'loading' && <p>Loading...</p>}
      {display === 'data' && (
        <div>
          <p>All recipes:</p>
          <ul>
            {recipes!.map(r => (
              <li key={r.id}>
                <Link to={{ id: 'recipe-detail', params: { id: r.id } }}>{r.id}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default HomeView;
