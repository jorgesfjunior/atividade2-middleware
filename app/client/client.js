const ClientProxy = require("../../middleware/client/clientProxy");

const proxy = new ClientProxy();


async function createFile(name, data, clientProxy) {
    console.log('createFile');
    const args = [name, data]; 
    try {
      const result = await clientProxy.createFile(...args);
      console.log(`Resultado da chamada remota (createFile):`, result);
    } catch (error) {
      console.error("Erro ao invocar o método remoto:", error);
    }
  }


async function updateFile(name, data, clientProxy) {
    const args = [name, data]; 
    try {
      const result = await clientProxy.updateFile(...args);
      console.log(`Resultado da chamada remota (updateFile):`, result);
    } catch (error) {
      console.error("Erro ao invocar o método remoto:", error);
    }
  }

async function deleteFile(name, clientProxy) {
    const args = [name]; 
    try {
      // Invoca o método remoto passando o nome e os argumentos
      const result = await clientProxy.deleteFile(...args);
      console.log(`Resultado da chamada remota (deleteFile):`, result);
    } catch (error) {
      console.error("Erro ao invocar o método remoto:", error);
    }
  }

  function pausa(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

const nome = "teste.txt";
const data = "0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789"

proxy.resolve('filesystem')
  .then(async result => {
    const [address, port] = result.split(':');
    console.log(address);
    console.log(port)

    const clientProxy = new ClientProxy(address, parseInt(port));
   for(let i = 0; i<100; i++) {
      createFile(nome, data, clientProxy);
      await pausa(100);
      updateFile(nome, data, clientProxy);
      await pausa(100);
      deleteFile(nome, clientProxy);
    }

  })
  .catch(err => {
    console.error('Erro ao resolver serviço:', err);
  });
