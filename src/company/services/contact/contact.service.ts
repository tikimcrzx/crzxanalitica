import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact } from 'src/company/schemas/contact.schema';
import { CreateContactDTO, UpdateContactDTO } from 'src/company/input-dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel('Contact') private readonly _contactModel: Model<Contact>,
  ) {}

  async create(createContactDto: CreateContactDTO): Promise<Contact> {
    const createdContact: Contact = await this._contactModel.create(
      createContactDto,
    );
    return createdContact;
  }

  async findAll(): Promise<Contact[]> {
    return await this._contactModel.find();
  }

  async findById(_id: string): Promise<Contact> {
    const contact: Contact = await this._contactModel.findById(_id);
    if (!contact) throw new NotFoundException(`Contact _id ${_id} not found`);
    return contact;
  }

  async update(
    _id: string,
    updateContactDto: UpdateContactDTO,
  ): Promise<Contact> {
    const updatedContact: Contact = await this._contactModel.findByIdAndUpdate(
      _id,
      updateContactDto,
    );
    return updatedContact;
  }

  async delete(_id: string): Promise<boolean> {
    const contact: Contact = await this._contactModel.findById(_id);
    if (!contact) throw new NotFoundException(`Contact _id ${_id} not found`);
    contact.remove();
    return true;
  }
}
