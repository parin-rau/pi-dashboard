export const settingsSchema = `
    id INTEGER PRIMARY KEY,
    port INTEGER,
    lat REAL,
    lon REAL,
    location TEXT,
    locationiq_api_key TEXT,
    darkmode INTEGER
`;

export const weatherSchema = `
    id INTEGER PRIMARY KEY,
    shortForecast TEXT,
    timeOfDay TEXT,
    icon TEXT,
    iconUrl TEXT
`;
