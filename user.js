function validar_dados() {
    let dados = [];
    let name = document.getElementById("nome").value;
    dados.push(name);
    let email = document.getElementById("email").value;
    dados.push(email);
    let cpf_cnpj = document.getElementById("cpf_cnpj").value;
    dados.push(cpf_cnpj);
    let birthday = document.getElementById("birthday").value;
    dados.push(birthday);
    let password = document.getElementById("password").value;
    dados.push(password);

    if (!terms.checked){
        alert("Aceite os Termos de Condição");
    }
    else if (dados.includes("")){
        alert("Preencha Todos os Campos");
    }
    else if (password.length < 6){
        alert("Senha deve Conter no Minimo 6 Digitos!");
    }
    else {
        enviar_cadastro(name, email, cpf_cnpj, birthday, password);
    }
}

async function enviar_cadastro(name, email, cpf_cnpj, birthday, password){    
    let userType = 1;
    let terms = 1;

    dados = {
        "name": name,
        "email": email,
        "user_type_id": userType,
        "password": password,
        "cpf_cnpj": cpf_cnpj,
        "terms": terms,
        "birthday": birthday
    }

    let api = await fetch(                              //Conectar API
        "https://go-wash-api.onrender.com/api/user",{
            method:"POST",
            body:JSON.stringify(dados),                 //JSON.stringify Função do JS q converte dados q vão ser enviados para JSON
            headers:{
                'Content-Type':'application/json'       //Cabeçalho q informa q conteudo de conexão é JSON
            }                    
        }
    );
    
    let resposta = await api.json();                    //Variavel recebe resposta da API como um objeto em JSON
    console.log(resposta);                              //Exibe no Console para Fins de Depuração

    if (api.ok){
        alert(resposta.data)
        document.getElementById("form").reset();
    }
    else{                                               //Se não tiver sucesso vai ter recebido o erro como um objeto
        if (resposta.data.errors.cpf_cnpj){
            alert("CPF ou CNPJ Já Cadastrado");
        }
        if (resposta.data.errors.email){                
            alert("Email Já Cadastrado!")
        }
    }
}

//https://www.invertexto.com/gerador-email-temporario
//https://www.4devs.com.br/gerador_de_cpf