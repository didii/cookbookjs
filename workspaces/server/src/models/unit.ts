import { UnitType } from 'cookbook-shared/dtos';

export interface UnitModel {
  fullName?: string;
  shortName: string;
  type: UnitType;
}
