function validar(e) { // Tratamento de Exceções
    e.preventDefault();  /* impede que o formulário seja enviado antes
                            de ser verificado*/
    try {
        var x = document.getElementById("nome").value

        if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(x)) { // permitir somente letras
            throw "Digite somente letras";
        }

        var y = document.getElementById("email").value

        var atpos = y.indexOf("@") 
        var dotpos = y.lastIndexOf(".")

        if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= y.length) {
            throw "Digite um email válido."
        }

    } catch (err) {
        var z = document.getElementById("msg")
        z.innerHTML = "Erro: " + err + "."
    }
}

function cadastrar() { // LocalStorege
    let nome = document.getElementById('nome').value
    let email = document.getElementById('email').value
    let senha = document.getElementById('senha').value

    localStorage.setItem('nomeUsuario', nome)
    localStorage.setItem('emailUsuario', email)
    localStorage.setItem('senhaUsuario', senha)

    window.alert("Cadastro realizado com sucesso!")

    //window.location.href = "/login/login.html"
}