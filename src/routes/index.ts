import { Router } from 'express';
import { usersRouter } from './users.routes';
import { authRouter } from './auth.routes';
import { customersRouter } from './customers.routes';
import { sellersRouter } from './sellers.routes';

const router = Router();

router.use('/api/users', usersRouter);
router.use('/api/auth', authRouter);
router.use('/api/customers', customersRouter);
router.use('/api/sellers', sellersRouter)

export { router };