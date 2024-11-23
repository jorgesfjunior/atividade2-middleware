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
  }

  module.exports = Invoker;