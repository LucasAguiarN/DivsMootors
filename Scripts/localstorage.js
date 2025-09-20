let logado = localStorage.getItem('access_token');              // Para verificar LocalStorage e ver se está Logado
let login_btn = document.querySelector("#login-btn a");         // Botão de Login na NavBar
let pageId = document.body.id;                                  // Para verifca em qual Página está

// Verifica se Usuário está logado
if (logado){
    // Se estiver logado
    login_btn.innerText = "Conta";              // Muda texto do Botão de Login na NavBar
    login_btn.href = "../Conta/index.html";     // Muda link do Botão de Login na NavBar para Página da Conta

    // Não tem acesso a Página de Login e Cadastro se estiver logado
    // Se tentar acesso via link ou via arquivos .html redireciona para Página da Conta
    if (pageId == "login" || pageId == "cadastro" ){
        window.location.href = "../Conta/index.html";   // Vai para Página da Conta
    }
}
// Se não estiver logado
else{
    // Não tem acesso a Página de Conta se não estiver logado
    // Se tentar acesso via link ou via arquivo .html redireciona para Página de Login
    if (pageId == "conta"){
        window.location.href = "../Login/index.html";   // Vai para Página de Login
    }
}

// Função para deslogar Usuário
function deslogar(){
    localStorage.clear();                                   // Limpa dados salvos no LocalStorage
    window.location.href = "../Landing_Page/index.html";    // Vai para Página Principal
}