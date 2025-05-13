let token = localStorage.getItem('access_token');
let nome = document.querySelector(".hero-content h1");
nome.innerText = "Olá "+localStorage.getItem('nome');

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

async function listar(){
    try{
        let request = await fetch(
            "https://go-wash-api.onrender.com/api/auth/address",{
            method:"GET",          
            headers:{
                "Authorization": `Bearer ${token}`
                }                    
            }
        );
        let resposta = await request.json();
        console.log(resposta);

        if (!request.ok){
            throw new Error("Erro!\nStatus "+response.status);
        }
    }
    catch(error){
        console.log(error);
    }
}

async function enviar_endereco() {
    let nome = document.getElementById("nome").value;
    let cep = document.getElementById("cep").value;
    let endereco = document.getElementById("endereco").value;
    let numero = document.getElementById("numero").value;
    let complemento = document.getElementById("complemento").value;

    let dados = {
        "title": nome,
        "cep": cep,
        "address": endereco,
        "number": numero,
        "complement": complemento,
    }

    try{
        let request = await fetch(                              
            "https://go-wash-api.onrender.com/api/auth/address",{
                method:"POST",
                body:JSON.stringify(dados),                
                headers:{
                    'Content-Type':'application/json',
                    "Authorization": `Bearer ${token}`
                }                    
            }
        );

        let resposta = await request.json();
        console.log(resposta);

        if (!request.ok){
            throw new Error("Erro!\nStatus "+response.status);
        }
    }
    catch (error){
        alert(error.message);
    }

}