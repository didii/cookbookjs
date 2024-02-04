import { z } from 'zod';

const unitTypeSchema = z.enum(['none', 'volume', 'weight']);

export type UnitType = z.infer<typeof unitTypeSchema>;

export interface UnitDto {
  id: string;
  fullName?: string;
  shortName: string;
  type: UnitType;
}

const unitCreateSchema = z.object({
  fullName: z.string().optional(),
  shortName: z.string(),
  type: unitTypeSchema,
});

export type UnitCreateDto = z.infer<typeof unitCreateSchema>;

export namespace UnitCreateDto {
  export function is(obj: any) {
    return unitCreateSchema.safeParse(obj);
  }
}
