function mostrarDestaques() {

    const lista = document.getElementById("produtos-destaque");

    let html = "";

    let contador = 0;

    for (let produto of produtos) {

        if (contador === 3) {
            break;
        }

        html += `
            <div class="produto">

                <img src="${produto.imagem}" alt="${produto.nome}">

                <h3>${produto.nome}</h3>

                <p>${produto.descricao}</p>

                <strong>
                    R$ ${produto.variacoes[0].preco.toFixed(2).replace(".", ",")}
                </strong>

                <a href="../Produtos/produtos.html" class="botao-produto">
                    Ver produto
                </a>

            </div>
        `;

        contador++;
    }

    lista.innerHTML = html;
}

mostrarDestaques();