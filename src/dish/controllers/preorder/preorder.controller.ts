import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Get,
  Put,
  Param,
} from '@nestjs/common';
import { PreorderService } from 'src/dish/services/preorder/preorder.service';
import { CreatePreOrderDTO } from 'src/dish/input-dto';
import { Response } from 'express';

@Controller('preorder')
export class PreorderController {
  constructor(private readonly _preOrderService: PreorderService) {}

  @Post()
  async create(
    @Body() createPreOrderDto: CreatePreOrderDTO,
    @Res() res: Response,
  ) {
    const createdPreOrder = await this._preOrderService.create(
      createPreOrderDto,
    );
    res.status(HttpStatus.CREATED).json(createdPreOrder);
  }

  @Get()
  async findAll(@Res() res: Response) {
    const preOrders = await this._preOrderService.findAll();
    res.status(HttpStatus.OK).json(preOrders);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Res() res: Response) {
    const updatedPreOrder = await this._preOrderService.update(id);
    res.status(HttpStatus.OK).json(updatedPreOrder);
  }
}
