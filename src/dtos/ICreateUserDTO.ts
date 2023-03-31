interface ICreateUserDTO {
  name: string;
  password: string;
  email: string;
  id?: string;
  avatar?: string;
}

export { ICreateUserDTO };