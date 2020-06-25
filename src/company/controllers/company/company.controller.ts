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
import { CompanyService } from '../../services/company/company.service';
import { CreateCompanyDTO, UpdateCompanyDTO } from '../../input-dto';
import { Response } from 'express';

@Controller('company')
export class CompanyController {
  constructor(private readonly _companyService: CompanyService) {}

  @Post()
  async create(
    @Body() createCompanyDto: CreateCompanyDTO,
    @Res() res: Response,
  ) {
    const createdCompany = await this._companyService.create(createCompanyDto);
    res.status(HttpStatus.CREATED).json(createdCompany);
  }

  @Get()
  async findAll(@Res() res: Response) {
    const companies = await this._companyService.findAll();
    res.status(HttpStatus.OK).json(companies);
  }

  @Get(':id')
  async findById(@Param('id') id: string, @Res() res: Response) {
    const company = await this._companyService.findById(id);
    res.status(HttpStatus.OK).json(company);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDTO,
    @Res() res: Response,
  ) {
    const updatedCompany = await this._companyService.update(
      id,
      updateCompanyDto,
    );
    res.status(HttpStatus.OK).json(updatedCompany);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    const deletedCompany = await this._companyService.delete(id);
    res.status(HttpStatus.OK).json(deletedCompany);
  }
}
