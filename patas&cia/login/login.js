const myLogin = document.querySelector("#form-login")

const msgEntrou = document.getElementById("msgEntrou")
const msgCad = document.getElementById("msgCad")

myLogin.addEventListener("submit", function (event) {
    event.preventDefault()

    const dadosSalvos = JSON.parse(localStorage.getItem("usuariosCadastrados")) || []

    const emailDig = document.getElementById("email").value
    const senhaDig = document.getElementById("senha").value

    for (let i = 0; i < dadosSalvos.length; i++) {

        if (dadosSalvos[i].email == emailDig && dadosSalvos[i].senha == senhaDig) { // verificação se o usuário está no localStorage

            // se logar como admin vai para a pagina de gerenciamento de produtos
            if (emailDig === "admin@email.com" && senhaDig === "000") {
                msgEntrou.innerHTML = "Entrou como Administrador! Aguarde..."

                setTimeout(function () {
                    window.location.href = "../produtos/produtos.html"
                }, 3000)

            // se logar como cliente vai para a página inicial
            } else {
                msgEntrou.innerHTML = `Bem vindo, ${dadosSalvos[i].nome}! Aguarde..`

                setTimeout(function () {
                    window.location.href = "../landing-page/index.html"
                }, 3000)

            }

            msgEntrou.style.display = "block"
            msgCad.style.display = "none"

            return
        }
    }
    msgCad.style.display = "block"
    msgEntrou.style.display = "none"

    msgCad.innerHTML = "Usuário não encontrado. Primeiro faça o cadastro."
})


