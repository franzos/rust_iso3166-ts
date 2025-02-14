const https = require('https');
const fs = require('fs');

const url = 'https://raw.githubusercontent.com/rust-iso/rust_iso3166/refs/heads/main/scripts/iso3166_2.data';

function parseCsvLine(line) {
    const fields = [];
    let field = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
                field += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            fields.push(field.trim());
            field = '';
        } else {
            field += char;
        }
    }
    fields.push(field.trim());
    return fields.map(f => f.replace(/^"|"$/g, ''));
}

https.get(url, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
        data += chunk;
    });
    
    res.on('end', () => {
        try {
            const lines = data.trim().split('\n');
            
            const subdivisions = lines.map(line => {
                const parts = parseCsvLine(line);
                return {
                    n: parts[2],
                    a2: parts[1],
                    k: parts[3],
                    c: parts[4]
                };
            });

            const countryMap = new Map();
            lines.forEach(line => {
                const parts = parseCsvLine(line);
                countryMap.set(parts[4], {
                    n: parts[0],
                    a2: parts[4]
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