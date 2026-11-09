const myForm = document.querySelector("#form-cad")
const inputNome = document.querySelector("#nome")
const inputEmail = document.querySelector("#email")
const inputSenha = document.querySelector("#senha")

myForm.addEventListener("submit", function (event) {  // Tratamento de Exceções
    event.preventDefault();  /* impede que o formulário seja enviado antes
                            de ser verificado*/
    try {
        var x = document.getElementById("nome").value

        if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(x)) { // permitir somente letras
            throw "Digite somente letras no campo";
        }

        var y = document.getElementById("email").value

        var atpos = y.indexOf("@")
        var dotpos = y.lastIndexOf(".")

        if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= y.length) {
            throw "Digite um email válido."
        }

        cadastrar()

    } catch (err) {
        var z = document.getElementById("msg")
        z.innerHTML = "Erro: " + err + "."
    }
})

function cadastrar() { // LocalStorege

    const nomeDig = inputNome.value
    const emailDig = inputEmail.value
    const senhaDig = inputSenha.value

    //Recupera os usuários já salvos anteriormente (ou array vazio)
    const usuarios = JSON.parse(localStorage.getItem("usuariosDoSite")) || []

    //Cria o objeto do novo usuário
    const novoUsuario = {
        nome: nomeDig,
        email: emailDig,
        senha: senhaDig
    }

    //Adiciona o novo usuário ao array
    usuarios.push(novoUsuario)

    //Salva o array atualizado de volta no localStorage (convertendo para string)
    localStorage.setItem("usuariosDoSite", JSON.stringify(usuarios))


    window.alert("Cadastro realizado com sucesso!")

    window.location.href = "../login/login.html"
}