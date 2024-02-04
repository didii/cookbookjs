import { RecipeCreateDto } from 'cookbook-shared/dtos';
import { ObjectId } from 'mongodb';
import { Collection } from '~const';
import { createEndpoint } from '~helpers/create-endpoint';

export const recipeUpdate = createEndpoint((app, db) => {
  app.put('/api/recipe/:id', async (req, res) => {
    const id = req.params.id;
    const recipesCollection = db.collection(Collection.Recipes);

    if (!ObjectId.isValid(id)) {
      return res.sendError({
        type: 'generic',
        errorType: 'InvalidId',
        message: 'Invalid ID',
        status: 400,
        data: {
          id,
        },
      });
    }

    try {
      const _id = new ObjectId(id);
      const recipe = await recipesCollection.findOne({ _id });
      if (recipe == null) {
        return res.status(404).send('Not found');
      }

      const validation = RecipeCreateDto.parse(req.body);
      if (!validation.success) {
        return res.status(400).send(validation.error);
      }

      const dto = validation.data;
      const newRecipe: RecipeCreateDto = {
        name: dto.name,
        description: dto.description,
        steps: dto.steps?.map((s) => ({ text: s.text! })) ?? [],
        ingredients: dto.ingredients?.map((i) => ({ text: i.text! })) ?? [],
      };

      const result = await recipesCollection.replaceOne({ _id }, newRecipe);
      if (result.acknowledged) {
        return res.status(204).send();
      }
      res.sendError({ type: 'mongoDb' });
    } catch (error) {
      res.sendError({ type: 'unknown', error });
    }
  });
});
