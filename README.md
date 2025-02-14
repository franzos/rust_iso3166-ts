# rust_iso3166-ts

This library is supposed to reflect the dataset found in [rust_iso3166](https://github.com/rust-iso/rust_iso3166/) for easy matching on frontend and backend. Release version follows the `rust_iso3166` library on [crates.io/crates/rust_iso3166](https://crates.io/crates/rust_iso3166).

## Usage

- `countries()` - Returns a list of countries
- `country_by_alpha2(alpha2: &str)` - Returns a country by its alpha2 code
- `subdivisions()` - Returns a list of subdivisions
- `subdivision_by_alpha2(alpha2: &str)` - Returns a subdivision by its alpha2 code
- `subdivisions_by_country(alpha2: &str)` - Returns a list of subdivisions by country alpha2 code
- `countries_and_subdivisions()` - Returns a list of countries and their subdivisions

## Update from source

```shell
node download.js
```