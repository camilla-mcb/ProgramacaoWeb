function cadastrar(){
    let nome = document.getElementById('nome').value
    let email = document.getElementById('email').value
    let senha = document.getElementById('senha').value

    localStorage.setItem('nomeUsuario', nome)
    localStorage.setItem('emailUsuario', email)
    localStorage.setItem('senhaUsuario', senha)

    window.location.href = "/login/login.html"
}