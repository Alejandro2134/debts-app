import { GetUserDTO } from '@application/dto/GetUserDTO';
import { UserDTO } from '@application/dto/UserDTO';
import { User } from '@domain/entities/User';

export class UserMapper {
  fromDTOToDomain(dto: UserDTO) {
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
