const URL = 'http://localhost:3400/clientes';
let modoEdicao = false;

let listaMembro =[];

let btnAdicionar = document.getElementById('btn-adicionar');
let tabelaMembro = document.querySelector('table>tbody');
let modalMembro = new bootstrap.Modal(document.getElementById("modal-membro"), {});
let tituloModal = document.querySelector('h4.modal-title');

let btnSalvar = document.getElementById('btn-salvar');
let btnCancelar = document.getElementById('btn-cancelar');

let formModal = {
    id: document.getElementById('id'),
    nome: document.getElementById('name'),
    // sexo: document.getElementById('sexo'),
    telefone: document.getElementById('telefone'),
    cpf: document.getElementById('cpf'),
    email: document.getElementById('email'),
    // dataNasc: document.getElementById('dataNasc'),
    // dataCadastro: document.getElementById('dataCadastro'),

}

btnAdicionar.addEventListener('click', () => {
    modoEdicao = false;
    tituloModal.textContent = 'Novo membro'
    limparModalMembro()
    modalMembro.show();
});

btnSalvar.addEventListener('click', () => {

    // 1º capturar membro do modal
    let membro = obterMembroDoModal();
    // 2º se os campos obrigatórios foram preenchidos
    if(!membro.cpfOuCnpj || !membro.email){
        alert('E-mail e CPF são obrigatórios.')
        return;
    }
    modalMembro.textContent = "";

    // 3º novo cadastro de informações
    // alert('Deu certo, vou cadastrar no backend !!')
    adicionarMembroBackend(membro);


    // modalMembro.hide();
});

btnCancelar.addEventListener('click', () => {
    modalMembro.hide();
});

function obterMembroDoModal(){

    return new Membro({
        id: formModal.id.value,
        nome: formModal.nome.value,
        // sexo: formModal.sexo.value,
        telefone: formModal.telefone.value,
        cpfOuCnpj: formModal.cpf.value,
        email: formModal.email.value,
        // dataNasc: formModal.dataNasc.value,
        // dataCadastro: formModal.dataCadastro.value,
        

    })
}


function obterMembro(){

    fetch(URL, {
        method: 'GET'
    })

    .then(response => response.json())
    .then(response => {
        listaMembro = response;
        popularTabela(response);
    })
    .catch()

}

function editarMembro(id){
    modoEdicao = true;
    tituloModal.textContent = 'Editar membro'

    let membro = listaMembro.find(membro => membro.id == id);
    atualizarModalMembro(membro);
    modalMembro.show();

    // alert('Aqui vou editar o membro ' + id);
}

function atualizarModalMembro(membro){

    formModal.id.value = membro.id;
    formModal.nome.value = membro.nome;
    formModal.cpf.value = membro.cpfOuCnpj;
    formModal.email.value = membro.email;
    formModal.telefone.value = membro.telefone;
    // formModal.dataNasc.value = membro.dataNasc
    // formModal.dataCadastro.value = membro.dataCadastro.substring(0,10);
}

function limparModalMembro(){

    formModal.id.value = "";
    formModal.nome.value = "";
    formModal.cpf.value = "";
    formModal.email.value = "";
    formModal.telefone.value = "";
    // formModal.dataNasc.value = "";
    // formModal.dataCadastro.value = "";
}

function excluirMembro(id){
    alert('Aqui vou excluir o membro ' + id);
}

function criarLinhaNaTabela(membro){

     // 1 criar linha
     let tr = document.createElement('tr');
     // 2 criar TDs
     let tdId = document.createElement('td');
     let tdNome = document.createElement('td');
    //  let tdSexo = document.createElement('td');
     let tdTel = document.createElement('td');
     let tdCpf = document.createElement('td');
     let tdEmail = document.createElement('td');
     let tdNasc = document.createElement('td');
     let tdAcoes = document.createElement('td');
     // 3 atualizar as informações das aTDs
     tdId.textContent = membro.id;
     tdNome.textContent = membro.nome;
    //  tdSexo.textContent = membro.sexo;
     tdTel.textContent = membro.telefone;
     tdCpf.textContent = membro.cpfOuCnpj;
     tdEmail.textContent = membro.email;
     tdNasc.textContent = membro.datanasc;

     tdAcoes.innerHTML =  `<button onclick="editarMembro(${membro.id})" class="btn btn-primary btn-sm mr-3">
                                Editar
                            </button>
                            <button onclick="excluirMembro(${membro.id})" class="btn btn-outline-primary btn-sm mr-3">
                                Excluir
                            </button>`;

     // 4 adicionar as Tds dentro das linhas
     tr.appendChild(tdId);
     tr.appendChild(tdNome);
    //  tr.appendChild(tdSexo);
     tr.appendChild(tdTel);
     tr.appendChild(tdCpf);
     tr.appendChild(tdEmail);
     tr.appendChild(tdNasc);
     tr.appendChild(tdAcoes);

     // 5 adicionar a linha na tabela
     tabelaMembro.appendChild(tr);



}

function popularTabela(response){

    tabelaMembro.textContent = "";
    
    response.forEach(membro => { 
        criarLinhaNaTabela(membro);
       

        
    });
}

function adicionarMembroBackend(membro){

    // membro.dataCadastro = new Date().toISOString();

    fetch( URL, {
        method: 'POST',
        headers:{
            'Content-Type': 'Application/json',
            'Authorization': 'token'
        },
        body: JSON.stringify(membro)
    })
    .then(response => response.json())
    .then(response => {
        let novoMembro = new Membro(response);
        listaMembro.push(novoMembro);

        popularTabela(listaMembro);

        modalMembro.textContent = "";
        modalMembro.hide();
        
    })
    .catch(error => {
        console.log(error)
    })

}

obterMembro();