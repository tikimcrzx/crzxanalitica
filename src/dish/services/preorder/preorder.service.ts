import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PreOrder } from '../../schemas/preorder.schema';
import { CreatePreOrderDTO, UpdatePreOrderDTO } from '../../input-dto';

@Injectable()
export class PreorderService {
  constructor(
    @InjectModel('PreOrder') private readonly _preOrderModel: Model<PreOrder>,
  ) {}

  async create(createPreOrderDto: CreatePreOrderDTO): Promise<PreOrder> {
    let createdPreOrder: PreOrder;

    createdPreOrder = await this._preOrderModel.findOne({
      dish: createPreOrderDto.dish,
    });

    if (createdPreOrder) {
      createdPreOrder.quantity++;
      createdPreOrder.save();
    } else {
      createdPreOrder = await this._preOrderModel.create(createPreOrderDto);
    }

    return createdPreOrder;
  }

  async findAll(): Promise<PreOrder[]> {
    return await this._preOrderModel.find();
  }

  async findById(_id: String): Promise<PreOrder> {
    const preOrder = await this._preOrderModel.findById(_id);
    if (!preOrder) throw new NotFoundException(`PreOrder _id ${_id} not found`);
    return preOrder;
  }

  async update(_id: string): Promise<PreOrder> {
    const preOrder = await this._preOrderModel.findById(_id);
    if (!preOrder) throw new NotFoundException(`PreOrder _id ${_id} not found`);
    preOrder.status = !preOrder.status;
    preOrder.save();
    return preOrder;
  }

  async delete(_id: string): Promise<boolean> {
    const preOrder = await this._preOrderModel.findById(_id);
    if (!preOrder) throw new NotFoundException(`PreOrder _id ${_id} not found`);
    preOrder.remove();
    return true;
  }
}
