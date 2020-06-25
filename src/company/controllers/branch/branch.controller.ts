import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { BranchService } from '../../services/branch/branch.service';
import { CreateBranchDTO, UpdateBranchDTO } from '../../input-dto';
import { Response } from 'express';
import {
  IntentParameterDTO,
  ParameterRestaurantDTO,
} from '../../../shared/input-dto';

@Controller('branch')
export class BranchController {
  constructor(private readonly _branchService: BranchService) {}

  @Post()
  async create(@Body() createBranchDto: CreateBranchDTO, @Res() res: Response) {
    const createdBranch = await this._branchService.create(createBranchDto);
    res.status(HttpStatus.CREATED).json(createdBranch);
  }

  @Post('menu')
  async menu(
    @Body() intentParameterDto: IntentParameterDTO,
    @Res() res: Response,
  ) {
    const param = intentParameterDto.queryResult
      .parameters as ParameterRestaurantDTO;
    const menu = await this._branchService.card(param.Restaurant);
    res.status(HttpStatus.OK).json(menu);
  }

  @Get()
  async findAll(@Res() res: Response) {
    const branches = await this._branchService.findAll();
    res.status(HttpStatus.OK).json(branches);
  }

  @Get(':id')
  async findById(@Param('id') id: string, @Res() res: Response) {
    const branch = await this._branchService.findById(id);
    res.status(HttpStatus.OK).json(branch);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBranchDto: UpdateBranchDTO,
    @Res() res: Response,
  ) {
    const updatedBranch = await this._branchService.update(id, updateBranchDto);
    res.status(HttpStatus.OK).json(updatedBranch);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    const deletedBranch = await this._branchService.delete(id);
    res.status(HttpStatus.OK).json(deletedBranch);
  }
}
