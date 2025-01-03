import { SetMetadata } from "@nestjs/common";
import { Role } from "src/role.enum";


export const Roles = (...role: Role[]) => SetMetadata("roles", role)