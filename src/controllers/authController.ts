import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { validateSchema } from '../validations';
import { authenticateSchema } from '../validations/Auth/authenticate';

class AuthController {
  private authService = new AuthService();
  
  async authenticate(req: Request, res: Response) {
    const { body: paylaod } = await validateSchema(authenticateSchema, req)

    const user = await this.authService.authenticate(paylaod);    

    return res.json({user});
  }
}

export { AuthController };