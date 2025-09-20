// Verificar e Validar dados do Formulário antes de enviar para a API
function validar_dados(){
    let name = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let cpf_cnpj = document.getElementById("cpf_cnpj").value;
    let birthday = document.getElementById("birthday").value;
    let password = document.getElementById("password").value;
    let terms = document.getElementById("terms");

    // Verifica se todos os campos foram preenchidos
    if (!name || !email || !cpf_cnpj || !birthday || !password){
        alert("Preencha Todos os Campos");
    }
    else if (password.length < 6){
        alert("Senha deve Conter no Minimo 6 Digitos!");
    }
    // Se Checkbox foi marcado
    else if (!terms.checked){
        alert("Aceite os Termos de Condição");
    }
    else{
        // Se estiver tudo certo chama função que vai fazer requisição HTTP para a API
        enviar_cadastro(name, email, cpf_cnpj, birthday, password);
    }
}

// Função que vai enviar requisição HTTP para a API para Realizar Cadastro
async function enviar_cadastro(name, email, cpf_cnpj, birthday, password){    
    let userType = 1;
    let terms = 1;
    // Corpo da Requisição
    let dados = {
        "name": name,
        "email": email,
        "user_type_id": userType,
        "password": password,
        "cpf_cnpj": cpf_cnpj,
        "terms": terms,
        "birthday": birthday
    }

    try{
        // Requisição HTTP para API
        let request = await fetch(                              
            "https://go-wash-api.onrender.com/api/user",{
                method:"POST",
                body:JSON.stringify(dados), // Converte para JSON                
                headers:{
                    'Content-Type':'application/json'
                }                    
            }
        );

        let resposta = await request.json(); // Converte Resposta da API para Objeto
        
        // Se resposta da API não for OK
        if (!request.ok){
            // Imprime resposta no console para fins de debug
            console.log(resposta);
            if (resposta.data.errors.cpf_cnpj){
                throw new Error("CPF ou CNPJ Já Cadastrado");
            }
            else if (resposta.data.errors.email){
                throw new Error("Email Já Cadastrado!");
            }
        }
        // Se resposta da API for OK
        // Exibe para Usuário mensagem confirmando cadastro
        alert("Enviamos um link de ativação de conta no email:\n"+email+" -> clique e ative sua conta");
        window.location.href = "../Login/index.html";   // Vai para Página de Login
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