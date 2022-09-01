// Import du module express
const express = require('express');
// Import module path
const path = require('path');

// Import du router
const cors = require('cors');
const router = require('./routers');

// Import JS Doc Swagger
const apidocs = require('./helpers/apiDocs');

// Import API error et gestionnaire d'erreur
const ApiError = require('./errors/apiError');
const errorHandler = require('./helpers/errorHandler');

// Création du serveur express
const app = express();

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

// Configuration du moteur de rendu
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// On fourni l'app au middleware API Docs
apidocs(app);

// On active le middleware pour parser le payload urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// On fourni le routeur au serveur express
app.use(router);

// 404 API
app.use((req, res, next) => {
    next(new ApiError('Endpoint not found', { statusCode: 404 }));
});

// Middleware de gestion d'erreurs
app.use(errorHandler);

// Export du serveur express
module.exports = app;
