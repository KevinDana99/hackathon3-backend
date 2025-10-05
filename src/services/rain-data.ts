import { format, setYear } from "date-fns";
import { fetchDailyNasaPower } from "./api-query.js";
import type { DailyData } from "../types.js";

export async function getRainDataOfDate(latitude: number, longitude: number, referenceDate: Date) {
    // no interesa el año que llegara desde el usuario, nos interesa buscar datos de los ultimos 15 años
    const currentYear = (new Date()).getFullYear()
    const twentyYearsAgo = currentYear - 20;
    referenceDate.setFullYear(currentYear);

    const startDate = setYear(referenceDate, twentyYearsAgo);
    const endDate = setYear(referenceDate, currentYear - 1);


    const response = await fetchDailyNasaPower({
        end: format(endDate, 'yyyyMMdd'),
        start: format(startDate, 'yyyyMMdd'),
        latitude: latitude,
        longitude: longitude,
        parameters: 'PRECTOTCORR'
    })

    const filteredData = filterToDesiredDates(response, startDate, endDate)

    return filteredData;

}

function filterToDesiredDates(data: DailyData, startDate: Date, endDate: Date): DailyData {
    const filteredData: DailyData = {};
    Object.entries(data).forEach(([date, value]) => {
        const [rawDay, rawMonth] = getDayAndMonth(date)
        if (isBetweenDates(rawDay as number, rawMonth as number, startDate, endDate))
            filteredData[date] = value;
    })

    return filteredData;
}

function getDayAndMonth(date: string) {
    const day = date.substring(4, 6);
    const month = date.substring(6, 8);
    return [Number(day), Number(month)];
}

function isBetweenDates(rawDay: number, rawMonth: number, start: Date, end: Date) {
    const startMonth = start.getMonth() + 1;
    const startDay = start.getDate();
    const endMonth = end.getMonth() + 1;
    const endDay = end.getDate();

    const startValue = startMonth * 100 + startDay;
    const endValue = endMonth * 100 + endDay;
    const currentValue = rawMonth * 100 + rawDay;

    if (startValue <= endValue) {
        return currentValue >= startValue && currentValue <= endValue;
    } else {
        return currentValue >= startValue || currentValue <= endValue;
    }
}
