import { UnitCreateDto } from 'cookbook-shared/dtos';
import { Express } from 'express';
import { Db } from 'mongodb';
import { Collection } from '~const';
import { UnitModel } from '~models';


export function unitCreate(app: Express, db: Db) {
  app.post('/api/units', async (req, res) => {
    const dto = req.body as UnitCreateDto;
    const validationResult = UnitCreateDto.is(req.body);
    
    if (!dto || !dto.fullName || typeof dto.fullName !== 'string' || !dto.shortName || typeof dto.shortName !== 'string' || !dto.type) {
      res.status(400).send('Invalid DTO');
      return;
    }
    switch (dto.type) {
      case 'none':
      case 'volume':
      case 'weight':
        break;
      default:
        res.status(400).send('Invalid type');
        return;
    }

    const unit: UnitModel = {
      shortName: dto.shortName,
      type: dto.type,
      fullName: dto.fullName,
    };

    const unitCollection = db.collection(Collection.Units);
    const result = await unitCollection.insertOne(unit);

    if (result.acknowledged) {
      res.status(200).send({ id: result.insertedId.toString() });
      return;
    }
    res.status(500).send('Unknown error');
  });
}
