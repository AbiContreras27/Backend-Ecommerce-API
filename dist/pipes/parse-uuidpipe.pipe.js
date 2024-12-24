"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseUUIDPipe = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
let ParseUUIDPipe = class ParseUUIDPipe {
    transform(value) {
        if (!(0, class_validator_1.isUUID)(value, '4')) {
            throw new common_1.BadRequestException(`El id "${value}" no tiene un formato válido de UUID`);
        }
        return value;
    }
};
exports.ParseUUIDPipe = ParseUUIDPipe;
exports.ParseUUIDPipe = ParseUUIDPipe = __decorate([
    (0, common_1.Injectable)()
], ParseUUIDPipe);
//# sourceMappingURL=parse-uuidpipe.pipe.js.map