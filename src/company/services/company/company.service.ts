import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from '../../schemas/company.schema';
import { CreateCompanyDTO, UpdateCompanyDTO } from 'src/company/input-dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel('Company') private readonly _companyModel: Model<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDTO): Promise<Company> {
    const createdCompany: Company = await this._companyModel.create(
      createCompanyDto,
    );
    return createdCompany;
  }

  async findAll(): Promise<Company[]> {
    return await this._companyModel
      .find()
      .populate({ path: 'contact', model: 'Contact', select: 'name phone' });
  }

  async findById(_id: string): Promise<Company> {
    const company: Company = await this._companyModel
      .findById(_id)
      .populate({ path: 'contact', model: 'Contact', select: 'name phone' });
    if (!company) throw new NotFoundException(`Comapany _id ${_id} not found`);
    return company;
  }

  async update(
    _id: string,
    updateCompanyDto: UpdateCompanyDTO,
  ): Promise<Company> {
    const updatedCompany: Company = await this._companyModel.findByIdAndUpdate(
      _id,
      updateCompanyDto,
    );
    return updatedCompany;
  }

  async delete(_id: string): Promise<boolean> {
    const company: Company = await this._companyModel.findById(_id);
    if (!company) throw new NotFoundException(`Comapany _id ${_id} not found`);
    company.remove();
    return true;
  }
}
