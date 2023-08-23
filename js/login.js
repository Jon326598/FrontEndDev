let email = document.getElementById('email');
let senha = document.getElementById('senha');
let btnentrar = document.getElementById('btn-entrar');

const emailbanco = 'admin@admin.com'
const senhabanco = '1234'

btnentrar.addEventListener('click', () =>{

    // 1º pegar o email digitado
    // 2º pegar a senha digitada
    // 3º validar email e senha digitados
    // 4º se incorreto retornar mensagem de senha ou usuário incorreto
    // 5º se estiver coreto liberar acersso a página de cadastro

    window.open('cadastro-membro.html', '_self')


})