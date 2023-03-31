import { User } from "@prisma/client";
import { prsimaClient } from "../database";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUsersRepository } from "./IUsersRepository";

class UsersRepository implements IUsersRepository{
  private repository;

  constructor() {
    this.repository = prsimaClient.user;
  }

  async index(): Promise<User[]> {
    const users = await this.repository.findMany();

    return users;
  }

  async create( userPayload : ICreateUserDTO): Promise<User> {
    const user = await this.repository.create({
      data: userPayload
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findFirst({
      where: {
        email
      }
    });

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.repository.findFirst({
      where: {
        id
      }
    });

    return user;
  }
}

export { UsersRepository };
