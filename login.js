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
    let api = await fetch(                              
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
    let resposta = await api.json();                    
    console.log(resposta);
}