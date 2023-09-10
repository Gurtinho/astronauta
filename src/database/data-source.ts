import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotnet from 'dotenv';
dotnet.config();

const dataConnection = new DataSource({
    type: 'postgres',
    host: String(process.env.DATABASE_HOST),
    username: String(process.env.DATABASE_USER),
    password: String(process.env.DATABASE_PASS),
    database: String(process.env.DATABASE_NAME),
    port: 5432,
    migrations: ['src/database/migrations/*.ts'],
	entities: ['src/database/entities/*.ts']
});

export { dataConnection };