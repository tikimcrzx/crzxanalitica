import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ingredient } from 'src/dish/schemas/ingredient.schema';
import { CreateIngredientDTO, UpdateIngredientDTO } from '../../input-dto';

@Injectable()
export class IngredientService {
  constructor(
    @InjectModel('Ingredient')
    private readonly _ingredientModel: Model<Ingredient>,
  ) {}

  async create(createIngredientDto: CreateIngredientDTO): Promise<Ingredient> {
    const duplicated: Ingredient = await this._ingredientModel.findOne(
      createIngredientDto,
    );

    if (duplicated)
      throw new NotFoundException(
        `${createIngredientDto.ingredient} already exists`,
      );

    const createdIngredient: Ingredient = await this._ingredientModel.create(
      createIngredientDto,
    );
    return createdIngredient;
  }

  async findAll(): Promise<Ingredient[]> {
    return await this._ingredientModel.find();
  }

  async findById(_id: string): Promise<Ingredient> {
    const ingredient = this._ingredientModel.findById(_id).exec();
    if (!ingredient)
      throw new NotFoundException(`Ingredient _id ${_id} not found`);
    return ingredient;
  }

  async update(
    _id: string,
    updateIngredientDto: UpdateIngredientDTO,
  ): Promise<Ingredient> {
    const updatedIngredient: Ingredient = await this._ingredientModel.findByIdAndUpdate(
      _id,
      updateIngredientDto,
    );

    if (!updatedIngredient)
      throw new NotFoundException(`Ingredient _id ${_id} not found`);
    return updatedIngredient;
  }

  async delete(_id: string): Promise<boolean> {
    const ingredient = await this._ingredientModel.findById(_id);
    if (!ingredient)
      throw new NotFoundException(`Ingredient _id ${_id} not found`);
    ingredient.remove();
    return true;
  }
}
