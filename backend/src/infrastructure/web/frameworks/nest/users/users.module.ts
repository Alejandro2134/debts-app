import { UserImplementation } from '@infrastructure/persistency/orm/sequelize/implementations/UserImplementation';
import { User } from '@infrastructure/persistency/orm/sequelize/models/User';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';
import { SecurityUtils } from '@infrastructure/utils/SecurityUtils';

@Module({
  controllers: [UsersController],
  providers: [UserImplementation, SecurityUtils],
  imports: [SequelizeModule.forFeature([User])],
})
export class UsersModule {}
