import express from 'express';
import dotenv from 'dotenv';
import { router } from './routes';
import { prisma } from './database';

dotenv.config();
const port = process.env.PORT;

prisma.$connect()
.then(() => {
  console.log('Prisma connected');
}).catch((err) => {
  console.log('Prisma error', err);
});

const app = express();
app.use(express.json());
app.use(router)

app.get('/', (req, res) => {
  res.send('Expresss + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});