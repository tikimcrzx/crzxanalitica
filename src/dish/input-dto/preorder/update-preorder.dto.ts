import { ObjectId } from 'mongodb';

export interface UpdatePreOrderDTO {
  readonly quantity: number;
  readonly dish: ObjectId;
  readonly status: boolean;
}
