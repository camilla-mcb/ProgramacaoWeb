
function criarCard(produto) {
    return `
        <div class="produto">

            <img src="${produto.imagem}" alt="${produto.nome}">

            <h3>${produto.nome}</h3>

            <p>${produto.descricao}</p>

            <strong>
                R$ ${produto.variacoes[0].preco.toFixed(2).replace(".", ",")}
            </strong>

        </div>
    `;
}


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
