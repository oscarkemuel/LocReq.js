import { Request, Response } from 'express';
import { UserService } from '../services/usersService';
import { validateSchema } from '../validations';
import { createUserSchema } from '../validations/User/createUser';

class UserController {
  private usersService = new UserService();

  async create(req: Request, res: Response) {
    const { body: payload } = await validateSchema(createUserSchema, req)

    const newUser = await this.usersService.create(payload);

    return res.status(201).json({user: newUser});
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const user = await this.usersService.show(id);

    return res.json({user});
  }
}

export { UserController };