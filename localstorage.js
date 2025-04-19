let logado = localStorage.getItem('access_token');
let login_btn = document.querySelector("#login-btn a");
let pageId = document.body.id;

if (logado){
    login_btn.innerText = "Conta";
    login_btn.href = "../Landing_Page/index.html";

    if (pageId == "login" || pageId == "cadastro" ){
        window.location.href = "../Sobre_Nos/index.html"; // gerenciador de endereco
    }
}