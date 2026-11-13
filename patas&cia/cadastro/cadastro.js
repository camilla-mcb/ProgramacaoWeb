const myForm = document.querySelector("#form-cad")

const msgErro = document.querySelector("#msgErro")
const msgFoi = document.querySelector("#msgFoi")
const z = document.querySelector("#msg")

// ============= Tratamento de Exeções ==============

myForm.addEventListener("submit", function (event) {
    event.preventDefault()  /* impede que o formulário seja enviado antes de ser verificado*/

    const nomeDig = document.getElementById("nome").value
    const emailDig = document.getElementById("email").value
    const senhaDig = document.getElementById("senha").value

    try {

        if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(nomeDig)) { // permitir somente letras
            throw "Digite somente letras no campo Nome";
        }

        const atpos = emailDig.indexOf("@")
        const dotpos = emailDig.lastIndexOf(".")

        if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= emailDig.length) {
            throw "Digite um email válido."
        }

        if (usuarioCadastrado(emailDig)) { // se o usuario já estiver cadastrado, para
            return
        }

        cadastrar(nomeDig, emailDig, senhaDig)
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

// ======================== Cadastro ====================

//Recupera os usuários já salvos anteriormente como string e converte para array (ou array vazio caso nada esteja salvo)
const usuarios = JSON.parse(localStorage.getItem("usuariosCadastrados")) || []

function cadastrar(nomeDig, emailDig, senhaDig) { // cadastra no LocalStorege

    //Cria o objeto do novo usuário
    const novoUsuario = {
        nome: nomeDig,
        email: emailDig,
        senha: senhaDig
    }

    //Adiciona o novo usuário ao array
    usuarios.push(novoUsuario)

    //Salva o array atualizado de volta no localStorage (convertendo para string)
    localStorage.setItem("usuariosCadastrados", JSON.stringify(usuarios))
}


function usuarioCadastrado(emailDig) { // verifica se o usuario já foi cadastrado no LocalStorage

    for (let i = 0; i < usuarios.length; i++) { // verifica se o usuário já existe no localStorage
        if (usuarios[i].email === emailDig) {

            msgFoi.style.display = "none"
            msg.style.display = "none"

            msgErro.style.display = "block"
            msgErro.innerHTML = "Usuário já cadastrado no sistema. Volte para a tela de Login"

            return true
        }
    }

    return false
}