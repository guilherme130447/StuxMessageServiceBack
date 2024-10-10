const express = require('express');
const bodyParser = require('body-parser');
const { applyCors, apikey } = require('./middleware'); // Importa os middlewares
const { maxAttachmentSize } = require('./config');
const { restoreSessions } = require('./sessions');
const { routes } = require('./routes');

const app = express();

// Aplica o middleware de CORS
app.use(applyCors);

// Aplica a validação da API key
app.use(apikey);

// Configurações do Body Parser
app.disable('x-powered-by');
app.use(bodyParser.json({ limit: maxAttachmentSize + 1000000 }));
app.use(bodyParser.urlencoded({ limit: maxAttachmentSize + 1000000, extended: true }));

// Definindo as rotas
app.use('/', routes);

// Restaurando sessões
restoreSessions();

module.exports = app;
