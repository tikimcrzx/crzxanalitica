import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Branch } from 'src/company/schemas/branch.schema';
import { Model } from 'mongoose';
import { CreateBranchDTO, UpdateBranchDTO } from 'src/company/input-dto';
import { card } from '../../../shared/dialog-responses/response-card';

@Injectable()
export class BranchService {
  constructor(
    @InjectModel('Branch') private readonly _branchModel: Model<Branch>,
  ) {}

  async create(createBranchDto: CreateBranchDTO): Promise<Branch> {
    const createdBranch: Branch = await this._branchModel.create(
      createBranchDto,
    );
    return createdBranch;
  }

  async findAll(): Promise<Branch[]> {
    return await this._branchModel
      .find()
      .populate({
        path: 'menu',
        model: 'Dish',
        populate: { path: 'ingredients', model: 'Ingredient', select: 'name' },
      })
      .populate({ path: 'contact', model: 'Contact', select: 'name phone' })
      .populate({
        path: 'company',
        model: 'Company',
        select: 'name contact',
        populate: { path: 'contact', model: 'Contact', select: 'name phone' },
      });
  }

  async findById(_id: string): Promise<Branch> {
    const branch: Branch = await this._branchModel
      .findById(_id)
      .populate({
        path: 'menu',
        model: 'Dish',
        populate: { path: 'ingredients', model: 'Ingredient', select: 'name' },
      })
      .populate({ path: 'contact', model: 'Contact', select: 'name phone' })
      .populate({
        path: 'company',
        model: 'Company',
        select: 'name contact',
        populate: { path: 'contact', model: 'Contact', select: 'name phone' },
      });
    if (!branch) throw new NotFoundException(`Branch _id ${_id} not found`);
    return branch;
  }

  async findOne(name: string): Promise<Branch> {
    const branch = await this._branchModel
      .findOne({ name })
      .populate({
        path: 'menu',
        model: 'Dish',
        populate: { path: 'ingredients', model: 'Ingredient', select: 'name' },
      })
      .populate({ path: 'contact', model: 'Contact', select: 'name phone' })
      .populate({
        path: 'company',
        model: 'Company',
        select: 'name contact',
        populate: { path: 'contact', model: 'Contact', select: 'name phone' },
      });
    if (!branch) throw new NotFoundException(`Branch ${name} not found`);
    return branch;
  }

  async card(name: string) {
    const struct = [];
    const branch: Branch = await this.findOne(name);
    const menu = branch.menu;

    for (let index = 0; index < menu.length; index++) {
      const element: any = menu[index];
      struct.push(card(element.name, element.name, element.image, 'Ordenar'));
      console.log(element.name);
    }

    return { fulfillmentMessages: struct };
  }

  async update(_id: string, updateBranchDto: UpdateBranchDTO): Promise<Branch> {
    const updatedBranch: Branch = await this._branchModel.findByIdAndUpdate(
      _id,
      updateBranchDto,
    );
    return updatedBranch;
  }

  async delete(_id: string): Promise<boolean> {
    const branch: Branch = await this._branchModel.findById(_id);
    if (!branch) throw new NotFoundException(`Branch _id ${_id} not found`);
    branch.remove();
    return true;
  }
}
