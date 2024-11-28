const dgram = require('dgram');
const net = require('net');
const fs = require('fs');

class ClientRequestHandler {
  constructor(serverHost, serverPort) {
    this.serverHost = serverHost;
    this.serverPort = serverPort;
    this.client = dgram.createSocket('udp4');
  }
  

  send(request) {
    const client = new net.Socket();
    const startTime = Date.now();  // Marca o início da operação

    async function adicionarTextoNoArquivo(nomeArquivo, conteudoNovo) {
      try {
        // Adiciona uma nova linha seguida pelo novo conteúdo
        await fs.promises.appendFile(nomeArquivo, `\n${conteudoNovo}`);
        console.log(`Texto adicionado ao arquivo "${nomeArquivo}" com sucesso!`);
        return "Conteúdo adicionado!";
      } catch (err) {
        console.error('Erro ao adicionar texto no arquivo:', err.message);
        return "Erro ao adicionar conteúdo!";
      }
    }

    return new Promise((resolve, reject) => {
      
      const message = Buffer.from(request);
              // Bind o cliente a uma porta específica para escutar as respostas
      this.client.bind(5000, () => {
          console.log(`Cliente está escutando na porta ${5000}`);
      });

      // Envia a mensagem para o servidor UDP
      this.client.send(message, this.serverPort, this.serverHost, (err) => {
        if (err) {
          reject(err);
        } else {
          console.log('Mensagem enviada ao servidor:', message.toString());
        }
      });

      // Escuta a resposta do servidor
      this.client.on('message', (response) => {
        const endTime = Date.now();  // Marca o fim ao receber a resposta
        const duration = endTime - startTime;  // Calcula o tempo total em ms
        const responseMessage = response.toString();
        adicionarTextoNoArquivo('experiment.txt', duration);
        resolve(JSON.parse(responseMessage));  // Deserializa a resposta
        //this.client.close();  // Fecha o socket depois de receber a resposta
      });
    });
  }
}
module.exports = ClientRequestHandler;