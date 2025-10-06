import { validateRainRequest } from "../services/validations.js";
import { getRainDataOfDate } from "../services/rain-data.js";
import { parse } from "date-fns";
import { getRainProbability } from "../services/rain-probability.js";
import { differenceInCalendarDays } from "date-fns";
export default async function rainController(req, res) {
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
    const daysDifference = Math.abs(differenceInCalendarDays(new Date(2000, end.getMonth(), end.getDate()), new Date(2000, start.getMonth(), start.getDate())));
    const rainProbability = getRainProbability(rainData, daysDifference);
    return res.json({ p: rainProbability });
}
//# sourceMappingURL=rain-controller.js.map