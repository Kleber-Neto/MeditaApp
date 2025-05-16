// Script para gerenciar anotações no navegador usando Local Storage
let indexEditando = null;

document.addEventListener('DOMContentLoaded', () => {
    carregarAnotacoes();

    document.getElementById('form-anotacao').addEventListener('submit', e => {
        e.preventDefault();

        const titulo = document.getElementById('titulo').value;
        const texto = document.getElementById('texto').value;
        const autor = document.getElementById('autor').value;
        const dataCriacao = new Date().toISOString().split('T')[0];

        let anotacoes = JSON.parse(localStorage.getItem('anotacoes')) || [];

        if (indexEditando !== null) {
            // Atualizar anotação existente
            anotacoes[indexEditando] = { titulo, texto, autor, dataCriacao };
            indexEditando = null;
        } else {
            // Nova anotação
            anotacoes.push({ titulo, texto, autor, dataCriacao });
        }

        localStorage.setItem('anotacoes', JSON.stringify(anotacoes));
        e.target.reset();
        carregarAnotacoes();
    });
});

function carregarAnotacoes() {
    const lista = document.getElementById('lista-anotacoes');
    lista.innerHTML = '';

    let anotacoes = JSON.parse(localStorage.getItem('anotacoes')) || [];

    anotacoes.forEach((a, index) => {
        const item = document.createElement('li');
        item.innerHTML = `
            <span><strong>Título:</strong> ${a.titulo}</span>
            <span><strong>Texto:</strong> ${a.texto}</span>
            <span><strong>Autor:</strong> ${a.autor}</span>
            <span><strong>Data:</strong> ${a.dataCriacao}</span>
            <button onclick="editarAnotacao(${index})">Editar</button>
            <button onclick="removerAnotacao(${index})">Excluir</button>
        `;
        lista.appendChild(item);
    });
}

function removerAnotacao(index) {
    let anotacoes = JSON.parse(localStorage.getItem('anotacoes')) || [];
    anotacoes.splice(index, 1);
    localStorage.setItem('anotacoes', JSON.stringify(anotacoes));
    carregarAnotacoes();
}

function editarAnotacao(index) {
    let anotacoes = JSON.parse(localStorage.getItem('anotacoes')) || [];
    const a = anotacoes[index];
    document.getElementById('titulo').value = a.titulo;
    document.getElementById('texto').value = a.texto;
    document.getElementById('autor').value = a.autor;
    indexEditando = index;
}
