const myLogin = document.querySelector("#form-login")

const msgEntrou = document.getElementById("msgEntrou")
const msgCad = document.getElementById("msgCad")

myLogin.addEventListener("submit", function (event) { 
    event.preventDefault()

    const dadosSalvos = JSON.parse(localStorage.getItem("usuariosDoSite")) || []

    const email = document.querySelector("[name = 'email']").value
    const senha = document.querySelector("[name = 'senha']").value

    for (let i = 0; i < dadosSalvos.length; i++) {

        if (dadosSalvos[i].email == email && dadosSalvos[i].senha == senha) { // verificação se o usuário está no localStorage

            if (email == "admin@email.com" && senha == "000") {
                msgEntrou.innerHTML = "Entrou como Administrador! Aguarde..."
            } else {
                msgEntrou.innerHTML = `Bem vindo, ${dadosSalvos[i].nome}! Aguarde..`
            }

            msgEntrou.style.display = "block"
            msgCad.style.display = "none"

            setTimeout(function () {
                window.location.href = "" // página de produtos
            }, 3000)

            return
        }
    }
    msgCad.style.display = "block"
    msgEntrou.style.display = "none"

    msgCad.innerHTML = "Usuário não encontrado. Primeiro faça o cadastro."
})


