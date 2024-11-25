const dgram = require('dgram');
const server = dgram.createSocket('udp4');

class ServerRequestHandler {
  constructor(invoker) {
    this.invoker = invoker;
  }

  handle(data, rinfo, server) {
    // Converte os dados recebidos em string
    const request = data.toString();
    console.log("SRH: " + request);
    console.log("Cliente IP: " + rinfo.address + ", Porta: " + rinfo.port);

    // Processa a requisição via Invoker
    const result = this.invoker.handleRequest(request);
    const response = Buffer.from(JSON.stringify(result)); // UDP espera um Buffer para enviar

    server.send(response, 0, response.length, rinfo.port, rinfo.address, (err) => {
      if (err) {
        console.error('Erro ao enviar a resposta:', err);
      } else {
        console.log('Resposta enviada ao cliente:', response.toString());
      }
    });
  }

  receive() {
    server.on('message', (msg, rinfo) => {
        console.log(`Mensagem recebida do cliente: ${msg} de ${rinfo.address}:${rinfo.port}`);
        this.handle(msg, rinfo, server);  // Processa a mensagem recebida
    });
    
    server.bind(3000, () => {
        console.log('Servidor UDP rodando na porta 3000');
    });
    
  }
}


module.exports = ServerRequestHandler;
