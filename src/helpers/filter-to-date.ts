import type { DailyData } from "../types.js";

export function filterToDesiredDates(data: DailyData, startDate: Date, endDate: Date): DailyData {
    const filteredData: DailyData = {};
    Object.entries(data).forEach(([date, value]) => {
        const [rawDay, rawMonth] = getDayAndMonth(date)
        if (isBetweenDates(rawDay as number, rawMonth as number, startDate, endDate))
            filteredData[date] = value;
    })

    return filteredData;
}


function getDayAndMonth(date: string) {
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);
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
