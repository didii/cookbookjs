import { RecipeCreateDto } from 'cookbook-shared/dtos';
import { Express } from 'express';
import { Db } from 'mongodb';
import { Collection } from '~const';
import { RecipeModel } from '~models';

export function recipeCreate(app: Express, db: Db) {
  app.post('/api/recipes', async (req, res) => {
    const validation = RecipeCreateDto.parse(req.body);
    if (!validation.success) {
      res.status(400).send(validation.error);
      return;
    }

    const dto = validation.data;

    // Map
    const recipe: RecipeModel = {
      name: dto.name,
      description: dto.description,
      steps: dto.steps?.map(s => ({ text: s.text! })) ?? [],
      ingredients: dto.ingredients?.map(i => ({ text: i.text! })) ?? [],
    };

    // Dump it in!
    const recipeCollection = db.collection(Collection.Recipes);
    const inserted = await recipeCollection.insertOne(recipe);
    res.send({ id: inserted.insertedId });
  });
}
