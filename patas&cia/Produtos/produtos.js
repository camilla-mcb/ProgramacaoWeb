/* =========================================================
   produtos.js  –  Produtos | Patas & Cia

   1. Produtos iniciais (os 6 que já vêm com o site)
   2. localStorage: ler e salvar a lista de produtos
   3. Página de gerenciar produtos (cadastrar, editar e remover)

   Atenção: a home (landing-page) também carrega este arquivo
   e usa a variável "produtos" da parte 2.
   ========================================================= */


/* ---------------------------------------------------------
   1. PRODUTOS INICIAIS
   Só são usados na primeira vez, quando o localStorage está vazio.
   Depois disso, vale o que for salvo pela página.
   --------------------------------------------------------- */
const produtosIniciais = [
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


/* ---------------------------------------------------------
   2. LOCALSTORAGE
   O localStorage só guarda texto, por isso usamos
   JSON.stringify (array -> texto) e JSON.parse (texto -> array).
   --------------------------------------------------------- */
function salvarProdutos(lista) {
    localStorage.setItem("produtos", JSON.stringify(lista));
}

function lerProdutos() {
    let lista = JSON.parse(localStorage.getItem("produtos"));

    // null = nunca foi salvo nada: começa com os produtos iniciais
    if (lista === null) {
        lista = produtosIniciais;
        salvarProdutos(lista);
    }

    return lista;
}

// A lista que as páginas usam (a home usa esta variável)
const produtos = lerProdutos();


/* ---------------------------------------------------------
   3. PÁGINA DE GERENCIAR PRODUTOS
   --------------------------------------------------------- */
const nomesPets = { cao: "Cães", gato: "Gatos", ambos: "Cães e gatos" };

// Guarda o id do produto que está sendo editado.
// null = o formulário está cadastrando um produto novo.
let idEditando = null;

// 189.9 -> "R$ 189,90"
function formatarPreco(valor) {
    return "R$ " + valor.toFixed(2).replace(".", ",");
}


// ----- Mostrar a tabela e o resumo -----
function mostrarTabela() {
    let html = "";

    for (let produto of produtos) {

        // monta o texto das variações: "3 kg: R$ 26,90"
        let variacoes = "";
        for (let v of produto.variacoes) {
            variacoes += v.nome + ": " + formatarPreco(v.preco) + "<br>";
        }

        html += `
            <tr>
                <td><img src="${produto.imagem}" alt="${produto.nome}" width="50"></td>
                <td>${produto.nome}</td>
                <td>${nomesPets[produto.pet]}</td>
                <td>${variacoes}</td>
                <td>
                    <button onclick="editarProduto(${produto.id})">Editar</button>
                    <button onclick="removerProduto(${produto.id})">Remover</button>
                </td>
            </tr>
        `;
    }

    if (produtos.length === 0) {
        html = '<tr><td colspan="5">Nenhum produto cadastrado.</td></tr>';
    }

    document.getElementById("tabela-produtos").innerHTML = html;
    mostrarResumo();
}

// Relatório: quantos produtos existem e o menor e o maior preço
function mostrarResumo() {
    let menor = null;
    let maior = null;

    for (let produto of produtos) {
        for (let v of produto.variacoes) {
            if (menor === null || v.preco < menor) {
                menor = v.preco;
            }
            if (maior === null || v.preco > maior) {
                maior = v.preco;
            }
        }
    }

    let texto = "Produtos cadastrados: " + produtos.length;
    if (menor !== null) {
        texto += " | Menor preço: " + formatarPreco(menor) + " | Maior preço: " + formatarPreco(maior);
    }

    document.getElementById("resumo").innerHTML = texto;
}


// ----- Ler as 3 linhas de variação do formulário -----
function lerVariacoes() {
    const variacoes = [];

    for (let i = 1; i <= 3; i++) {
        const nome = document.getElementById("var-nome-" + i).value.trim();
        const texto = document.getElementById("var-preco-" + i).value;

        // linha totalmente vazia: ignora e vai para a próxima
        if (nome === "" && texto === "") {
            continue;
        }

        const preco = parseFloat(texto);

        if (nome === "" || isNaN(preco) || preco <= 0) {
            throw "Na variação " + i + ", preencha o tamanho e um preço maior que zero";
        }

        // o carrinho separa os itens pelo tamanho, então não pode repetir
        for (let v of variacoes) {
            if (v.nome.toLowerCase() === nome.toLowerCase()) {
                throw "O tamanho " + nome + " está repetido";
            }
        }

        variacoes.push({ nome: nome, preco: preco });
    }

    if (variacoes.length === 0) {
        throw "Cadastre pelo menos uma variação (tamanho e preço)";
    }

    // deixa da mais barata para a mais cara (a home mostra o primeiro preço)
    variacoes.sort((a, b) => a.preco - b.preco);

    return variacoes;
}


// ----- Cadastrar ou salvar alterações (o mesmo formulário serve para os dois) -----
function salvarProduto(evento) {
    evento.preventDefault();   // impede a página de recarregar

    const mensagem = document.getElementById("mensagem");

    try {
        const nome = document.getElementById("nome").value.trim();
        const pet = document.getElementById("pet").value;
        const imagem = document.getElementById("imagem").value.trim();
        const descricao = document.getElementById("descricao").value.trim();

        // Validações: cada throw manda uma mensagem para o catch
        if (nome.length < 3) {
            throw "O nome precisa ter pelo menos 3 letras";
        }

        for (let produto of produtos) {
            if (produto.nome.toLowerCase() === nome.toLowerCase() && produto.id !== idEditando) {
                throw "Já existe um produto com esse nome";
            }
        }

        if (imagem === "" || imagem.indexOf(".") === -1) {
            throw "Informe o nome do arquivo da imagem, com a extensão (ex.: coleira.png)";
        }

        if (descricao === "") {
            throw "Escreva uma descrição";
        }

        const variacoes = lerVariacoes();

        if (idEditando === null) {
            // CADASTRAR: o id novo é o maior id existente + 1
            let novoId = 1;
            for (let produto of produtos) {
                if (produto.id >= novoId) {
                    novoId = produto.id + 1;
                }
            }

            produtos.push({
                id: novoId,
                nome: nome,
                pet: pet,
                imagem: "../imagens/" + imagem,
                descricao: descricao,
                variacoes: variacoes
            });
        } else {
            // EDITAR: acha o produto e troca os campos
            for (let produto of produtos) {
                if (produto.id === idEditando) {
                    produto.nome = nome;
                    produto.pet = pet;
                    produto.imagem = "../imagens/" + imagem;
                    produto.descricao = descricao;
                    produto.variacoes = variacoes;
                }
            }
        }

        salvarProdutos(produtos);   // grava no localStorage
        const editou = (idEditando !== null);
        limparFormulario();
        mostrarTabela();

        mensagem.className = "ok";
        mensagem.innerHTML = editou ? "Alterações salvas!" : "Produto cadastrado!";

    } catch (erro) {
        mensagem.className = "erro";
        mensagem.innerHTML = "Erro: " + erro + ".";
    }
}


// ----- Editar: copia os dados do produto para o formulário -----
function editarProduto(id) {
    for (let produto of produtos) {
        if (produto.id === id) {
            idEditando = id;

            document.getElementById("nome").value = produto.nome;
            document.getElementById("pet").value = produto.pet;
            document.getElementById("imagem").value = produto.imagem.replace("../imagens/", "");
            document.getElementById("descricao").value = produto.descricao;

            // preenche as 3 linhas de variação (as que sobrarem ficam vazias)
            for (let i = 1; i <= 3; i++) {
                const v = produto.variacoes[i - 1];
                document.getElementById("var-nome-" + i).value = v ? v.nome : "";
                document.getElementById("var-preco-" + i).value = v ? v.preco : "";
            }

            document.getElementById("titulo-form").innerHTML = "Editando: " + produto.nome;
            document.getElementById("btn-salvar").value = "Salvar alterações";
            document.getElementById("btn-cancelar").style.display = "inline-block";
            document.getElementById("mensagem").innerHTML = "";

            window.scrollTo(0, 0);   // sobe a página para mostrar o formulário
        }
    }
}

// Volta o formulário para o modo "cadastrar produto novo"
function limparFormulario() {
    idEditando = null;
    document.getElementById("form-produto").reset();

    document.getElementById("titulo-form").innerHTML = "Cadastrar novo produto";
    document.getElementById("btn-salvar").value = "Cadastrar produto";
    document.getElementById("btn-cancelar").style.display = "none";
}


// ----- Remover -----
function removerProduto(id) {
    for (let i = 0; i < produtos.length; i++) {
        if (produtos[i].id === id) {

            if (confirm("Remover " + produtos[i].nome + "?")) {
                produtos.splice(i, 1);          // tira 1 item na posição i
                salvarProdutos(produtos);

                if (idEditando === id) {
                    limparFormulario();         // estava editando justamente este
                }
                mostrarTabela();
            }
            break;
        }
    }
}

// Apaga a chave do localStorage. Ao recarregar, voltam os 6 produtos iniciais.
function restaurarIniciais() {
    if (confirm("Apagar as alterações e voltar aos 6 produtos iniciais?")) {
        localStorage.removeItem("produtos");
        window.location.reload();
    }
}


/* ---------------------------------------------------------
   4. QUANDO A PÁGINA ABRE
   A home também carrega este arquivo, e lá não existe o formulário.
   Por isso só rodamos isto se o formulário existir na página.
   --------------------------------------------------------- */
if (document.getElementById("form-produto") !== null) {
    document.getElementById("form-produto").addEventListener("submit", salvarProduto);
    mostrarTabela();
}