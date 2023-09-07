const URL = 'http://localhost:3400/clientes';
let modoEdicao = false;

let btnAdicionar = document.getElementById('btn-adicionar');
let tabelaMembro = document.querySelector('table>tbody');
let modalMembro = new bootstrap.Modal(document.getElementById("modal-membro"), {});
let tituloModal = document.querySelector('h4.modal-title');

let btnSalvar = document.getElementById('btn-salvar');
let btnCancelar = document.getElementById('btn-cancelar');

btnAdicionar.addEventListener('click', () => {
    modoEdicao = false;
    tituloModal.textContent = 'Novo membro'
    modalMembro.show();
});

btnSalvar.addEventListener('click', () => {
    modalMembro.hide();
});

btnCancelar.addEventListener('click', () => {
    modalMembro.hide();
});


function obterMembro(){

    fetch(URL, {
        method: 'GET'
    })

    .then(response => response.json())
    .then(response => {
        popularTabela(response);
    })
    .catch()

}

function editarMembro(id){
    modoEdicao = true;
    tituloModal.textContent = 'Editar membro'
    modalMembro.show();

    // alert('Aqui vou editar o membro ' + id);
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
     let tdSexo = document.createElement('td');
     let tdTel = document.createElement('td');
     let tdCpf = document.createElement('td');
     let tdEmail = document.createElement('td');
     let tdNasc = document.createElement('td');
     let tdAcoes = document.createElement('td');
     // 3 atualizar as informações das aTDs
     tdId.textContent = membro.id;
     tdNome.textContent = membro.nome;
     tdSexo.textContent = membro.sexo;
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
     tr.appendChild(tdSexo);
     tr.appendChild(tdTel);
     tr.appendChild(tdCpf);
     tr.appendChild(tdEmail);
     tr.appendChild(tdNasc);
     tr.appendChild(tdAcoes);

     // 5 adicionar a linha na tabela
     tabelaMembro.appendChild(tr);



}

function popularTabela(membros){
    
    membros.forEach(membro => { 
        criarLinhaNaTabela(membro);
       

        
    });
}

obterMembro();