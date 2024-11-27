const dgram = require('dgram');
const server = dgram.createSocket('udp4');
class ServerRequestHandler {
  constructor(handleRequest) {
    this.handleRequest = handleRequest; 
  }

  handle(data, rinfo, server) {
    const request = data.toString();
    console.log("SRH: " + request);
    console.log("Cliente IP: " + rinfo.address + ", Porta: " + rinfo.port);

    const result = this.handleRequest(request);
    const response = Buffer.from(JSON.stringify(result)); 

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
    
    server.bind(3001, () => {
        console.log('Servidor UDP rodando na porta 3001');
    });
    
  }
}


module.exports = ServerRequestHandler;
