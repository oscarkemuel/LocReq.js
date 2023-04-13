import { Router } from 'express';
import { usersRouter } from './users.routes';
import { authRouter } from './auth.routes';
import { customersRouter } from './customers.routes';
import { sellersRouter } from './sellers.routes';
import { placesRouter } from './place.routes';
import { deliveryRequestRouter } from './deliveryRequest.routes';

const router = Router();

router.use('/api/users', usersRouter);
router.use('/api/auth', authRouter);

router.use('/api/customers', customersRouter);
router.use('/api/customers/place', placesRouter);
router.use('/api/customers/delivery-request', deliveryRequestRouter);

router.use('/api/sellers', sellersRouter);

export { router };