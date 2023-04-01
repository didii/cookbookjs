import { Express } from 'express';
import { Db } from 'mongodb';
import { Collection } from '~const';
import { RecipeModel } from '~models';

interface RecipeCreateDto {
  name?: string;
  description?: string;
  ingredients?: { text?: string; }[];
  steps?: { text?: string; }[];
}

export function recipeCreate(app: Express, db: Db) {
  app.post('/api/recipes', async (req, res) => {
    const body = req.body as RecipeCreateDto;

    function sendInvalid(message?: string) {
      let msg = 'Invalid DTO';
      if (message) {
        msg += ': ' + message;
      }
      res.status(400).send(msg);
    }

    // Validation
    if (!body.name) {
      return sendInvalid('Property "name" is required');
    }
    if (body.ingredients) {
      if (!Array.isArray(body.ingredients)) {
        sendInvalid('Property "ingredients" must be an array');
        return;
      } else {
        for (let i = 0; i < body.ingredients.length; i++) {
          const ingredient = body.ingredients[i];
          if (typeof ingredient !== 'object') {
            return sendInvalid(`Property "ingredients[${i}]" must be an object`);
          }
          if (!ingredient.text) {
            return sendInvalid(`Property "ingredients[${i}].text" is required`);
          }
        }
      }
    }
    if (body.steps) {
      if (!Array.isArray(body.steps)) {
        return sendInvalid('Property "steps" must be an array');
      } else {
        for (let i = 0; i < body.steps.length; i++) {
          const step = body.steps[i];
          if (typeof step !== 'object') {
            return sendInvalid(`Property "step[${i}]" must be an object`);
          }
          if (!step.text) {
            return sendInvalid(`Property "step[${i}].text" is required`);
          }
        }
      }
    }

    // Map
    const recipe: RecipeModel = {
      name: body.name,
      description: body.description,
      steps: body.steps?.map(s => ({ text: s.text! })) ?? [],
      ingredients: body.ingredients?.map(i => ({ text: i.text! })) ?? [],
    };

    // Dump it in!
    const recipeCollection = db.collection(Collection.Recipes);
    const inserted = await recipeCollection.insertOne(recipe);
    res.send({ id: inserted.insertedId });
  });
}
