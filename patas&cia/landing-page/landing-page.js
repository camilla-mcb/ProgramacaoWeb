
function criarCard(produto) {
    return `
        <div class="produto">

            <img src="${produto.imagem}" alt="${produto.nome}">

            <h3>${produto.nome}</h3>

            <p>${produto.descricao}</p>

            <strong>
                R$ ${produto.variacoes[0].preco.toFixed(2).replace(".", ",")}
            </strong>

            <button
                class="botao-adicionar"
                data-id="${produto.id}"
                data-nome="${produto.nome}"
                data-preco="${produto.variacoes[0].preco}"
                data-imagem="${produto.imagem}">

                
                Adicionar ao carrinho

            </button>

        </div>
    `;
}


// DETECTAR CLIQUE NO BOTÃO
document.addEventListener("click", function (event) {

    const botao = event.target.closest(".botao-adicionar");

    if (botao) {

        adicionarCarrinho(
            botao.dataset.id,
            botao.dataset.nome,
            botao.dataset.preco,
            botao.dataset.imagem
        );
    }

});


function mostrarDestaques() {

    const lista = document.getElementById("produtos-destaque");

    let html = "";
    let contador = 0;

    for (let produto of produtos) {

        if (contador === 3) {
            break;
        }

        html += criarCard(produto);

        contador++;
    }

    lista.innerHTML = html;
}


function mostrarTodosProdutos() {

    const lista = document.getElementById("lista-produtos-modal");

    let html = "";

    for (let produto of produtos) {
        html += criarCard(produto);
    }

    lista.innerHTML = html;
}


// Abrir o painel
document.getElementById("btn-ver-mais").addEventListener("click", function() {

    mostrarTodosProdutos();

    document.getElementById("modal-produtos").style.display = "block";

});


// Fechar o painel
document.getElementById("btn-fechar").addEventListener("click", function() {

    document.getElementById("modal-produtos").style.display = "none";

});


mostrarDestaques();
