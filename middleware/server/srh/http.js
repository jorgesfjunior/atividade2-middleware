const http = require('http');
const Marshaller = require('../../marshaller');

class ServerRequestHandlerHTTP {
  constructor(handleRequest) {
    //this.service = service;
    this.handleRequest = handleRequest; 
  }
  
  receive() {
    const server = http.createServer((req, res) => {
      let body = '';

      req.on('data', (chunk) => {
        body += chunk;
      });

      req.on('end', () => {
        console.log("Requisição recebida:", body);
        //const invoker = new Invoker(this.service);
        // Processa a requisição com o Invoker
        //const marshaller = new Marshaller();
        //const { method, args } = marshaller.unmarshal(body);
        //const result = this.service[method](...args);
        //const response = JSON.stringify(result);
        const result = this.handleRequest(body);
        const response = JSON.stringify(result);

        // Responde ao cliente em JSON
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response));

        console.log("Resposta enviada:", response);
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
