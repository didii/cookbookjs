import { Model } from 'mongoose';

export type ModelOf<T> = T extends Model<infer TModel, any, any, any, any>
  ? (TModel & { id?: string; })
  : never;
