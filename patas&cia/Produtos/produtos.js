const produtos = [
    {
        id: 1,
        nome: "Ração para Cães Adultos",
        pet: "cao",
        imagem: "../imagens/racao_cachorro.png",
        descricao: "Alimento completo com frango e arroz.",
        variacoes: [
            { nome: "3 kg", preco: 26.90 },
            { nome: "5 kg", preco: 59.90},
            { nome: "10 kg", preco: 129.90 }
        ]
    },
    {
        id: 2,
        nome: "Ração para Gatos",
        pet: "gato",
        imagem: "../imagens/racao_gato.png",
        descricao: "Sabor salmão, com baixo teor de gordura.",
        variacoes: [
            { nome: "1 kg", preco: 33.90 },
            { nome: "3 kg", preco: 76.90},
            { nome: "10 kg", preco: 159.90 }
        ]
    },
    {
        id: 3,
        nome: "Bolinha Cravo",
        pet: "cao",
        imagem: "../imagens/bolinha.png",
        descricao: "Brinquedo resistente que apita quando mordido.",
        variacoes: [
            { nome: "Pequena", preco: 14.90 },
            { nome: "Grande", preco: 24.90 }
        ]
    },
    {
        id: 4,
        nome: "Varinha com Penas",
        pet: "gato",
        imagem: "../imagens/varinha.png",
        descricao: "Brinquedo interativo para brincar com o seu gato.",
        variacoes: [
            { nome: "Único", preco: 19.90 }
        ]
    },
    {
        id: 5,
        nome: "Caminha Macia",
        pet: "ambos",
        imagem: "../imagens/caminha.png",
        descricao: "Cama de pelúcia lavável, serve para cães e gatos.",
        variacoes: [
            { nome: "P", preco: 79.90 },
            { nome: "M", preco: 119.90 },
            { nome: "G", preco: 159.90 }
        ]
    },
    {
        id: 6,
        nome: "Roupinha de Tricô",
        pet: "ambos",
        imagem: "../imagens/roupinha.png",
        descricao: "Suéter quentinho para os dias frios.",
        variacoes: [
            { nome: "P", preco: 39.90 },
            { nome: "M", preco: 49.90 },
            { nome: "G", preco: 59.90 }
        ]
    }
];

const nomesPets = { cao: "Cães", gato: "Gatos", ambos: "Cães e gatos" };

function lerCarrinho() {
    try {        
        return JSON.parse(localStorage.getItem("carrinho")) || [];
    } catch (erro) {
        return [];
    }
}

function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

let carrinho = lerCarrinho();

const formatarPreco = (valor) => "R$ " + valor.toFixed(2).replace(".", ",");

const ordenacoes = {
    relevancia: (a, b) => a.id - b.id,
    menorPreco: (a, b) => a.variacoes[0].preco - b.variacoes[0].preco,
    maiorPreco: (a, b) => b.variacoes[0].preco - a.variacoes[0].preco,
    nomeAZ: (a, b) => a.nome.localeCompare(b.nome)
};

function atualizarContador() {
    const total = carrinho.reduce((soma, item) => soma + item.quantidade, 0);
    document.getElementById("contador-carrinho").textContent = total;
}

let temporizador;
function mostrarAviso(mensagem) {
    const aviso = document.getElementById("aviso");
    aviso.textContent = mensagem;
    aviso.classList.add("visivel");
    clearTimeout(temporizador);
    temporizador = setTimeout(() => aviso.classList.remove("visivel"), 2000);
}

function criarCard(produto) {
    const opcoes = produto.variacoes
        .map((variacao, posicao) => `<option value="${posicao}">${variacao.nome}</option>`)
        .join("");

    const imagem = produto.imagem
        ? `<img src="${produto.imagem}" alt="${produto.nome}">`
        : `<span>${produto.nome.toUpperCase()}<br><small>(imagem aqui)</small></span>`;

    return `
        <article class="card-produto">
            <div class="imagem-card">${imagem}</div>
            <div class="info-card">
                <small>Para ${nomesPets[produto.pet]}</small>
                <h3>${produto.nome}</h3>
                <p>${produto.descricao}</p>

                <label for="var-${produto.id}">Tamanho / peso:</label>
                <select id="var-${produto.id}" onchange="atualizarPreco(${produto.id})">
                    ${opcoes}
                </select>

                <strong id="preco-${produto.id}">${formatarPreco(produto.variacoes[0].preco)}</strong>
                <button onclick="adicionar(${produto.id})">Adicionar ao carrinho</button>
            </div>
        </article>
    `;
}

function mostrarProdutos() {
    const busca = document.getElementById("busca").value.toLowerCase();
    const pet = document.getElementById("filtro-pet").value;
    const ordem = document.getElementById("ordenar").value;

    const visiveis = produtos
        .filter((p) => p.nome.toLowerCase().includes(busca))                           
        .filter((p) => pet === "todos" || p.pet === pet || p.pet === "ambos")          
        .sort(ordenacoes[ordem]);                                                      

    const lista = document.getElementById("lista-produtos");

    if (visiveis.length === 0) {
        lista.innerHTML = '<p class="sem-resultados">Nenhum produto encontrado. 🐾</p>';
    } else {
        lista.innerHTML = visiveis.map(criarCard).join("");
    }
}

function atualizarPreco(id) {
    const produto = produtos.find((p) => p.id === id);
    const posicao = document.getElementById("var-" + id).value;
    document.getElementById("preco-" + id).textContent = formatarPreco(produto.variacoes[posicao].preco);
}

function adicionar(id) {
    const produto = produtos.find((p) => p.id === id);
    const posicao = document.getElementById("var-" + id).value;
    const variacao = produto.variacoes[posicao];

    const itemExistente = carrinho.find((item) => item.id === id && item.variacao === variacao.nome);

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({
            id: produto.id,
            nome: produto.nome,
            variacao: variacao.nome,
            preco: variacao.preco,
            imagem: produto.imagem,
            quantidade: 1
        });
    }

    salvarCarrinho();
    atualizarContador();
    mostrarAviso(produto.nome + " (" + variacao.nome + ") adicionado ao carrinho!");
}

if (document.getElementById("busca")){
    mostrarProdutos();
    atualizarContador();
}
