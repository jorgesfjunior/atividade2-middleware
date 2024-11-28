const net = require('net');
const fs = require('fs');

class ClientRequestHandler {
  constructor(serverHost, serverPort) {
    this.serverHost = serverHost;
    this.serverPort = serverPort;
  }

  async adicionarTextoNoArquivo(nomeArquivo, conteudoNovo) {
    try {
      await fs.promises.appendFile(nomeArquivo, `\n${conteudoNovo}`);
      console.log(`Texto adicionado ao arquivo "${nomeArquivo}" com sucesso!`);
    } catch (err) {
      console.error('Erro ao adicionar texto no arquivo:', err.message);
    }
  }

  send(request) {
    return new Promise((resolve, reject) => {
      const client = new net.Socket();
      const startTime = Date.now(); // Marca o início da operação

      client.connect(this.serverPort, this.serverHost, () => {
        console.log('Conexão estabelecida com o servidor.');
        client.write(request);
      });

      client.on('data', async (data) => {
        const endTime = Date.now(); // Marca o fim ao receber a resposta
        const duration = endTime - startTime; // Calcula o tempo total em ms

        console.log('Resposta do servidor:', data.toString());

        // Salva a duração da operação em um arquivo
        await this.adicionarTextoNoArquivo('experiment.txt', duration);

        resolve(JSON.parse(data.toString()));
        client.end(); // Encerra a conexão após receber a resposta
      });

      client.on('error', (err) => {
        console.error('Erro na conexão:', err.message);
        reject(err);
      });

      client.on('close', () => {
        console.log('Conexão encerrada.');
      });
    });
  }
}

module.exports = ClientRequestHandler;
