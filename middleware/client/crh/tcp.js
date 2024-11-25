const net = require('net');
const fs = require('fs');

class ClientRequestHandler {
  constructor(serverHost = 'localhost', serverPort = 3000) { // Use a porta correta
    this.serverHost = serverHost;
    this.serverPort = serverPort;
  }

  send(request) {
    const startTime = Date.now(); 
    
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
      const client = new net.Socket();

      client.connect(this.serverPort, this.serverHost, () => {
        console.log('Conectado ao servidor');
        client.write(request);
      });

      client.on('data', (data) => {
        const endTime = Date.now();  // Marca o fim ao receber a resposta
        const duration = endTime - startTime;  // Calcula o tempo total em ms
        adicionarTextoNoArquivo('experiment.txt', duration);
        console.log('Resposta do servidor:', data.toString());
        resolve(data.toString());
        //client.destroy(); // Fecha a conexão
      });

      client.on('error', (err) => {
        console.error('Erro na conexão:', err.message);
        reject(err);
      });

      client.on('close', () => {
        console.log('Conexão fechada');
      });
    });
  }
}

module.exports = ClientRequestHandler;