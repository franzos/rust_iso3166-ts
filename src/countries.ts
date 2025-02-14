import iso3166_1_data from './data/iso3166-1.json'
import { Country, CountryData } from './types'

export function countries(): Country[] {
    return iso3166_1_data.map((country: CountryData) => {
        return {
            name: country.n,
            alpha2: country.a2
        }
    })
}

export function country_by_alpha2(alpha2: string): Country | undefined {
    const country = iso3166_1_data.find((country: CountryData) => {
        return country.a2 === alpha2
    })

    if (country) {
        return {
            name: country.n,
            alpha2: country.a2
        }
    }
}