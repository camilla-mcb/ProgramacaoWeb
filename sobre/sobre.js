const horarios = {
	0:{abre:8, fecha: 18},//domingo
	1:{abre:8, fecha:22},//segunda
	2:{abre:8, fecha:22},//terça
	3:{abre:8, fecha:22},//quarta
	4:{abre:8, fecha:22},//quinta
	5:{abre:8, fecha:22},//sexta
	6:{abre:8, fecha:22},//sábado
	
};



function lojaEstaAberta(){
	const agora = new Date();
	const dia = agora.getDay();//0 a 6
	const hora = agora.getHours();// 0 a 23
	//const hora = 23;

   const horarioHoje = horarios[dia];
   
   //estrutura de decição para saber se a loja esta aberta ou fechada
   if(hora >= horarioHoje.abre && hora < horarioHoje.fecha ){
   	return true;
   }else{
   	return false;
   }


}


function tempoRestante(horaAlvo, amanha){
	const agora = new Date();
	const alvo = new Date();

	alvo.setHours(horaAlvo, 0, 0, 0); //hoje, às horaAlvo:00:00
   

     //empurra para o proximo dia   
     if(amanha){
		alvo.setDate(alvo.getDate() + 1);
	}

	const diferenca = alvo - agora; // milissegundos

	/* Por que dividimos por 1000? (1 segundo = 1000 milissegundos.)
O que o % 60 faz? (Pega o resto da divisão: 125 segundos viram 5, porque 125 = 2 × 60 + 5.)
O Math.floor serve para arredondar para baixo e tirar as casas decimais.*/

	const horas = Math.floor(diferenca / (1000 * 60 * 60));
	const minutos = Math.floor((diferenca / (1000 * 60)) % 60);
	const segundos = Math.floor((diferenca / 1000) % 60);

	return {horas, minutos , segundos};
}

function proximoEvento(){
	const agora = new Date();
    const dia = agora.getDay();
   const hora = agora.getHours();
    const horarioHoje = horarios[dia];
   // const hora = 23;

	if (lojaEstaAberta()) {
		return {texto: "Aberto agora", horaAlvo: horarioHoje.fecha, amanha: false};
	}

	if (hora < horarioHoje.abre) {
		return {texto: "Fechado", horaAlvo: horarioHoje.abre, amanha: false};
	}

	const diaSeguinte = (dia + 1) % 7;
	return {texto: "Fechado", horaAlvo: horarios[diaSeguinte].abre, amanha: true};
}


	function atualizarStatus(){
		const evento = proximoEvento();
		const tempo =  tempoRestante(evento.horaAlvo, evento.amanha);

		const elemento = document.getElementById("status-loja");

		const rotulo = evento.texto === "Aberto agora" ? "Fecha em" : "Abre em";
        
        
		elemento.textContent = `${evento.texto} - ${rotulo} ${tempo.horas}h ${tempo.minutos}min ${tempo.segundos}s`;

}
atualizarStatus();                    // mostra já na hora
setInterval(atualizarStatus, 1000);   // repete a cada 1000 msatualizarStatus();
