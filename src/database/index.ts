import exp from 'constants';
import { DataSource } from 'typeorm';

const myDataSource = new DataSource({
  type: "sqlite",
  database: "db",
  logging: true,
  synchronize: true,
  migrationsRun: true,
  entities: ["src/infra/typeorm/entities/*.ts"],
  migrations: ["src/database/migrations/*.ts"],
})

export  {myDataSource};

