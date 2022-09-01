const debug = require('debug')('SQL:log');
// Import de la class Pool du module pg
const { Pool } = require('pg');

const dbConfig = {
    connectionString: process.env.DATABASE_URL,
};

if (process.env.NODE_ENV === 'production') {
    dbConfig.user = process.env.DB_USER;
    dbConfig.host = process.env.DB_HOST;
    dbConfig.database = process.env.DB_DATABASE;
    dbConfig.port = process.env.DB_PORT;
    dbConfig.password = process.env.DB_PASSWORD;
    dbConfig.ssl = { rejectUnauthorized: false };
}

// Afin d'afficher les paramettres sql dans le terminal
// Création d'une nouvelle piscine
const pool = new Pool(dbConfig);

module.exports = {
    originalClient: pool,
    async query(...params) {
        debug(...params);
        return this.originalClient.query(...params);
    },
};
