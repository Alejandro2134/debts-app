import { UserImplementation } from '@infrastructure/persistency/orm/sequelize/implementations/UserImplementation';
import { User } from '@infrastructure/persistency/orm/sequelize/models/User';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';
import { SecurityUtils } from '@infrastructure/utils/SecurityUtils';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [UsersController],
  providers: [UserImplementation, SecurityUtils],
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class UsersModule {}
