import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import { getAllBranchStatus, BranchStatus } from '../enums/branch-status.enum';

@Schema()
export class Branch extends Document {
  @Prop({ required: true, trim: true, maxlength: 100 })
  name: string;

  @Prop({ ref: 'Company', required: true })
  company: ObjectId;

  @Prop({ ref: 'Contact', required: true })
  contact: ObjectId;

  @Prop({ enum: getAllBranchStatus(), default: BranchStatus.ENABLED })
  status: string;

  @Prop({ ref: 'Dish', required: true })
  menu: ObjectId[];
}

export const BranchSchema = SchemaFactory.createForClass(Branch);
