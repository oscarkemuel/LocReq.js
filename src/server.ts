import express from 'express';
import dotenv from 'dotenv';
import { router } from './routes';
import {myDataSource} from './database';

dotenv.config();
const port = process.env.PORT;

myDataSource.initialize()
.then(() => {
  console.log("Data Source has been initialized!")
})
.catch((err) => {
  console.error("Error during Data Source initialization:", err)
})

const app = express();
app.use(express.json());
app.use(router)

app.get('/', (req, res) => {
  res.send('Expresss + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});