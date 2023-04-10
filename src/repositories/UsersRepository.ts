import { User } from "@prisma/client";
import { prismaClient } from "../database";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUsersRepository, UserWithoutPassword } from "./IUsersRepository";
import bcrypt from 'bcryptjs';
class UsersRepository implements IUsersRepository{
  private repository;

  constructor() {
    this.repository = prismaClient.user;
  }
  
  async create( userPayload : ICreateUserDTO): Promise<UserWithoutPassword> {
    userPayload.password = await bcrypt.hash(userPayload.password, 8);
    
    const user = await this.repository.create({
      data: userPayload
    });

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt
    }

    return userWithoutPassword;
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
