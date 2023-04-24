import { Router } from 'express';
import { usersRouter } from './users.routes';
import { authRouter } from './auth.routes';
import { customersRouter } from './customers.routes';
import { sellersRouter } from './sellers.routes';
import { placesRouter } from './place.routes';
import { deliveryRequestRouter } from './deliveryRequest.routes';
import authMiddleware from '../middlewares/auth';

const router = Router();

router.use('/api/users', usersRouter);
router.use('/api/auth', authRouter);

router.use('/api/customers', authMiddleware, customersRouter);
router.use('/api/customers/place', authMiddleware, placesRouter);
router.use('/api/customers/delivery-request', authMiddleware, deliveryRequestRouter);

router.use('/api/sellers', authMiddleware, sellersRouter);

export { router };