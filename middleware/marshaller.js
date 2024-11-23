class Marshaller {
    marshal(methodName, params) {
      return JSON.stringify({ method: methodName, args: params });
    }
  
    unmarshal(response) {
      return JSON.parse(response);
    }
  }


module.exports = Marshaller;