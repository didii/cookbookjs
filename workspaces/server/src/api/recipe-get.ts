import { RecipeDto } from 'cookbook-shared/dtos';
import { ObjectId, WithId } from 'mongodb';
import { Collection } from '~const';
import { createEndpoint } from '~helpers/create-endpoint';
import { RecipeModel } from '~models';

export const recipeGet = createEndpoint((app, db) => {
  app.get('/api/recipes', async (req, res) => {
    const recipesCollection = db.collection(Collection.Recipes);
    const recipes = (await recipesCollection.find({}).toArray()) as WithId<RecipeModel>[];
    const dtos = recipes.map<RecipeDto>((r) => ({
      id: r._id.toString(),
      name: r.name,
      description: r.description,
      ingredients: r.ingredients.map((i) => ({ text: i.text })),
      steps: r.steps,
    }));
    res.send(dtos);
  });
});

export const recipeGetById = createEndpoint((app, db) => {
  app.get('/api/recipes/:id', async (req, res) => {
    const id = req.params.id;
    const recipesCollection = db.collection(Collection.Recipes);
    try {
      const recipe = await recipesCollection.findOne({ _id: new ObjectId(id) });
      if (recipe != null) {
        res.send(recipe);
        return;
      }

      res.status(404).send('Not found');
    } catch (error) {
      res.status(500).send('Exception occurred: ' + error);
    }
  });
});
