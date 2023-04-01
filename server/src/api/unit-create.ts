import { Express } from 'express';
import { Db } from 'mongodb';
import { Collection } from '~const';
import { UnitModel } from '~models';

enum UnitType {
  None = 'none',
  Volume = 'volume',
  Weight = 'weight',
}

interface UnitCreateDto {
  fullName?: string;
  shortName?: string;
  type?: UnitType;
}

export function unitCreate(app: Express, db: Db) {
  app.post('/api/units', async (req, res) => {
    const dto = req.body as UnitCreateDto;
    if (!dto || !dto.fullName || typeof dto.fullName !== 'string' || !dto.shortName || typeof dto.shortName !== 'string' || !dto.type) {
      res.status(400).send('Invalid DTO');
      return;
    }
    switch (dto.type) {
      case UnitType.None:
      case UnitType.Volume:
      case UnitType.Weight:
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
