import { DataSource } from "typeorm";
declare const _default: (() => {
    type: string;
    host: string;
    username: string;
    password: string;
    database: string;
    entities: string[];
    migrations: string[];
    autoLoadEntities: boolean;
    dropSchema: boolean;
    synchronize: boolean;
    logging: boolean;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    type: string;
    host: string;
    username: string;
    password: string;
    database: string;
    entities: string[];
    migrations: string[];
    autoLoadEntities: boolean;
    dropSchema: boolean;
    synchronize: boolean;
    logging: boolean;
}>;
export default _default;
export declare const conectionSource: DataSource;
