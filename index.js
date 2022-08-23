// Import du module http
const http = require('http');
// Configuration des variables d'environnement
require('dotenv').config();

// Utilisation du logger debug
const debug = require('debug')('app:server');
// Import du serveur express
const app = require('./app');

const port = process.env.PORT ?? 3000;

// Création du serveur http en lui fournissant le serveur express
const server = http.createServer(app);

// Ecouter du serveur
server.listen(port, () => {
    debug(`Listening on http://localhost:${port}`);
});
