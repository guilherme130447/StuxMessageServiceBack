const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { baseWebhookURL } = require('./src/config');
require('dotenv').config();

// Criação do aplicativo Express
const app = require('./src/app');

// Definindo a porta
const port = process.env.PORT || 3000;

// Verifica se a variável de ambiente BASE_WEBHOOK_URL está disponível
if (!baseWebhookURL) {
  console.error('BASE_WEBHOOK_URL environment variable is not available. Exiting...');
  process.exit(1); // Termina a aplicação com um código de erro
}

// Criação de um servidor HTTP
const server = http.createServer(app);

// Criação de um servidor WebSocket
const wss = new WebSocket.Server({ server });

// Evento quando um cliente se conecta
wss.on('connection', (ws) => {
  console.log('Novo cliente conectado');

  // Enviar uma mensagem de boas-vindas ao cliente
  ws.send(JSON.stringify({ message: 'Bem-vindo ao servidor WebSocket!' }));

  // Evento para lidar com mensagens recebidas
  ws.on('message', (message) => {
    console.log(`Recebido do cliente: ${message}`);

    // Enviar a mensagem de volta para todos os clientes conectados
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Evento quando um cliente se desconecta
  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});

// Iniciar o servidor
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
