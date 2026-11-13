const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

function verificarLogin() {
    if (!usuarioLogado) {   
        return false;
    }
    return true;
}

function chaveCarrinho() {
    return `carrinho_${usuarioLogado.email}`;
}

function carregarCarrinho() {
    return usuarioLogado
        ? JSON.parse(localStorage.getItem(chaveCarrinho())) || []
        : [];
}

function salvarCarrinho(carrinho) {
    if (usuarioLogado) {
        localStorage.setItem(chaveCarrinho(), JSON.stringify(carrinho));
    }
}

function adicionarCarrinho(id, nome, preco, imagem) {
    if (!verificarLogin()) {
        alert("Faça login primeiro!");
        window.location.href = "../login/login.html";
        return;
    }

    let carrinho = carregarCarrinho();
    let produto = carrinho.find(p => p.id == id);

    if (produto) {
        produto.quantidade++;
    } else {
        carrinho.push({
            id, nome, preco: Number(preco), imagem, quantidade: 1
        });
    }

    salvarCarrinho(carrinho);
    alert("Produto adicionado ao carrinho!");
}

function exibirCarrinho() {
    if (!verificarLogin()) return;

    const lista = document.getElementById("lista-carrinho");
    if (!lista) return;

    const carrinho = carregarCarrinho();

    lista.innerHTML = carrinho.length ? carrinho.map(p => `
        <div class="produto-carrinho">
            <img src="${p.imagem}" alt="${p.nome}">

            <div class="informacoes-produto">
                <h3>${p.nome}</h3>
                <p>${p.preco.toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}</p>

                <div class="quantidade-produto">
                    <button onclick="diminuirQuantidade('${p.id}')">-</button>
                    <span>${p.quantidade}</span>
                    <button onclick="aumentarQuantidade('${p.id}')">+</button>
                </div>

                <button class="botao-remover" onclick="removerProduto('${p.id}')">
                    Remover
                </button>
            </div>

            <strong>${(p.preco * p.quantidade).toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}</strong>
        </div>
    `).join("") : "<p>Seu carrinho está vazio!</p>";

    atualizarResumo();
}

function alterarQuantidade(id, valor) {
    let carrinho = carregarCarrinho();
    let produto = carrinho.find(p => p.id == id);

    if (produto) produto.quantidade += valor;

    salvarCarrinho(carrinho.filter(p => p.quantidade > 0));
    exibirCarrinho();
}

function aumentarQuantidade(id) {
    alterarQuantidade(id, 1);
}

function diminuirQuantidade(id) {
    alterarQuantidade(id, -1);
}

function removerProduto(id) {
    salvarCarrinho(carregarCarrinho().filter(p => p.id != id));
    exibirCarrinho();
}

function atualizarResumo() {
    const carrinho = carregarCarrinho();

    const quantidade = carrinho.reduce((soma, p) => soma + p.quantidade, 0);
    const total = carrinho.reduce((soma, p) => soma + p.preco * p.quantidade, 0);

    document.getElementById("quantidade-carrinho").textContent = quantidade;
    document.getElementById("quantidade-carrinho-resumo").textContent = quantidade;
    document.getElementById("total-carrinho").textContent =
        total.toLocaleString("pt-BR", {style:"currency", currency:"BRL"});
}

function finalizarCompra() {
    if (!verificarLogin()) return;

    if (carregarCarrinho().length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    alert("Compra realizada com sucesso!");
    salvarCarrinho([]);
    exibirCarrinho();
}

document.addEventListener("DOMContentLoaded", exibirCarrinho);