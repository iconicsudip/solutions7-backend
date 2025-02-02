import 'dotenv/config';
import * as path from 'path';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from "typeorm";

const port = process.env.DB_PORT as number | undefined;

console.log(__dirname + '/migrations/*.ts')

const config = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: port,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: false, // Ensure migrations are used instead of auto-sync
    logging: true,
    entities: [__dirname+ '/entities/*.{ts,js}'], // Load all entity files
    migrations: [__dirname + '/migrations/*.ts'], // Path for migrations
    autoLoadEntities: true,
    ssl: {
        rejectUnauthorized: false, // Disable strict certificate validation if necessary
    },
}

export const AppDataSource = new DataSource(config as DataSourceOptions);