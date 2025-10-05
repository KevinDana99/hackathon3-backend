import type { Request, Response } from "express"
import { validateRainRequest } from "../services/validations.js";
import fetchNasaPower from "../services/api-query.js";
import { format } from "date-fns";


export default async function rainController(req: Request, res: Response) {
    const { isValid, error } = validateRainRequest(req);
    if (!isValid) {
        return res.status(400).json({ error });
    }

    const { startDate, endDate, latitude, longitude } = req.query;

    if (startDate && endDate) {
        const start = new Date(startDate.toString());
        const end = new Date(endDate.toString());

        const response = fetchNasaPower({
            start: format(start, 'yyyyMMdd'),
            end: format(end, 'yyyyMMdd')
        })
    }

    return res.json(req.query);
}