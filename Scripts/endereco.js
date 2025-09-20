let token = localStorage.getItem('access_token');           // Para utilizar Token nas Requisição HTTP
let nome = document.querySelector(".hero-content h1");      // Texto que vai ser exibido
nome.innerText = "Olá "+localStorage.getItem('nome');       // Exibir nome do Usuário na Página sem precisar puxadar da API
let lista_enderecos = []

// Função para Exibir Formulário de Gerenciamento de Endereços
function exibir_form(botao){
    let title = document.querySelector("#form h1");                 // Para alterar título do Formulário
    document.getElementById("lista").style.display = 'none';        // Esconder Lista de Endereços
    // Se chamar função via Botão de Cadastrar da Página
    if (botao){
        title.innerText = "Cadastrar";      // Título do Formulário
        form.reset();                       // Limpar Formulário
    }
    // Se chamar função via Botão de Atualizar na Lista de Endereços
    else {
        title.innerText = "Atualizar";      // Título do Formulário
    }
    document.getElementById("form").style.display = 'block';        // Exibir Formulário
}

// Função para Limpar Formulário de Endereço
function cancela(){
    form.reset();                                               // Limpar Formulário
    document.getElementById("form").style.display = 'none';     // Esconder Formulário
}

// Verificar e Validar dados do Formulário antes de enviar para a API
function validar_dados(){  
    let nome = document.getElementById("nome").value;
    let cep = document.getElementById("cep").value;
    let endereco = document.getElementById("endereco").value;
    let numero = document.getElementById("numero").value;
    let complemento = document.getElementById("complemento").value;

    // Verifica se todos os campos foram preenchidos
    if (!nome || !cep || !endereco || !numero){
        alert("Preencha Todos os Campos!");
        return
    }

    // Corpo da Requisição
    let dados = {
        "title": nome,
        "cep": cep,
        "address": endereco,
        "number": numero,
        "complement": complemento,
    }

    let title = document.querySelector("#form h1");
    if (title.innerText == "Cadastrar"){    
        // Se chamar função via Botão da Página
        // Chama Função da Requisição HTTP para Criar Endereço
        enviar_endereco(dados);
    }
    else{
        // Se chamar função via Botão da Lista de Endereços
        // Chama Função da Requisição HTTP para Atualizar Endereço
        atualizar_endereco(dados);
    }
}

// Função para Preencher Automaticamente dados dos Endereços ao buscar dados via CEP
async function buscar_endereco() {
    let cep = document.getElementById("cep").value;
    try{
        let request = await fetch ("https://viacep.com.br/ws/"+cep+"/json/");
        if (!request.ok){
            throw new Error("Erro!\nStatus "+response.status);
        }
        let resposta = await request.json();
        if (resposta.logradouro == undefined){
            // Se API retornar Nome da Rua como "undefined" CEP digitado é Inválido
            alert("CEP Inválido!");
            document.getElementById("cep").value = "";      // Limpa Campo do CEP ao digitar CEP Inválido
        }
        else{
            document.getElementById("endereco").value = resposta.logradouro;    // Preenche Campo do Nome da Rua no Formulário
        }
    }
    catch(error){
        console.log(error);
    }
}

// Função que vai enviar requisição HTTP para a API para Listar Endereços
async function listar(){
    document.getElementById("form").style.display = 'none';
    try{
        // Requisição HTTP para API
        let request = await fetch(
            "https://go-wash-api.onrender.com/api/auth/address",{
            method:"GET",          
            headers:{
                "Authorization": `Bearer ${token}`
                }                    
            }
        );
        
        let resposta = await request.json();        // Converte Resposta da API para Objeto

        // Se resposta da API não for OK
        if (!request.ok){
            // Imprime resposta no console para fins de debug
            console.log(resposta);
            throw new Error("Erro!\nStatus "+response.status);
        }

        // Lista de Endereços recebe data que retornou da API
        lista_enderecos = resposta.data;
        // Verifica se Lista é "undefined" por não ter mais acesso a API
        if (lista_enderecos == undefined) {
            // Imprime resposta no console para fins de debug
            console.log(resposta)
            throw new Error(resposta.status)
        }
        let tabelaEnderecos = document.getElementById("lista_enderecos");   // Nome da Tabela
        tabelaEnderecos.innerHTML = "";                                     // Limpando Tabela
        
        // Laço para preencher tabela conforme cada Endereço na Lista
        lista_enderecos.forEach((endereco) => {
        // Linha da Tabela
            let row = `<tr>
            <td>${endereco.title}</td>
            <td>${endereco.cep}</td>
            <td>${endereco.address}</td>
            <td>${endereco.number}</td>
            <td>${endereco.complement || ""}</td>
            <td>
                <div class="acoes">
                    <button class="btn_table" onclick="preencher(${endereco.id})">Atualizar</button>
                    <button class="btn_table" onclick="excluir_endereco(${endereco.id})">Remover</button>
                </div>
            </td>
        </tr>`;
        tabelaEnderecos.innerHTML += row;       // Adicionando Linha na Tabela
        });

        // Se Lista tiver endereços
        if (lista_enderecos.length > 0){
            document.getElementById("lista").style.display = 'block';       // Exibir Tabela com Lista de Endereços
        }
        // Se Lista não tiver nenhum endereço
        else{
            alert("Nenhum Endereço Cadastrado!")
        }
    }
    catch(error){
        // Verifica se é o erro referente a não ter mais acesso a API
        if (error.message == "Token is Invalid"){
            alert("Sistema Fora do Ar!")
        }
        else{
            // Exibe para Usuário erro lançado
            alert(error.message);
        }
    }
}

// Função para Preencher Formulário de Endereço
// Se função for chamada via Botão de Atualizar na Lista de Endereços
async function preencher(id) {
    let nome = document.getElementById("nome");
    let cep = document.getElementById("cep");
    let morada = document.getElementById("endereco");
    let numero = document.getElementById("numero");
    let complemento = document.getElementById("complemento");
    
    // Percorre Lista até achar ID do Endereço que vai ser Atualizado
    // E altera valores no Formulário
    for (let index = 0; index < lista_enderecos.length; index++){
        if (lista_enderecos[index].id == id){
            nome.value = lista_enderecos[index].title;
            cep.value = lista_enderecos[index].cep;
            morada.value = lista_enderecos[index].address;
            numero.value = lista_enderecos[index].number;
            complemento.value = lista_enderecos[index].complement;
        }
    }
    let id_endereco = document.getElementsByClassName("endereco")[0];       // Seleciona elemento HTML <h1> para usar ID dele como referecia ao Endereço
    id_endereco.id = id                                                     // Define o ID desse elemento como o ID do Endereço que vai ser Atualizado ou Apagado
    exibir_form();              // Função para Exibir Formulário
}

// Função que vai enviar requisição HTTP para a API para Cadastrar Endereço
async function enviar_endereco(dados) {
    try{
        // Requisição HTTP para API
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

        let resposta = await request.json();        // Converte Resposta da API para Objeto
        alert("Endereço Cadastrado com Sucesso!");
        cancela()       // Chama Função para Limpar e Esconder Formulário de Endereço

        // Se resposta da API não for OK
        if (!request.ok){
            // Imprime resposta no console para fins de debug
            console.log(resposta);
            throw new Error("Erro!\nStatus "+response.status);
        }
    }
    catch (error){
        // Verifica se é o erro referente a não ter mais acesso a API
        if (error.message == "Failed to fetch"){
            alert("Sistema Fora do Ar!")
        }
        else{
            // Exibe para Usuário erro lançado
            alert(error.message);
        }
    }
}

// Função que vai enviar requisição HTTP para a API para Atualizar Endereço
async function atualizar_endereco(dados) {
    let id = document.getElementsByClassName("endereco")[0].id;     // Pegando ID do Endereço Selecionado
    try{
        // Requisição HTTP para API
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

        let resposta = await request.json();                        // Converte Resposta da API para Objeto
        document.getElementById("form").style.display = 'none';     // Esconder Formulário
        alert("Endereço Atualizado com Sucesso!");

        // Se resposta da API não for OK
        if (!request.ok){
            // Imprime resposta no console para fins de debug
            console.log(resposta);
            throw new Error("Erro!\nStatus "+response.status);
        }
    }
    catch (error){
        // Verifica se é o erro referente a não ter mais acesso a API
        if (error.message == "Failed to fetch"){
            alert("Sistema Fora do Ar!")
        }
        else{
            // Exibe para Usuário erro lançado
            alert(error.message);
        }
    }
}

// Função que vai enviar requisição HTTP para a API para Excluir Endereço
async function excluir_endereco(id) {
    try{
        // Requisição HTTP para API
        let request = await fetch(
            "https://go-wash-api.onrender.com/api/auth/address/"+id,{
            method:"DELETE",          
            headers:{
                "Authorization": `Bearer ${token}`
                }                    
            }
        );

        let resposta = await request.json();        // Converte Resposta da API para Objeto

        // Se resposta da API não for OK
        if (!request.ok){
            // Imprime resposta no console para fins de debug
            console.log(resposta);
            throw new Error("Erro!\nStatus "+response.status);
        }
        alert("Endereço Excluído com Sucesso!");
        listar()                    // Chama Função para Listar Endereços, atualizando a Lista
    }
    catch(error){
        // Verifica se é o erro referente a não ter mais acesso a API
        if (error.message == "Failed to fetch"){
            alert("Sistema Fora do Ar!")
        }
        else{
            // Exibe para Usuário erro lançado
            alert(error.message);
        }
    }
}