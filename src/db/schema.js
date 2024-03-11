export const settingsSchema = `
    id INTEGER NOT NULL PRIMARY KEY,
    port INTEGER,
    lat REAL,
    lon REAL,
    location TEXT
    locationiq_api_key TEXT,
    darkmode INTEGER,
`;

export const weatherSchema = `
    id INTEGER NOT NULL PRIMARY KEY,
    shortForecast TEXT,
    timeOfDay TEXT,
    icon TEXT,
    iconUrl TEXT,
`;
