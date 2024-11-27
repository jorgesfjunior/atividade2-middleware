const Invoker = require('./invoker');

class Lookup {
    constructor() {
      this.registry = new Map(); // Armazena o mapeamento de nomes de serviços e seus endereços
    }
  
    register(serviceName, address) {
      if (this.registry.has(serviceName)) {
        return `O serviço "${serviceName}" já está registrado.`;
      }
      this.registry.set(serviceName, address);
      console.log("MEU DEUS AQUI TA SENDO REGISTRADO MAS ESSA PORRA N FUNFA")
      console.log(Array.from(this.registry.entries()));
      return 'Registrado';
    }
  
    unregister(serviceName) {
      if (!this.registry.has(serviceName)) {
        return `O serviço "${serviceName}" não está registrado.`;
      }
      this.registry.delete(serviceName);
      console.log(Array.from(this.registry.entries()));
      return 'Deletado';
    }
  

    resolve(serviceName) {
      console.log(Array.from(this.registry.entries()));
      if (!this.registry.has(serviceName)) {
        return `O serviço "${serviceName}" não foi encontrado.`;
      }
      return this.registry.get(serviceName);
    }
  
  }
  
  module.exports = Lookup;

  const lookup = new Lookup();

  const service = {
    register: (a,b) => lookup.register(a,b),
    unregister: (a) => lookup.unregister(a),
    resolve: (a) => lookup.resolve(a),
    list: () => lookup.list
  };
  
  const invoker = new Invoker(service);
  invoker.run();
  