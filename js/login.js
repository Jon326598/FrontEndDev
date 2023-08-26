let email = document.getElementById('email');
let senha = document.getElementById('senha');
let btnentrar = document.getElementById('btn-entrar');

btnentrar.addEventListener('click', () =>{

    // 1º pegar o email digitado
    let userEmail = email.value;
    // 2º pegar a senha digitada
    let userSenha = senha.value;
    // 3º validar email e senha digitados
        if(!userEmail || !userSenha){
    // 4º se incorreto retornar mensagem de senha ou usuário incorreto
        alert("Os campos de email e senha são obrigatórios");
        return;
    }
    
    // 5º aqui precisamos enviar o email e senha ao backend para saber se o usuário pode acessar o sistema
     autenticar(userEmail, userSenha);
    // 6º se estiver coreto liberar acersso a página de cadastro
});

function autenticar(email, senha){
    const urlBase = `http://localhost:3400`;

    fetch(`${urlBase}/login`,{
        method:'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({email, senha})
    })
    .then(response => response = response.json())
    .then(response => {
        if(!!response.mensagem){
            alert(response.mensagem);
            return;
        }else{

            alert("Usuário autenticado com sucesso");

            salvarToken(response.token);
            salvarUsuario(response.usuario);
            
            window.open('membro.html', '_self')
        }
    // if(response.status == 401){
    //     throw erro(response.statusText)
    // }
});
// responde = response.json()
//     .then(response => {
//         console.log(response)
//     })
//     .catch(erro => {
//         console.log(erro)
//     })
}

function salvarToken(token){
    localStorage.setItem('token',token)
}

function salvarUsuario(usuario){
    localStorage.setItem('usuario', JSON.stringify(usuario));
}