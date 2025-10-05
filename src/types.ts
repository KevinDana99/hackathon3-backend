type Parameter = 'T2M_MAX' | 'T2M_MIN' | 'T2M' | 'WS2M' | 'PRECTOTCORR'

export interface ApiParams {
    start: string,
    end: string,
    latitude: number,
    longitude: number,
    parameter: Parameter,
    lowerThan?: number,
    higherThan?: number
}