import { RecipeCreateDto } from 'cookbook-shared/dtos';
import { createEndpoint } from 'src/helpers/create-endpoint';
import { Collection } from '~const';
import { RecipeModel } from '~models';

export const recipeCreate = createEndpoint((app, db) => {
  app.post('/api/recipes', async (req, res, next) => {
    const validation = RecipeCreateDto.parse(req.body);
    if (!validation.success) {
      return res.sendError({
        type: 'zod',
        error: validation.error,
        message: 'Invalid recipe',
      });
    }

    const dto = validation.data;

    // Map
    const recipe: RecipeModel = {
      ...dto,
    };

    // Dump it in!
    const recipeCollection = db.collection(Collection.Recipes);
    const inserted = await recipeCollection.insertOne(recipe);
    if (!inserted.acknowledged) {
      return res.sendError({ type: 'mongoDb' });
    }
    res.send({ id: inserted.insertedId });
  });
});
