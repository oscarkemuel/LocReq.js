import { User } from "@prisma/client";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

type UserWithoutPassword = Omit<User, 'password'>;

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<UserWithoutPassword>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findAllRoles(id: string): Promise<string[]>;
}

export { IUsersRepository, UserWithoutPassword };