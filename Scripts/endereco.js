let token = localStorage.getItem('access_token');
let nome = document.querySelector(".hero-content h1");
nome.innerText = "Olá "+localStorage.getItem('nome');

function exibir_form(botao){
    document.getElementById("form").style.display = 'block';
    document.getElementById("salvar").addEventListener("click", function () {
        validar_dados(botao);
    });
}

function validar_dados(botao){
    let nome = document.getElementById("nome").value;
    let cep = document.getElementById("cep").value;
    let endereco = document.getElementById("endereco").value;
    let numero = document.getElementById("numero").value;
    let complemento = document.getElementById("complemento").value;

    if (!nome || !cep || !endereco || !numero){
        alert("Preencha Todos os Campos!");
        return
    }
    let dados = {
        "title": nome,
        "cep": cep,
        "address": endereco,
        "number": numero,
        "complement": complemento,
    }
    if (botao.id == "cadastrar"){
        enviar_endereco(dados);
    }
    else{
        atualizar_endereco(dados);
    }
}

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

async function enviar_endereco(dados) {
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
        document.getElementById("form").style.display = 'none';
        alert("Endereço Cadastrado com Sucesso!");

        if (!request.ok){
            throw new Error("Erro!\nStatus "+response.status);
        }
    }
    catch (error){
        alert(error.message);
    }
}

async function atualizar_endereco(dados) {
    // Rascunho
    try{
        let request = await fetch(                              
            "https://go-wash-api.onrender.com/api/auth/address{ID}",{ // id do endereço (listagem [i].id)
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
        document.getElementById("form").style.display = 'none';
        alert("Endereço Atualizado com Sucesso!");

        if (!request.ok){
            throw new Error("Erro!\nStatus "+response.status);
        }
    }
    catch (error){
        alert(error.message);
    }
}

async function excluir_endereco() {
    // Rascunho    
    try{
        let request = await fetch(
            "https://go-wash-api.onrender.com/api/auth/address{ID}",{
            method:"DELETE",          
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