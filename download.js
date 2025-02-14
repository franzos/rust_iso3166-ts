const https = require('https');
const fs = require('fs');

const url = 'https://raw.githubusercontent.com/rust-iso/rust_iso3166/refs/heads/main/scripts/iso3166_2.data';

https.get(url, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
        data += chunk;
    });
    
    res.on('end', () => {
        try {
            // Parse raw data
            const lines = data.trim().split('\n');
            
            // Create ISO3166-2 subdivisions array
            const subdivisions = lines.map(line => {
                const [_country, code, name, type, countryCode] = line.split(',');
                return {
                    n: name,
                    a2: code,
                    k: type,
                    c: countryCode
                };
            });

            // Create deduplicated ISO3166-1 countries array using Map
            const countryMap = new Map();
            lines.forEach(line => {
                const [country, _, __, ___, countryCode] = line.split(',');
                countryMap.set(countryCode, {
                    n: country,
                    a2: countryCode
                });
            });
            const countries = Array.from(countryMap.values());

            // Write both files
            fs.writeFileSync('src/data/iso3166-1.json', JSON.stringify(countries, null, 2));
            fs.writeFileSync('src/data/iso3166-2.json', JSON.stringify(subdivisions, null, 2));

            console.log('Files generated successfully!');
        } catch (error) {
            console.error('Error processing data:', error);
        }
    });
}).on('error', (err) => {
    console.error('Error fetching data:', err);
});