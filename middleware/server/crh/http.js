const http = require('http');

class ClientRequestHandler {
  constructor(serverHost = 'localhost', serverPort = 3001) {
    this.serverHost = serverHost;
    this.serverPort = serverPort;
  }

  send(request) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: this.serverHost,
        port: this.serverPort,
        path: '/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(request),
        },
      };

      const req = http.request(options, (res) => {
        let responseData = '';

        res.on('data', (chunk) => {
          responseData += chunk;
        });

        res.on('end', () => {
          console.log('Resposta recebida do servidor:', responseData);
          resolve(responseData);
        });
      });

      req.on('error', (err) => {
        console.error('Erro ao enviar requisição:', err.message);
        reject(err);
      });

      // Envia o request como payload da requisição HTTP
      req.write(request);
      req.end();
    });
  }
}

module.exports = ClientRequestHandler;
