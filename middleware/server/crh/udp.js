const dgram = require('dgram');
const net = require('net');
const fs = require('fs');

class ClientRequestHandler {
  constructor(serverHost = 'localhost', serverPort = 3001) {
    this.serverHost = serverHost;
    this.serverPort = serverPort;
    this.client = dgram.createSocket('udp4');
  }
  

  send(request) {
    const dgram = require('dgram');
    const client = dgram.createSocket('udp4'); // Cria o socket UDP
  
    return new Promise((resolve, reject) => {
      const message = Buffer.from(request);
      
      this.client.bind(3002, () => {
        console.log(`Cliente está escutando na porta ${3002}`);
    });
      // Envia a mensagem para o servidor UDP
      client.send(message, this.serverPort, this.serverHost, (err) => {
        if (err) {
          client.close(); // Fecha o socket em caso de erro no envio
          return reject(err);
        }
        console.log('Mensagem enviada ao servidor:', message.toString());
      });
  
      // Escuta a resposta do servidor
      client.on('message', (response) => {
        try {
          const responseMessage = response.toString();
          console.log('Resposta recebida do servidor:', responseMessage);
  
          resolve(JSON.parse(responseMessage)); // Deserializa e resolve a promessa
        } catch (err) {
          reject(err); // Trata erros de parsing
        } finally {
          client.close(); // Fecha o socket após resolver/rejeitar
        }
      });
  
      // Trata erros no socket
      client.on('error', (err) => {
        console.error('Erro no socket:', err);
        client.close();
        reject(err);
      }); // Tempo limite ajustável
    });
  }
  
}
module.exports = ClientRequestHandler;