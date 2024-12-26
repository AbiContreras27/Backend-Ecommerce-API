import { registerAs } from "@nestjs/config"
import { config as dotenvConfig } from "dotenv"
import { DataSource, DataSourceOptions } from "typeorm"

dotenvConfig({ path: '.env' })

const config = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    // host: `${process.env.DB_HOST}` || 'localhost',
    // port: parseInt(process.env.DB_PORT, 10) || 5432,
    // username: `${process.env.DB_USERNAME}`,
    // password: `${process.env.DB_PASSWORD}`,
    // database: `${process.env.DB_NAME}`,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/**/*.migrations{.ts,.js}'],
    autoLoadEntities: true,
    dropSchema: false,
    synchronize: true,
    logging: true

}

export default registerAs('typeorm', () => config);
export const conectionSource = new DataSource(config as DataSourceOptions)