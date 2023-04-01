import { Router } from 'express';
import { usersRouter } from './users.routes';
import { authRouter } from './auth.routes';

const router = Router();

router.use('/api/users', usersRouter);
router.use('/api/auth', authRouter);

export { router };