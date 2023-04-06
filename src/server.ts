import 'express-async-errors';
import express from 'express';
import dotenv from 'dotenv';
import { router } from './routes';
import { prismaClient } from './database';
import { errorMiddleware } from './middlewares/error';

dotenv.config();
const port = process.env.PORT;

prismaClient.$connect()
.then(() => {
  console.log('📦 - Prisma connected!');
}).catch((err) => {
  console.log('Prisma error', err);
});

const app = express();
app.use(express.json());
app.use(router)
app.use(errorMiddleware)

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.listen(port, () => {
  console.log(`🚪 - Server is running at port ${port}`);
});