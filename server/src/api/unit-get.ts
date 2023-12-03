import { UnitDto } from 'cookbook-shared/dtos';
import { ObjectId, WithId } from 'mongodb';
import { Collection } from '~const';
import { createEndpoint } from '~helpers/create-endpoint';
import { UnitModel } from '~models';

export const unitGet = createEndpoint(function unitGet(app, db) {
  app.get('/api/units', async (req, res) => {
    const unitCollection = db.collection('units');
    const units = await unitCollection.find({}).toArray() as WithId<UnitModel>[];
    const dtos = units.map<UnitDto>(toDto);
    res.send(dtos);
  });
});

export const unitGetById = createEndpoint(function unitGetById(app, db) {
  app.get('/api/units/:id', async (req, res) => {
    const unitId = req.params.id;
    const unitCollection = db.collection(Collection.Units);
    try {
      const unit = await unitCollection.findOne({ _id: new ObjectId(unitId) }) as WithId<UnitModel> | null;
      if (!unit) {
        res.status(404).send('Not found');
      } else {
        res.send(toDto(unit));
      }
    }
    catch (error) {
      console.error(error);
      res.status(500).send('Exception occurred');
    }
  });
});


function toDto(unit: WithId<UnitModel>): UnitDto {
  return {
    id: unit._id.toString(),
    fullName: unit.fullName,
    shortName: unit.shortName,
    type: unit.type,
  };
}
