import { IAuthUserDTO } from "../dtos/IAuthUserDTO";
import { UserService } from './usersService';
import bcrypt from 'bcryptjs';
import { UnauthorizedError } from "../helpers/apiErros";
import jwt from 'jsonwebtoken';

class AuthService {
  private usersService = new UserService();

  async authenticate({email, password}: IAuthUserDTO) {
    const user = await this.usersService.showByEmail(email);

    const isValidPassword = await bcrypt.compare(password, user.password);
  
    if(!isValidPassword) {
      throw new UnauthorizedError("Email/Password incorrect!");
    }

    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    const { password: _, ...userWithoutPassword } = user;

    return {user: userWithoutPassword, token};
  }
}

export { AuthService };