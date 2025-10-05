import type { Request, Response } from "express"
import { validateRainRequest } from "../services/validations.js";
import { getRainDataOfDate } from "../services/rain-data.js";


export default async function rainController(req: Request, res: Response) {
    const { isValid, error } = validateRainRequest(req);
    if (!isValid) {
        return res.status(400).json({ error });
    }

    const { startDate, endDate, latitude, longitude } = req.query;

    if (!startDate || !endDate)
        return res.status(400);

    const start = new Date(startDate.toString());
    const end = new Date(endDate.toString());

    const rainData = await getRainDataOfDate(Number(latitude), Number(longitude), end);

    return res.json(rainData);
}