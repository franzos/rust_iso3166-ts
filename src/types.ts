export interface CountryData {
    n: string,
    a2: string
}

export interface SubdivisionData {
    n: string,
    a2: string,
    k: string
    c: string
}

export interface Country {
    name: string,
    alpha2: string
}

export interface Subdivision {
    name: string,
    alpha2: string,
    kind: string,
    country: string
}

export interface CountryWithSubdivisons extends Country {
    subdivisions: Subdivision[]
}