import iso3166_1_data from './data/iso3166-1.json'
import iso3166_2_data from './data/iso3166-2.json'
import { Subdivision, SubdivisionData, CountryWithSubdivisons, CountryData } from './types'

export function subdivisions(): Subdivision[] {
    return iso3166_2_data.map((subdivision: SubdivisionData) => {
        return {
            name: subdivision.n,
            alpha2: subdivision.a2,
            kind: subdivision.k,
            country: subdivision.c
        }
    })
}

export function subdivision_by_alpha2(alpha2: string): Subdivision | undefined {
    const subdivision = iso3166_2_data.find((subdivision: SubdivisionData) => {
        return subdivision.a2 === alpha2
    })

    if (subdivision) {
        return {
            name: subdivision.n,
            alpha2: subdivision.a2,
            kind: subdivision.k,
            country: subdivision.c
        }
    }
}

export function subdivisions_by_country(country_alpha2: string): Subdivision[] {
    return iso3166_2_data.filter((subdivision: SubdivisionData) => {
        return subdivision.c === country_alpha2
    }).map((subdivision: SubdivisionData) => {
        return {
            name: subdivision.n,
            alpha2: subdivision.a2,
            kind: subdivision.k,
            country: subdivision.c
        }
    })
}

export function countries_with_subdivisions(): CountryWithSubdivisons[] {
    return iso3166_1_data.map((country: CountryData) => {
        return {
            name: country.n,
            alpha2: country.a2,
            subdivisions: subdivisions_by_country(country.a2)
        }
    })
}