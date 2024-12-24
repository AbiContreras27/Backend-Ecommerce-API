"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conectionSource = void 0;
const config_1 = require("@nestjs/config");
const dotenv_1 = require("dotenv");
const typeorm_1 = require("typeorm");
(0, dotenv_1.config)({ path: '.env' });
const config = {
    type: "postgres",
    host: `${process.env.DB_HOST}` || 'localhost',
    username: `${process.env.DB_USERNAME}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_NAME}`,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/**/*.migrations{.ts,.js}'],
    autoLoadEntities: true,
    dropSchema: false,
    synchronize: true,
    logging: true
};
exports.default = (0, config_1.registerAs)('typeorm', () => config);
exports.conectionSource = new typeorm_1.DataSource(config);
//# sourceMappingURL=config.js.map