import type { Request, Response } from "express"
import { validateRainRequest } from "../services/validations.js";
import { getRainDataOfDate } from "../services/rain-data.js";
import { parse } from "date-fns";
import { getRainProbability } from "../services/rain-probability.js";


export default async function rainController(req: Request, res: Response) {
    const { isValid, error } = validateRainRequest(req);
    if (!isValid) {
        return res.status(400).json({ error });
    }

    const { startDate, endDate, latitude, longitude } = req.query;

    if (!startDate || !endDate)
        return res.status(400);

    const start = parse(startDate.toString(), 'yyyyMMdd', new Date());
    const end = parse(endDate.toString(), 'yyyyMMdd', new Date());

    const rainData = await getRainDataOfDate(Number(latitude), Number(longitude), start, end);
    const rainProbability = getRainProbability(rainData);

    return res.json({ p: rainProbability });
}