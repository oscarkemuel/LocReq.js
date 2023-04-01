import { NextFunction, Request, Response } from 'express'
import { UnauthorizedError } from '../helpers/apiErros'
import jwt from 'jsonwebtoken'
import { UserService } from '../services/usersService';

interface ITokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export default async function authMiddleware(
  req: Request, _: Response, next: NextFunction
) {
  const { authorization } = req.headers;
  const usersService = new UserService();

  if (!authorization) {
    throw new UnauthorizedError('Token not provided');
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET!);
    const { id } = data as ITokenPayload;

    const user = await usersService.show(id);

    const { password, ...userWithoutPassword } = user;

    req.user = userWithoutPassword;

    return next();
  } catch {
    throw new UnauthorizedError('Invalid token');
  }
}