const URL = 'http://localhost:3400/clientes';
let tabelaMembro = document.querySelector('table>tbody');


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

function criarLinhaNaTabela(membro){

     // 1 criar linha
     let tr = document.createElement('tr');
     // 2 criar TDs
     let tdNome = document.createElement('td');
     let tdSexo = document.createElement('td');
     let tdTel = document.createElement('td');
     let tdCpf = document.createElement('td');
     let tdEmail = document.createElement('td');
     let tdNasc = document.createElement('td');
     let tdAcoes = document.createElement('td');
     // 3 atualizar as informações das aTDs
     tdNome.textContent = membro.nome;
     tdSexo.textContent = membro.sexo;
     tdTel.textContent = membro.telefone;
     tdCpf.textContent = membro.cpfOuCnpj;
     tdEmail.textContent = membro.email;
     tdNasc.textContent = membro.datanasc;

     tdAcoes.innerHTML =  '<button class="btn btn-primary btn-sm mr-3">Editar</button><button class="btn btn-outline-primary btn-sm mr-3">Excluir</button>'

     // 4 adicionar as Tds dentro das linhas
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