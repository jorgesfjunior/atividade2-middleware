const http = require('http');
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
      const startTime = Date.now(); // Marca o início da operação

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
        let data = '';

        // Coleta os dados recebidos
        res.on('data', (chunk) => {
          data += chunk;
        });

        // Processa a resposta completa
        res.on('end', async () => {
          const endTime = Date.now(); // Marca o fim da operação
          const duration = endTime - startTime; // Calcula o tempo total

          console.log('Resposta do servidor:', data);

          // Salva a duração no arquivo
          await this.adicionarTextoNoArquivo('experiment.txt', duration);

          resolve(JSON.parse(data));
        });
      });

      req.on('error', (err) => {
        console.error('Erro na requisição:', err.message);
        reject(err);
      });

      // Envia o corpo da requisição
      req.write(request);
      req.end();
    });
  }
}

module.exports = ClientRequestHandler;
