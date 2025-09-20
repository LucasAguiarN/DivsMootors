// Verificar e Validar dados do Formulário antes de enviar para a API
function validar_dados(){
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // Verifica se todos os campos foram preenchidos
    if (!email || !password){
        alert("Preencha Todas as Informações");
    }
    else{
        // Se estiver tudo certo chama função que vai fazer requisição HTTP para a API
        autenticar_login(email, password);
    }
}

// Função que vai enviar requisição HTTP para a API para Realizar Login
async function autenticar_login(email, password) {   
    try{
        // Requisição HTTP para API
        let request = await fetch(                              
            "https://go-wash-api.onrender.com/api/login",{
                method:"POST",
                body:JSON.stringify({
                    "email": email,
                    "password": password,
                    "user_type_id": 1
                }),                         // Converte para JSON              
                headers:{
                    'Content-Type':'application/json'
                }                    
            }
        );

        let resposta = await request.json();    // Converte Resposta da API para Objeto
        
        // Se resposta da API não for OK
        if (!request.ok){
            // Imprime resposta no console para fins de debug
            console.log(resposta);
            if (request.status == '401'){
                if (resposta.data.errors == "Usuário não esta ativo"){
                    throw new Error("Conta de Usuário Não Ativa!");
                }
                else if (resposta.data.errors == "Usuário não autorizado"){
                    throw new Error("Senha Incorreta!");
                }
            }
            else if (request.status == '404'){
                throw new Error("Email Não Cadastrado!");
            }
        }
        localStorage.setItem('nome', resposta.user.name);               // Armazena Nome no LocalStorage
        localStorage.setItem('access_token', resposta.access_token);    // Armazena Token no LocalStorage
        window.location.href = "../Landing_Page/index.html";            // Vai para Página Principal
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