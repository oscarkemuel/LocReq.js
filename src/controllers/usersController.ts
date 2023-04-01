import { Request, Response } from 'express';
import { UserService } from '../services/usersService';

class UserController {
  private usersService = new UserService();

  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const newUser = await this.usersService.create({ name, email, password });

    return res.status(201).json({user: newUser});
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const user = await this.usersService.show(id);

    return res.json({user});
  }
}

export { UserController };