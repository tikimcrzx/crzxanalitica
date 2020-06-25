import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dish } from '../../schemas/dish.schema';
import { CreateDishDTO, UpdateDishDTO } from '../../input-dto';

@Injectable()
export class DishService {
  constructor(@InjectModel('Dish') private _dishModel: Model<Dish>) {}

  async create(createDishDto: CreateDishDTO): Promise<Dish> {
    const duplicated: Dish = await this._dishModel.findOne({
      name: createDishDto.name,
    });

    if (duplicated)
      throw new NotFoundException(`${createDishDto.name} already exists`);

    const createdDish: Dish = await this._dishModel.create(createDishDto);

    return createdDish;
  }

  async findAll(): Promise<Dish[]> {
    const dishes: Dish[] = await this._dishModel.find().populate({
      path: 'ingredients',
      model: 'Ingredient',
      select: 'ingredient',
    });
    return dishes;
  }

  async findById(_id: string): Promise<Dish> {
    const dish: Dish = await this._dishModel.findById(_id).populate({
      path: 'ingredients',
      model: 'Ingredient',
      select: 'ingredient',
    });
    if (!dish) throw new NotFoundException(`dish _id ${_id} not found`);
    return dish;
  }

  async update(_id: string, updateDishDto: UpdateDishDTO): Promise<Dish> {
    const updatedDish: Dish = await this._dishModel.findOneAndUpdate(
      { _id },
      updateDishDto,
    );
    if (!updatedDish) throw new NotFoundException(`dish _id ${_id} not found`);
    return updatedDish;
  }

  async delete(_id: string): Promise<boolean> {
    const dish: Dish = await this._dishModel.findById(_id);
    if (!dish) throw new NotFoundException(`dish _id ${_id} not found`);
    dish.remove();
    return true;
  }
}
