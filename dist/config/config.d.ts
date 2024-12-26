import { DataSource } from "typeorm";
declare const _default: (() => {
    type: string;
    url: string;
    entities: string[];
    migrations: string[];
    autoLoadEntities: boolean;
    dropSchema: boolean;
    synchronize: boolean;
    logging: boolean;
    ssl: {
        rejectUnauthorized: boolean;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    type: string;
    url: string;
    entities: string[];
    migrations: string[];
    autoLoadEntities: boolean;
    dropSchema: boolean;
    synchronize: boolean;
    logging: boolean;
    ssl: {
        rejectUnauthorized: boolean;
    };
}>;
export default _default;
export declare const conectionSource: DataSource;
