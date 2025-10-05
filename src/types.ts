type Parameter = 'T2M_MAX' | 'T2M_MIN' | 'T2M' | 'WS2M' | 'PRECTOTCORR'

export interface ApiParams {
    start: string,
    end: string,
    latitude: number,
    longitude: number,
    parameters: Parameter,
    lowerThan?: number,
    higherThan?: number
}


export type DailyData = {
    [date: string]: number;
};

export type TemperatureQueryT = 'higherThan' | 'lowerThan'