import { GetUserDTO } from '@application/dto/GetUserDTO';
import { RegisterDTO } from '@application/dto/RegisterDTO';
import { User } from '@domain/entities/User';

export class UserMapper {
  fromDTOToDomain(dto: RegisterDTO) {
    return new User({
      email: dto.email,
      password: dto.password,
    });
  }

  fromDomainToDTO(domain: User) {
    return new GetUserDTO({
      email: domain.getEmail(),
      id: domain.getId()!,
    });
  }
}
