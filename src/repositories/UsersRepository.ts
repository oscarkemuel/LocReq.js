import { User } from "@prisma/client";
import { prismaClient } from "../database";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUsersRepository } from "./IUsersRepository";
import bcrypt from 'bcryptjs';
class UsersRepository implements IUsersRepository{
  private repository;

  constructor() {
    this.repository = prismaClient.user;
  }
  
  async create( userPayload : ICreateUserDTO): Promise<User> {
    userPayload.password = await bcrypt.hash(userPayload.password, 8);
    
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
