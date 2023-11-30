// Classe Tarefa
class Tarefa {
    constructor(nome) {
      this.nome = nome;
    }
  }
  
  // Função para adicionar a tarefa no DOM
  function adicionaTarefaDOM(tarefa) {
    const lista = document.getElementById('listaTarefas');
    const novaTarefa = document.createElement('li');
    novaTarefa.textContent = tarefa.nome;
    lista.appendChild(novaTarefa);
  }
  
  // Função para adicionar a tarefa no armazenamento local (localStorage)
  function adicionaTarefaNoStorage(tarefa) {
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas.push(tarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }
  
  // Função para limpar o campo de tarefa
  function limparCampoTarefa() {
    document.getElementById('inputTarefa').value = '';
  }
  
  // Evento ao clicar no botão de adicionar tarefa
  document.getElementById('btnAdicionar').addEventListener('click', function() {
    const nomeTarefa = document.getElementById('inputTarefa').value;
    if (nomeTarefa.trim() !== '') {
      const novaTarefa = new Tarefa(nomeTarefa);
      adicionaTarefaDOM(novaTarefa);
      adicionaTarefaNoStorage(novaTarefa);
      limparCampoTarefa();
    } else {
      alert('Por favor, insira o nome da tarefa.');
    }
  });
  
  // Carregar tarefas do armazenamento local ao carregar a página
  window.addEventListener('DOMContentLoaded', function() {
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas.forEach(tarefa => {
      adicionaTarefaDOM(tarefa);
    });
  });
  