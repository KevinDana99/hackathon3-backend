export function filterToDesiredDates(data, startDate, endDate) {
    const filteredData = {};
    Object.entries(data).forEach(([date, value]) => {
        const [rawDay, rawMonth] = getDayAndMonth(date);
        if (isBetweenDates(rawDay, rawMonth, startDate, endDate))
            filteredData[date] = value;
    });
    return filteredData;
}
function getDayAndMonth(date) {
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);
    return [Number(day), Number(month)];
}
function isBetweenDates(rawDay, rawMonth, start, end) {
    const startMonth = start.getMonth() + 1;
    const startDay = start.getDate();
    const endMonth = end.getMonth() + 1;
    const endDay = end.getDate();
    const startValue = startMonth * 100 + startDay;
    const endValue = endMonth * 100 + endDay;
    const currentValue = rawMonth * 100 + rawDay;
    if (startValue <= endValue) {
        return currentValue >= startValue && currentValue <= endValue;
    }
    else {
        return currentValue >= startValue || currentValue <= endValue;
    }
}
//# sourceMappingURL=filter-to-date.js.map