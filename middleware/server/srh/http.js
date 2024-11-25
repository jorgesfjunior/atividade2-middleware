const http = require('http');
const Invoker = require('../invoker');

console.log(Invoker);

class ServerRequestHandlerHTTP {
  constructor(service) {
    this.service = service;
    this.invoker = new Invoker(this.service);
  }

  receive() {
    const server = http.createServer((req, res) => {
      let body = '';

      req.on('data', (chunk) => {
        body += chunk;
      });

      req.on('end', () => {
        console.log("Requisição recebida:", body);

        // Processa a requisição com o Invoker
        const result = this.invoker.handleRequest(body);

        // Responde ao cliente em JSON
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));

        console.log("Resposta enviada:", result);
      });

      req.on('error', (err) => {
        console.error("Erro na requisição:", err);
        res.writeHead(500);
        res.end("Erro interno no servidor");
      });
    });

    server.listen(3000, () => {
      console.log('Servidor HTTP rodando na porta 3000');
    });
  }
}

module.exports = ServerRequestHandlerHTTP;
