function validar_dados(){
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (!email || !password){
        alert("Preencha Todas as Informações");
    }
    else{
        autenticar_login(email, password);
    }
}

async function autenticar_login(email, password) {   
    try{
        let request = await fetch(                              
            "https://go-wash-api.onrender.com/api/login",{
                method:"POST",
                body:JSON.stringify({
                    "email": email,
                    "password": password,
                    "user_type_id": 1
                }),                
                headers:{
                    'Content-Type':'application/json'
                }                    
            }
        );
        let resposta = await request.json();
        console.log(resposta);
        
        if (!request.ok){
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
            else {
                throw new Error("Sistema Fora do Ar!");
            }
        }
        localStorage.setItem('access_token', resposta.access_token);
        window.location.href = "../Landing_Page/index.html";
    }
    catch (error){
        alert(error.message);
    }
}