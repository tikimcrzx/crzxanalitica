import { Module } from '@nestjs/common';
import { BranchController } from './controllers/branch/branch.controller';
import { CompanyController } from './controllers/company/company.controller';
import { ContactController } from './controllers/contact/contact.controller';
import { ContactService } from './services/contact/contact.service';
import { CompanyService } from './services/company/company.service';
import { BranchService } from './services/branch/branch.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BranchSchema, CompanySchema, ContactSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Contact', schema: ContactSchema },
      { name: 'Company', schema: CompanySchema },
      { name: 'Branch', schema: BranchSchema },
    ]),
  ],
  controllers: [BranchController, CompanyController, ContactController],
  providers: [ContactService, CompanyService, BranchService],
})
export class CompanyModule {}
