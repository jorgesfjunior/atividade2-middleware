const net = require('net');

class ServerRequestHandlerTCP {
  constructor(invoker) {
    this.invoker = invoker;
  }

  handle(data, socket) {
    // Converte os dados recebidos em string
    const request = data.toString();
    console.log("SRH: " + request);

    // Processa a requisição via Invoker
    const result = this.invoker.handleRequest(request);
    const response = JSON.stringify(result);

    // Envia a resposta para o cliente
    socket.write(response, () => {
      console.log('Resposta enviada ao cliente:', response);
    });
  }

  receive() {
    const server = net.createServer((socket) => {
      console.log(`Cliente conectado: ${socket.remoteAddress}:${socket.remotePort}`);

      socket.on('data', (data) => {
        console.log(`Mensagem recebida: ${data}`);
        this.handle(data, socket); // Processa a mensagem recebida
      });

      socket.on('end', () => {
        console.log('Cliente desconectado.');
      });

      socket.on('error', (err) => {
        console.error('Erro no socket:', err);
      });
    });

    server.listen(3000, () => {
      console.log('Servidor TCP rodando na porta 3000');
    });
  }
}

module.exports = ServerRequestHandlerTCP;
