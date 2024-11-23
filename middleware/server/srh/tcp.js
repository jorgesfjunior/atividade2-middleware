class ServerRequestHandler {
    constructor(invoker) {
        this.invoker = invoker;
    }
  
    handle(socket, data) {
        // O `data` é um Buffer, vamos converter para string
        const request = data.toString();
        
        // Processa a requisição via Invoker
        const result = this.invoker.handleRequest(request);
        console.log("RESULT: ", result);
  
        // Envia a resposta de volta ao cliente via socket
        socket.write(JSON.stringify(result));
    }
  }
  
  module.exports = ServerRequestHandler;