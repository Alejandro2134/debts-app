interface IGetUserDTO {
  id: number;
  email: string;
}

export class GetUserDTO {
  id: number;
  email: string;

  constructor(item: IGetUserDTO) {
    this.email = item.email;
    this.id = item.id;
  }
}
