// what should the satellite observe to be able to say "it did rain"? (statistical analysis donde previously)
export const MIN_RAIN_REQUIRED_FOR_POSITIVE = 0.5;
// rainy days usually come together in a row. This factor is applied to avoid overstimation on the rain probability over an amount of days.
// If we assume that rain usually comes in 3 days streaks, a good value is somewhere around 1/3 and 1/2
// It should be calculated properly by analyzing data, but there was no time :(
export const CORRECTION_FACTOR_FOR_RAIN_CLUSTERING = 0.4;
//# sourceMappingURL=parameters.js.map