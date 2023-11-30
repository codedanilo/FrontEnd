class Computador {
    constructor(marca, modelo, processador, ram) {
      this.marca = marca;
      this.modelo = modelo;
      this.processador = processador;
      this.ram = ram;
    }
  
    ligar() {
      return `O computador ${this.marca} ${this.modelo} está ligado.`;
    }
  
    desligar() {
      return `O computador ${this.marca} ${this.modelo} está desligado.`;
    }
  }
  
  const computador1 = new Computador('Dell', 'Inspiron', 'Intel Core i5', '8GB');
  const computador2 = new Computador('HP', 'Pavilion', 'AMD Ryzen 7', '16GB');
  const computador3 = new Computador('Apple', 'MacBook Pro', 'Apple M1', '16GB');
  
  function objetoParaMap(obj) {
    return new Map(Object.entries(obj));
  }
  
  function criarListaNoHTML(map) {
    const lista = document.createElement('ul');
  
    for (const [chave, valor] of map) {
      const itemLista = document.createElement('li');
      itemLista.textContent = `${chave}: ${valor}`;
      lista.appendChild(itemLista);
    }
  
    document.body.appendChild(lista);
  }
  
  const mapComputador1 = objetoParaMap(computador1);
  const mapComputador2 = objetoParaMap(computador2);
  const mapComputador3 = objetoParaMap(computador3);
  
  criarListaNoHTML(mapComputador1);
  criarListaNoHTML(mapComputador2);
  criarListaNoHTML(mapComputador3);
  