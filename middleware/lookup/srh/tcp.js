const net = require('net');

class ServerRequestHandler {
  constructor(handleRequest) {
    this.handleRequest = handleRequest; // Função de processamento da requisição
  }

  handle(data, socket) {
    const request = data.toString();
    console.log('SRH: ' + request);
    console.log('Cliente IP: ' + socket.remoteAddress + ', Porta: ' + socket.remotePort);

    const result = this.handleRequest(request); // Processa a requisição
    const response = JSON.stringify(result);

    // Envia a resposta para o cliente
    socket.write(response, (err) => {
      if (err) {
        console.error('Erro ao enviar a resposta:', err);
      } else {
        console.log('Resposta enviada ao cliente:', response);
      }
    });
  }

  receive() {
    const server = net.createServer((socket) => {
      console.log('Nova conexão recebida de:', socket.remoteAddress, 'Porta:', socket.remotePort);

      // Evento de dados recebidos do cliente
      socket.on('data', (data) => {
        console.log(`Mensagem recebida do cliente: ${data.toString()} de ${socket.remoteAddress}:${socket.remotePort}`);
        this.handle(data, socket); // Processa os dados recebidos
      });

      // Evento de fechamento da conexão
      socket.on('end', () => {
        console.log(`Conexão encerrada com o cliente: ${socket.remoteAddress}:${socket.remotePort}`);
      });

      // Evento de erro
      socket.on('error', (err) => {
        console.error('Erro no socket do cliente:', err);
      });
    });

    // Inicia o servidor na porta 3001
    server.listen(3001, () => {
      console.log('Servidor TCP rodando na porta 3001');
    });

    // Trata erros no servidor
    server.on('error', (err) => {
      console.error('Erro no servidor:', err);
    });
  }
}

module.exports = ServerRequestHandler;
