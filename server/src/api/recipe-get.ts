import { Express } from 'express';
import { Db, ObjectId, WithId } from 'mongodb';
import { Collection } from '~const';
import { RecipeModel } from '~models';

interface RecipeDto {
  id: string;
  name: string;
  description?: string;
  ingredients: { text: string; }[];
  steps: { text: string; }[];
}

export function recipeGet(app: Express, db: Db) {
  app.get('/api/recipes', async (req, res) => {
    const recipesCollection = db.collection(Collection.Recipes);
    const recipes = await recipesCollection.find({}).toArray() as WithId<RecipeModel>[];
    const dtos = recipes.map<RecipeDto>(r => ({
      id: r._id.toString(),
      name: r.name,
      description: r.description,
      ingredients: r.ingredients.map(i => ({ text: i.text })),
      steps: r.steps,
    }));
    res.send(dtos);
  });
}

export function recipeGetById(app: Express, db: Db) {
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
    }
    catch (error) {
      res.status(500).send('Exception occurred: ' + error);
    }
  });
}
