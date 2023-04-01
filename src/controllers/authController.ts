import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

class AuthController {
  private authService = new AuthService();
  
  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await this.authService.authenticate({email, password});    

    return res.json({user});
  }
}

export { AuthController };