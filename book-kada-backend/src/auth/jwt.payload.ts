import { Roles } from "src/utils/enums";

export interface JWTPayload {
    userId: number,
    role: Roles
}