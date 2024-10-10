const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { maxAttachmentSize } = require('./config');
const { restoreSessions } = require('./sessions');
const { routes } = require('./routes');

const app = express();

// Middleware CORS
const corsOptions = {
  origin: 'http://localhost:3000', // ou a URL do front-end em produção
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'x-api-key'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Aplica o middleware de CORS

// Configurações do Body Parser
app.disable('x-powered-by');
app.use(bodyParser.json({ limit: maxAttachmentSize + 1000000 }));
app.use(bodyParser.urlencoded({ limit: maxAttachmentSize + 1000000, extended: true }));

// Definindo as rotas
app.use('/', routes);

// Restaurando sessões
restoreSessions();

module.exports = app;
