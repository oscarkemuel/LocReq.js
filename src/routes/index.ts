import { Router } from 'express';
import { usersRouter } from './users.routes';
import { authRouter } from './auth.routes';
import { customersRouter } from './customers.routes';
import { sellersRouter } from './sellers.routes';
import { placesRouter } from './place.routes';
import { deliveryRequestRouter } from './deliveryRequest.routes';
import authMiddleware from '../middlewares/auth';
import { feedbackSellerRouter } from './feedbackSeller.routes';
import { favoriteRouter } from './favorite.routes';

const router = Router();

router.use('/api/users', usersRouter);
router.use('/api/auth', authRouter);

router.use('/api/customers', authMiddleware, customersRouter);
router.use('/api/customers/place', authMiddleware, placesRouter);

router.use('/api/sellers', authMiddleware, sellersRouter);

router.use('/api/delivery-request', authMiddleware, deliveryRequestRouter);

router.use('/api/feedback', authMiddleware, feedbackSellerRouter);
router.use('/api/favorite', authMiddleware, favoriteRouter)

export { router };