import type { Request } from "express";
interface ValidationResponse {
    isValid: boolean;
    error?: string;
}
export declare function validateRainRequest(req: Request): ValidationResponse;
export declare function validateTemperatureRequest(req: Request): ValidationResponse;
export {};
//# sourceMappingURL=validations.d.ts.map