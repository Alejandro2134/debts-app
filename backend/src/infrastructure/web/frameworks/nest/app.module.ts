import { Debt } from '@infrastructure/persistency/orm/sequelize/models/Debt';
import { User } from '@infrastructure/persistency/orm/sequelize/models/User';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { DebtsModule } from './debts/debts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: +(process.env.DB_PORT || 5432),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'secret',
      database: process.env.DB_NAME || 'debts',
      models: [User, Debt],
    }),
    DebtsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
