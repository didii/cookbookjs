<script lang="tsx">
import { computed, defineComponent, ref } from 'vue';
import { Recipe } from '~models';
import { recipesGet } from '~api';

const Home = defineComponent({
  setup() {
    const isLoading = ref(false);
    const recipes = ref<Recipe[] | undefined>(undefined);

    async function fetchRecipes() {
      isLoading.value = true;
      const fetched = await recipesGet();
      isLoading.value = false;
      recipes.value = fetched;
    }

    const display = computed(() => {
      if (isLoading.value) return 'loading' as const;
      if (!isLoading.value && recipes.value != null) return 'data' as const;
      return 'empty' as const;
    });

    return () => (
      <div>
        <div>This is home</div>
        <div>
          <button onClick={() => fetchRecipes()}>Load recipes</button>
        </div>
        {display.value === 'empty' && <p>Click load to load all recipes</p>}
        {display.value === 'loading' && <p>Loading...</p>}
        {display.value === 'data' && (
          <div>
            <p>All recipes:</p>
            <ul>
              {recipes.value!.map(r => (
                <li>
                  <router-link to={{ name: 'recipe', params: { id: r.id } }}>{r.id}</router-link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
});

export default Home;
</script>
