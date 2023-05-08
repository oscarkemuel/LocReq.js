import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { BadRequestError, NotFoundError } from "../helpers/apiErros";
import { UsersRepository } from "../repositories/UsersRepository";

class UserService {
  private usersRepository = new UsersRepository();

  async create(user: ICreateUserDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(user.email);

    if (userAlreadyExists) {
      throw new BadRequestError("User already exists!");
    }

    const newUser = await this.usersRepository.create(user);

    return newUser;
  }

  async show(id: string) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundError("User not found!");
    }

    const rules = await this.usersRepository.findAllRoles(id);

    return {...user, rules};
  }

  async showByEmail(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundError("User not found!");
    }

    const rules = await this.usersRepository.findAllRoles(user.id);

    return {...user, rules};
  }
}

export { UserService };