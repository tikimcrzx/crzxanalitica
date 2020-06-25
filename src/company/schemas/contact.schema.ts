import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Contact extends Document {
  @Prop({ required: true, unique: true, maxlength: 100 })
  name: string;

  @Prop({ required: true, unique: true, maxlength: 20 })
  phone: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
