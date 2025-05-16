// let indexEditando = null;
// let tituloOriginal = null;
// const api = 'https://anotaapp-1.onrender.com/api/anotacoes';

// document.addEventListener('DOMContentLoaded', () => {
//     carregarAnotacoes();

//     document.getElementById('form-anotacao').addEventListener('submit', async e => {
//         e.preventDefault();

//         const titulo = document.getElementById('titulo').value;
//         const texto = document.getElementById('texto').value;
//         const autor = document.getElementById('autor').value;

//         const anotacao = { titulo, texto, autor };

//         if (tituloOriginal !== null) {
//             // PUT para editar
//             await fetch(`${api}/${encodeURIComponent(tituloOriginal)}`, {
//                 method: 'PUT',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(anotacao)
//             });
//             tituloOriginal = null;
//         } else {
//             // POST para adicionar
//             await fetch(api, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(anotacao)
//             });
//         }

//         e.target.reset();
//         carregarAnotacoes();
//     });
// });

// async function carregarAnotacoes() {
//     const lista = document.getElementById('lista-anotacoes');
//     lista.innerHTML = '';

//     const resposta = await fetch(api);
//     const anotacoes = await resposta.json();

//     anotacoes.forEach(a => {
//         const item = document.createElement('li');
//         item.innerHTML = `
//             <span><strong>Título:</strong> ${a.titulo}</span>
//             <span><strong>Texto:</strong> ${a.texto}</span>
//             <span><strong>Autor:</strong> ${a.autor}</span>
//             <span><strong>Data:</strong> ${a.dataCriacao}</span>
//             <button onclick="editarAnotacao('${a.titulo}', '${a.texto}', '${a.autor}')">Editar</button>
//             <button onclick="removerAnotacao('${a.titulo}')">Excluir</button>
//         `;
//         lista.appendChild(item);
//     });
// }

// async function removerAnotacao(titulo) {
//     await fetch(`${api}/${encodeURIComponent(titulo)}`, { method: 'DELETE' });
//     carregarAnotacoes();
// }

// function editarAnotacao(titulo, texto, autor) {
//     document.getElementById('titulo').value = titulo;
//     document.getElementById('texto').value = texto;
//     document.getElementById('autor').value = autor;
//     tituloOriginal = titulo; // usado na edição
// }



// let indexEditando = null;
// let tituloOriginal = null;

// document.addEventListener('DOMContentLoaded', () => {
//     carregarAnotacoes();

//     document.getElementById('form-anotacao').addEventListener('submit', async e => {
//         e.preventDefault();

//         const titulo = document.getElementById('titulo').value;
//         const texto = document.getElementById('texto').value;
//         const autor = document.getElementById('autor').value;

//         const anotacao = { titulo, texto, autor };

//         if (tituloOriginal !== null) {
//             // PUT para editar
//             await fetch(`http://localhost:8080/api/anotacoes/${encodeURIComponent(tituloOriginal)}`, {
//                 method: 'PUT',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(anotacao)
//             });
//             tituloOriginal = null;
//         } else {
//             // POST para adicionar
//             await fetch('http://localhost:8080/api/anotacoes', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(anotacao)
//             });
//         }

//         e.target.reset();
//         carregarAnotacoes();
//     });
// });

// async function carregarAnotacoes() {
//     const lista = document.getElementById('lista-anotacoes');
//     lista.innerHTML = '';

//     const resposta = await fetch('http://localhost:8080/api/anotacoes');
//     const anotacoes = await resposta.json();

//     anotacoes.forEach(a => {
//         const item = document.createElement('li');
//         item.innerHTML = `
//             <span><strong>Título:</strong> ${a.titulo}</span>
//             <span><strong>Texto:</strong> ${a.texto}</span>
//             <span><strong>Autor:</strong> ${a.autor}</span>
//             <span><strong>Data:</strong> ${a.dataCriacao}</span>
//             <button onclick="editarAnotacao('${a.titulo}', '${a.texto}', '${a.autor}')">Editar</button>
//             <button onclick="removerAnotacao('${a.titulo}')">Excluir</button>
//         `;
//         lista.appendChild(item);
//     });
// }

// async function removerAnotacao(titulo) {
//     await fetch(`http://localhost:8080/api/anotacoes/${encodeURIComponent(titulo)}`, { method: 'DELETE' });
//     carregarAnotacoes();
// }

// function editarAnotacao(titulo, texto, autor) {
//     document.getElementById('titulo').value = titulo;
//     document.getElementById('texto').value = texto;
//     document.getElementById('autor').value = autor;
//     tituloOriginal = titulo; // usado na edição
// }





// Separacão

document.addEventListener('DOMContentLoaded', () => {
    carregarAnotacoes();

    document.getElementById('form-anotacao').addEventListener('submit', e => {
        e.preventDefault();

        const titulo = document.getElementById('titulo').value;
        const texto = document.getElementById('texto').value;
        const autor = document.getElementById('autor').value;
        const dataCriacao = new Date().toISOString().split('T')[0];

        const novaAnotacao = { titulo, texto, autor, dataCriacao };

        let anotacoes = JSON.parse(localStorage.getItem('anotacoes')) || [];
        anotacoes.push(novaAnotacao);
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


// Separação


// const api = 'http://localhost:8080/api/anotacoes'; // ajuste se necessário

// document.addEventListener('DOMContentLoaded', () => {
//     carregarAnotacoes();

//     document.getElementById('form-anotacao').addEventListener('submit', async e => {
//         e.preventDefault();
//         const titulo = document.getElementById('titulo').value;
//         const texto = document.getElementById('texto').value;
//         const autor = document.getElementById('autor').value;

//         const anotacao = { titulo, texto, autor };

//         await fetch(api, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(anotacao)
//         });

//         e.target.reset();
//         carregarAnotacoes();
//     });
// });

// async function carregarAnotacoes() {
//     const lista = document.getElementById('lista-anotacoes');
//     lista.innerHTML = '';

//     const resposta = await fetch(api);
//     const anotacoes = await resposta.json();

//     anotacoes.forEach(a => {
//         const item = document.createElement('li');
//         item.innerHTML = `
//             <span><strong>Título:</strong> ${a.titulo}</span>
//             <span><strong>Texto:</strong> ${a.texto}</span>
//             <span><strong>Autor:</strong> ${a.autor}</span>
//             <span><strong>Data:</strong> ${a.dataCriacao}</span>
//             <button onclick="removerAnotacao('${a.titulo}')">Excluir</button>
//         `;
//         lista.appendChild(item);
//     });
// }

// async function removerAnotacao(titulo) {
//     await fetch(`${api}/${encodeURIComponent(titulo)}`, { method: 'DELETE' });
//     carregarAnotacoes();
// }
