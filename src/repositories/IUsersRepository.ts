import { User } from "@prisma/client";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}

export { IUsersRepository };