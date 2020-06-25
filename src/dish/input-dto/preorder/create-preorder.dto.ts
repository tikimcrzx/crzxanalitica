import { ObjectId } from 'mongodb';

export interface CreatePreOrderDTO {
  readonly quantity: number;
  readonly dish: ObjectId;
  readonly status: boolean;
}
