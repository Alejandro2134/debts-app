import { UserDTO } from '@application/dto/UserDTO';
import { UserMapper } from '@application/mappers/UserMapper';
import { Login } from '@application/use_cases/users/Login';
import { Register } from '@application/use_cases/users/Register';
import { UserImplementation } from '@infrastructure/persistency/orm/sequelize/implementations/UserImplementation';
import { SecurityUtils } from '@infrastructure/utils/SecurityUtils';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  private readonly registerUseCase: Register;
  private readonly loginUseCase: Login;
  private readonly userMapper = new UserMapper();

  constructor(
    userImplementation: UserImplementation,
    securityUtils: SecurityUtils,
  ) {
    this.registerUseCase = new Register(userImplementation, securityUtils);
    this.loginUseCase = new Login(userImplementation, securityUtils);
  }

  @Post('/register')
  async register(@Body() user: UserDTO) {
    const userDomain = this.userMapper.fromDTOToDomain(user);
    const res = await this.registerUseCase.execute(userDomain);
    return this.userMapper.fromDomainToDTO(res);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() user: UserDTO) {
    const userDomain = this.userMapper.fromDTOToDomain(user);
    const res = await this.loginUseCase.execute(userDomain);
    return res;
  }
}
