import type { Request, Response } from "express";
import { validateTemperatureRequest } from "../services/validations.js";
import { differenceInCalendarDays, parse } from "date-fns";
import { getTempDataOfDate } from "../services/temperature-data.js";
import { getTempProbability } from "../services/temperature-probability.js";

export default async function temperatureController(req: Request, res: Response) {
    const { isValid, error } = validateTemperatureRequest(req);
    if (!isValid) {
        return res.status(400).json({ error });
    }

    const { startDate, endDate, latitude, longitude, higherThan, lowerThan } = req.query;

    if (!startDate || !endDate)
        return res.status(400);

    const start = parse(startDate.toString(), 'yyyyMMdd', new Date());
    const end = parse(endDate.toString(), 'yyyyMMdd', new Date());

    let tempData;

    if (higherThan)
        tempData = await getTempDataOfDate(Number(latitude), Number(longitude), start, end, Number(higherThan), 'higherThan');
    else if (lowerThan)
        tempData = await getTempDataOfDate(Number(latitude), Number(longitude), start, end, Number(lowerThan), 'lowerThan');
    else
        throw new Error('There was a problem with the higherThan/lowerThan parameter.')

    const daysDifference = Math.abs(
        differenceInCalendarDays(
            new Date(2000, end.getMonth(), end.getDate()),
            new Date(2000, start.getMonth(), start.getDate())
        )
    );

    const value = higherThan ? Number(higherThan) : Number(lowerThan)

    const eventProbability = getTempProbability(tempData, daysDifference, value, higherThan ? 'higherThan' : 'lowerThan');

    return res.json({ p: eventProbability })
}