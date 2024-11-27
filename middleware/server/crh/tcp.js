const net = require('net');
const fs = require('fs');

class ClientRequestHandler {
  constructor(serverHost = 'localhost', serverPort = 3001) { // Use a porta correta
    this.serverHost = serverHost;
    this.serverPort = serverPort;
  }

  send(request) {

    return new Promise((resolve, reject) => {
      const client = new net.Socket();

      client.connect(this.serverPort, this.serverHost, () => {
        console.log('Conectado ao servidor');
        client.write(request);
      });

      client.on('data', (data) => {
        console.log('Resposta do servidor:', data.toString());
        resolve(data.toString());
        client.destroy(); // Fecha a conexão
      });

      client.on('error', (err) => {
        console.error('Erro na conexão:', err.message);
        reject(err);
      });

      client.on('close', () => {
        console.log('Conexão fechada');
      });
    });
  }
}

module.exports = ClientRequestHandler;