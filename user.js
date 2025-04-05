function validar_dados(){
    let name = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let cpf_cnpj = document.getElementById("cpf_cnpj").value;
    let birthday = document.getElementById("birthday").value;
    let password = document.getElementById("password").value;
    let terms = document.getElementById("terms");

    if (!name || !email || !cpf_cnpj || !birthday || !password){
        alert("Preencha Todos os Campos");
    }
    else if (password.length < 6){
        alert("Senha deve Conter no Minimo 6 Digitos!");
    }
    else if (!terms.checked){
        alert("Aceite os Termos de Condição");
    }
    else{
        enviar_cadastro(name, email, cpf_cnpj, birthday, password);
    }
}

async function enviar_cadastro(name, email, cpf_cnpj, birthday, password){    
    let userType = 1;
    let terms = 1;
    let dados = {
        "name": name,
        "email": email,
        "user_type_id": userType,
        "password": password,
        "cpf_cnpj": cpf_cnpj,
        "terms": terms,
        "birthday": birthday
    }

    let api = await fetch(                              
        "https://go-wash-api.onrender.com/api/user",{
            method:"POST",
            body:JSON.stringify(dados),                
            headers:{
                'Content-Type':'application/json'
            }                    
        }
    );
    
    let resposta = await api.json();                    
    console.log(resposta);                              

    if (api.ok){
        alert("Enviamos um link de ativação de conta no email:\n"+email+" -> clique e ative sua conta");
        document.getElementById("form").reset();;
    }
    else if (resposta.data && resposta.data.errors){                                               
        if (resposta.data.errors.cpf_cnpj){
            alert("CPF ou CNPJ Já Cadastrado");
        }
        if (resposta.data.errors.email){                
            alert("Email Já Cadastrado!");
        }
    }
    else{
        alert("Sistema Fora do Ar");
    }
}