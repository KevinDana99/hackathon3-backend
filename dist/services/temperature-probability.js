export function getTempProbability(data, dayCount, value, valueType) {
    const daysWithEvent = getDaysWithEvent(data, value, valueType);
    const daysCount = Object.keys(data).length;
    console.log(daysCount, daysWithEvent);
    if (daysCount === 0)
        return 0;
    const probOfEventInADay = daysWithEvent / daysCount;
    const probOfNoEventInADay = 1 - probOfEventInADay;
    return 1 - ((probOfNoEventInADay) ** (dayCount));
}
function getDaysWithEvent(data, value, valueType) {
    let count = 0;
    Object.entries(data).forEach(([key, dayValue]) => {
        if (valueType === 'higherThan' && dayValue > value)
            count++;
        if (valueType === 'lowerThan' && dayValue < value)
            count++;
    });
    return count;
}
//# sourceMappingURL=temperature-probability.js.map