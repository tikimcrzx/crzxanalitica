import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CompanyModule } from './company/company.module';
import { DishModule } from './dish/dish.module';
import { RedirectModule } from './redirect/redirect.module';
import { MongooseModule } from '@nestjs/mongoose';

import * as mongoConfig from './config/mongo.config';
import { IngredientController } from './dish/controllers/ingredient/ingredient.controller';

@Module({
  imports: [
    MongooseModule.forRoot(mongoConfig.URI, mongoConfig.connectionOptions),
    CompanyModule,
    DishModule,
    RedirectModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  // implements NestModule
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply()
  //     .exclude()
  //     .forRoutes(IngredientController);
  // }
}
