let token = localStorage.getItem('access_token');
let nome = document.querySelector(".hero-content h1");
nome.innerText = "Olá "+localStorage.getItem('nome');

async function exibir_form(botao){
    let title = document.querySelector("#form h1");
    if (botao.id == "cadastrar"){
        title.innerText = "Cadastrar";
    }
    else if (botao.id == "atualizar"){
        title.innerText = "Atualizar";
        await preencher();
    }
    
    if (botao.id != "cancelar"){
        document.getElementById("form").style.display = 'block';
        document.getElementById("salvar").addEventListener("click", function () {
            validar_dados(botao);
        });
    }
    else{
        form.reset();
        document.getElementById("form").style.display = 'none';
    }
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
        return resposta
    }
    catch(error){
        console.log(error);
    }
}

async function preencher() {
    let nome = document.getElementById("nome");
    let cep = document.getElementById("cep");
    let endereco = document.getElementById("endereco");
    let numero = document.getElementById("numero");
    let complemento = document.getElementById("complemento");

    let lista = await listar();
    // pelo id
    nome.value = lista.data[0].title
    cep.value = lista.data[0].cep
    endereco.value = lista.data[0].address
    numero.value = lista.data[0].number
    complemento.value = lista.data[0].complement
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
    //Rascunho
    try{
        let request = await fetch(                              
            "https://go-wash-api.onrender.com/api/auth/address/33",{
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
            "https://go-wash-api.onrender.com/api/auth/address/{ID}",{
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