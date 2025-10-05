import type { Request } from "express";

interface ValidationResponse {
    isValid: boolean,
    error?: string;
}

export function validateRainRequest(req: Request): ValidationResponse {
    const { startDate, endDate, latitude, longitude } = req.query;

    // Validación de presencia
    if (!startDate || !endDate || !latitude || !longitude) {
        return {
            isValid: false,
            error: "Faltan parámetros requeridos"
        }
    }

    // Validación de tipos y formato
    const start = String(startDate);
    const end = String(endDate);
    const lat = Number(latitude);
    const lon = Number(longitude);

    if (!/^\d{8}$/.test(start) || !/^\d{8}$/.test(end)) {
        return {
            isValid: false,
            error: "Fechas deben estar en formato YYYYMMDD"
        }
    }

    if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
        return {
            isValid: false,
            error: "Lat/Lon inválidos"
        }
    }

    return { isValid: true }
}