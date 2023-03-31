import { Repository } from "typeorm";
import { myDataSource } from "../database";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/entities/User";
import { IUsersRepository } from "./IUsersRepository";

class UsersRepository implements IUsersRepository{
  private repository: Repository<User>;

  constructor() {
    this.repository = myDataSource.getRepository(User)
  }

  async index(): Promise<User[]> {
    const users = await this.repository.find();

    return users;
  }

  async create({
    name,
    email,
    password,
    avatar,
    id,
  }: ICreateUserDTO): Promise<void> {
    const user = await this.repository.create({
      name,
      email,
      password,
      avatar,
      id,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOneBy({email});

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.repository.findOneBy({id});

    return user;
  }
}

export { UsersRepository };
