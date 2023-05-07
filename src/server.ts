import 'express-async-errors';
import express from 'express';
import dotenv from 'dotenv';
import { router } from './routes';
import { prismaClient } from './database';
import { errorMiddleware } from './middlewares/error';
import cors from 'cors';
// import { listRoutes } from './utils/listRoutes';

dotenv.config();
const port = process.env.PORT;

prismaClient.$connect()
.then(() => {
  console.log('📦 - Prisma connected!');

  const app = express();
  
  app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
  })) ;
  app.use(express.json());
  app.use(router)
  app.use(errorMiddleware)

  app.get('/', (_, res) => {
    res.send('Hello!');
  });

  app.listen(port, () => {
    console.log(`🚪 - Server is running at port ${port}`);
  });

  // listRoutes(app);
}).catch((err) => {
  console.log('Prisma error', err);
});

