const myForm = document.querySelector("#form-cad")
const inputNome = document.querySelector("#nome")
const inputEmail = document.querySelector("#email")
const inputSenha = document.querySelector("#senha")

const msgErro = document.querySelector("#msgErro")
const msgFoi = document.querySelector("#msgFoi")
const z = document.querySelector("#msg")


myForm.addEventListener("submit", function (event) {  // Tratamento de Exceções
    event.preventDefault()  /* impede que o formulário seja enviado antes
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

        if(usuarioCadastrado()){ // se o usuario já estiver cadastrado, para
            return
        }

        cadastrar()
        msg.style.display = "none"
        msgErro.style.display = "none"

        msgFoi.style.display = "block"
        msgFoi.innerHTML = "Cadastro realizado com sucesso! Voltando para o Login..."

        setTimeout(function () {
            window.location.href = "../login/login.html"
        }, 3000)

    } catch (err) {
        msgFoi.style.display = "none"
        msgErro.style.display = "none"
        msg.style.display = "block"
        z.innerHTML = "Erro: " + err + "."
    }
})

function cadastrar() { // LocalStorege

    const nomeDig = inputNome.value
    const emailDig = inputEmail.value
    const senhaDig = inputSenha.value

    //Recupera os usuários já salvos anteriormente (ou array vazio)
    const objUsuarios = JSON.parse(localStorage.getItem("usuariosDoSite")) || []

    //Cria o objeto do novo usuário
    const novoUsuario = {
        nome: nomeDig,
        email: emailDig,
        senha: senhaDig
    }

    //Adiciona o novo usuário ao array
    objUsuarios.push(novoUsuario)

    //Salva o array atualizado de volta no localStorage (convertendo para string)
    localStorage.setItem("usuariosDoSite", JSON.stringify(objUsuarios))
}

function usuarioCadastrado() { // verifica se o usuario já foi cadastrado no LocalStorage

    let usuarios = JSON.parse(localStorage.getItem("usuariosDoSite")) || []

    let email = document.getElementById("email").value

    let encontrado = false

    for (let i = 0; i < usuarios.length; i++) { // verifica se o usuário já existe no localStorage
        if (usuarios[i].email == email) {

            msgFoi.style.display = "none"
            msg.style.display = "none"

            msgErro.style.display = "block"
            msgErro.innerHTML = "Usuário já cadastrado no sistema. Volte para a tela de Login"

            return true
        }
    }

    return false
}