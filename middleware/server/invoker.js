const ServerRequestHandler = require("../server/srh/http");
const Marshaller = require("../marshaller");

class Invoker {
    constructor(service) {
      this.service = service;
    }

    handleRequest(request) {
      console.log("INVOKER" + request)
      const marshaller = new Marshaller();
      const { method, args } = marshaller.unmarshal(request);
      return this.service[method](...args);
    }

    run(){
      //const serverRequestHandler = new ServerRequestHandler(this.service, this);
      //serverRequestHandler.receive();
      //console.log("INVOKER: Inicializando o ServerRequestHandler...");

      // Instancia o ServerRequestHandler e passa o Invoker como referência
      const serverRequestHandler = new ServerRequestHandler(this.handleRequest.bind(this));
      serverRequestHandler.receive();
    }
  }

  module.exports = Invoker;
  