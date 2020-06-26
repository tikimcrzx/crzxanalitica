import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

@Schema()
export class PreOrder extends Document {
  @Prop({ default: 1 })
  quantity: number;

  @Prop({ ref: 'Dish', required: true })
  dish: ObjectId;

  @Prop({ default: false })
  status: boolean;

  @Prop({ default: false })
  finish: boolean;
}

export const PreOrderSchema = SchemaFactory.createForClass(PreOrder);
