const debug = require('debug')('SQL:log');
// Import de la class Pool du module pg
const { Pool } = require('pg');

const dbConfig = {
    connectionString: process.env.DATABASE_URL,
};
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
