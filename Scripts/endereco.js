let token = localStorage.getItem('access_token');
let nome = document.querySelector(".hero-content h1");
nome.innerText = "Olá "+localStorage.getItem('nome');
let lista_enderecos = []

async function exibir_form(botao){
    let title = document.querySelector("#form h1");
    document.getElementById("lista").style.display = 'none';
    if (botao){
        title.innerText = "Cadastrar";
        form.reset();
    }
    else {
        title.innerText = "Atualizar";
    }
    document.getElementById("form").style.display = 'block';
}

function cancela(){
    form.reset();
    document.getElementById("form").style.display = 'none';
}

function validar_dados(){  
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
    let title = document.querySelector("#form h1");
    if (title.innerText == "Cadastrar"){
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
    document.getElementById("lista").style.display = 'block';
    document.getElementById("form").style.display = 'none';
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
        lista_enderecos = resposta.data;
        let tabelaEnderecos = document.getElementById("lista_enderecos");
        tabelaEnderecos.innerHTML = "";  
        lista_enderecos.forEach((endereco) => {
        let row = `<tr>
            <td>${endereco.title}</td>
            <td>${endereco.cep}</td>
            <td>${endereco.address}</td>
            <td>${endereco.number}</td>
            <td>${endereco.complement || ""}</td>
            <td><button onclick="preencher(${endereco.id})">Atualizar</button></td>
            <td><button onclick="excluir_endereco(${endereco.id})">Remover</button></td>
        </tr>`;
        tabelaEnderecos.innerHTML += row;
    });
    }
    catch(error){
        console.log(error);
    }
}

async function preencher(id) {
    let nome = document.getElementById("nome");
    let cep = document.getElementById("cep");
    let morada = document.getElementById("endereco");
    let numero = document.getElementById("numero");
    let complemento = document.getElementById("complemento");
    
    for (let index = 0; index < lista_enderecos.length; index++){
        if (lista_enderecos[index].id == id){
            nome.value = lista_enderecos[index].title;
            cep.value = lista_enderecos[index].cep;
            morada.value = lista_enderecos[index].address;
            numero.value = lista_enderecos[index].number;
            complemento.value = lista_enderecos[index].complement;
        }
    }
    let id_endereco = document.getElementsByClassName("endereco")[0];
    id_endereco.id = id
    exibir_form();
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
        alert("Endereço Cadastrado com Sucesso!");
        cancela()

        if (!request.ok){
            throw new Error("Erro!\nStatus "+response.status);
        }
    }
    catch (error){
        alert(error.message);
    }
}

async function atualizar_endereco(dados) {
    let id = document.getElementsByClassName("endereco")[0].id;
    try{
        let request = await fetch(                              
            "https://go-wash-api.onrender.com/api/auth/address/"+id,{
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

async function excluir_endereco(id) {
    try{
        let request = await fetch(
            "https://go-wash-api.onrender.com/api/auth/address/"+id,{
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
        alert("Endereço Excluído com Sucesso!");
        listar()
    }
    catch(error){
        console.log(error);
    }
}