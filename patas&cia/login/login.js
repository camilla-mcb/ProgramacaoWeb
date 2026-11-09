const dadosSalvos = JSON.parse(localStorage.getItem("usuarios"))

for (let i = 0; i < dadosSalvos.length; i++) {
    if(usuarios[i].email == "admin@email.com" && usuarios[i].senha == "123"){
        document.getElementById("msg").innerHTML = "Entrou como Administrador"
    }
}

