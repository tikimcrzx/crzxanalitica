import { Module } from '@nestjs/common';
import { IngredientService } from './services/ingredient/ingredient.service';
import { DishService } from './services/dish/dish.service';
import { IngredientController } from './controllers/ingredient/ingredient.controller';
import { DishController } from './controllers/dish/dish.controller';
import { PreorderController } from './controllers/preorder/preorder.controller';
import { PreorderService } from './services/preorder/preorder.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DishSchema, IngredientSchema, PreOrderSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Dish', schema: DishSchema },
      { name: 'Ingredient', schema: IngredientSchema },
      { name: 'PreOrder', schema: PreOrderSchema },
    ]),
  ],
  providers: [IngredientService, DishService, PreorderService],
  controllers: [IngredientController, DishController, PreorderController],
})
export class DishModule {}
