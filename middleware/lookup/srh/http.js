const http = require('http');

class ServerRequestHandler {
  constructor(handleRequest) {
    this.handleRequest = handleRequest; // Função de processamento da requisição
  }

  receive() {
    // Cria o servidor HTTP
    const server = http.createServer((req, res) => {
      const { method, url } = req;
      let body = '';

      console.log(`Requisição recebida: ${method} ${url}`);

      // Coleta os dados do corpo da requisição
      req.on('data', (chunk) => {
        body += chunk.toString();
      });

      req.on('end', () => {
        console.log('Dados recebidos do cliente:', body);

        try {
          // Processa a requisição usando a função handleRequest
          const result = this.handleRequest(body);

          // Retorna a resposta como JSON
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(result));
          console.log('Resposta enviada ao cliente:', result);
        } catch (err) {
          // Retorna erro em caso de falha
          console.error('Erro ao processar a requisição:', err);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Erro interno do servidor' }));
        }
      });
    });

    // Inicia o servidor na porta 3001
    server.listen(3001, () => {
      console.log('Servidor HTTP rodando na porta 3001');
    });

    // Trata erros no servidor
    server.on('error', (err) => {
      console.error('Erro no servidor HTTP:', err);
    });
  }
}

module.exports = ServerRequestHandler;
