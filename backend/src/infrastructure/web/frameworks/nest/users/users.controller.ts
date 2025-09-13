import { RegisterDTO } from '@application/dto/RegisterDTO';
import { UserMapper } from '@application/mappers/UserMapper';
import { Register } from '@application/use_cases/users/Register';
import { UserImplementation } from '@infrastructure/persistency/orm/sequelize/implementations/UserImplementation';
import { SecurityUtils } from '@infrastructure/utils/SecurityUtils';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  private readonly registerUseCase: Register;
  private readonly userMapper = new UserMapper();

  constructor(
    userImplementation: UserImplementation,
    securityUtils: SecurityUtils,
  ) {
    this.registerUseCase = new Register(userImplementation, securityUtils);
  }

  @Post('/register')
  async register(@Body() user: RegisterDTO) {
    const userDomain = this.userMapper.fromDTOToDomain(user);
    const res = await this.registerUseCase.execute(userDomain);
    return this.userMapper.fromDomainToDTO(res);
  }
}
