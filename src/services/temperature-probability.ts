import type { DailyData, TemperatureQueryT } from "../types.js";

export function getTempProbability(data: DailyData, dayCount: number, value: number, valueType: TemperatureQueryT): number {
    const daysWithEvent = getDaysWithEvent(data, value, valueType);
    const daysCount = Object.keys(data).length;
    console.log(daysCount, daysWithEvent)
    if (daysCount === 0)
        return 0;
    const probOfEventInADay = daysWithEvent / daysCount
    const probOfNoEventInADay = 1 - probOfEventInADay;
    return 1 - ((probOfNoEventInADay) ** (dayCount))
}

function getDaysWithEvent(data: DailyData, value: number, valueType: TemperatureQueryT) {
    let count = 0;
    Object.entries(data).forEach(([key, dayValue]) => {
        if (valueType === 'higherThan' && dayValue > value)
            count++;
        if (valueType === 'lowerThan' && dayValue < value)
            count++;
    });
    return count;
}
