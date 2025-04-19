async function buscar_endereco() {
    let cep = document.getElementById("cep").value;
    try{
        let request = await fetch ("https://viacep.com.br/ws/"+cep+"/json/");
        let resposta = await request.json();

        if (!request.ok){
            throw new Error("Erro!\nStatus "+response.status);
        }

        document.getElementById("endereco").value = resposta.logradouro;
    }
    catch(error){
        console.log(error);
    }
}

let nome = document.querySelector(".hero-content h1");
nome.innerText = "Olá "+localStorage.getItem('nome');