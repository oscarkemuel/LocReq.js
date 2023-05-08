import { IAuthUserDTO } from "../dtos/IAuthUserDTO";
import { UserService } from './usersService';
import bcrypt from 'bcryptjs';
import { UnauthorizedError } from "../helpers/apiErros";
import jwt from 'jsonwebtoken';
import { isEqual } from 'lodash';

class AuthService {
  private usersService = new UserService();

  async authenticate({email, password}: IAuthUserDTO) {
    const user = await this.usersService.showByEmail(email);

    const isValidPassword = await bcrypt.compare(password, user.password);
  
    if(!isValidPassword) {
      throw new UnauthorizedError("Email/Password incorrect!");
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      rules: user.rules
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    return {user: payload, token};
  }

  async getUserByToken(token: string) {
    const oldPayload = jwt.decode(token) as { id: string, rules: string[] };

    if(!oldPayload) {
      throw new UnauthorizedError("Invalid token!");
    }

    const user = await this.usersService.show(oldPayload.id);

    if(!isEqual(user.rules, oldPayload.rules)) {
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        rules: user.rules
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRES_IN
      });

      return {user: payload, token};
    }

    return {user: oldPayload, token};
  }
}

export { AuthService };