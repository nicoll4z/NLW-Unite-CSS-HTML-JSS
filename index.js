

let participantes = 
[
  {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: new Date(2024, 2, 1, 19, 23),
    dataCheckIn: new Date(2024, 2, 1, 20, 20)
  },
  {
    nome: "Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 19, 23),
    dataCheckIn: new Date(2024, 2, 25, 20, 20)
  },
  {
    nome: "Ana Souza",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 0, 3, 19, 23),
    dataCheckIn: null
  },
  {
    nome: "João Silva",
    email: "joao@gmail.com",
    dataInscricao: new Date(2023, 11, 4, 19, 23),
    dataCheckIn: new Date(2023, 11, 5, 20, 20)
  },
  {
    nome: "Maria Oliveira",
    email: "maria@gmail.com",
    dataInscricao: new Date(2023, 10, 5, 19, 23),
    dataCheckIn: new Date(2023, 10, 6, 20, 20)
  },
  {
    nome: "Pedro Santos",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2023, 9, 6, 19, 23),
    dataCheckIn: new Date(2023, 9, 7, 20, 20)
  },
  {
    nome: "Carla Lima",
    email: "carla@gmail.com",
    dataInscricao: new Date(2023, 8, 7, 19, 23),
    dataCheckIn: new Date(2023, 8, 8, 20, 20)
  },
  {
    nome: "Lucas Sousa",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2023, 7, 8, 19, 23),
    dataCheckIn: new Date(2023, 7, 9, 20, 20)
  },
  {
    nome: "Paula Costa",
    email: "paula@gmail.com",
    dataInscricao: new Date(2023, 6, 9, 19, 23),
    dataCheckIn: new Date(2023, 6, 10, 20, 20)
  },
  {
    nome: "Gabriel Almeida",
    email: "gabriel@gmail.com",
    dataInscricao: new Date(2023, 5, 10, 19, 23),
    dataCheckIn: new Date(2023, 5, 11, 20, 20)
  }
];

const criarPart = (participante) => 
{
  const dataInscricao = dayjs(Date.now())
    .to(participante.dataInscricao)
  let dataCheckIn = dayjs(Date.now())
    .to(participante.dataCheckIn)

  if(participante.dataCheckIn == null)
  {
    dataCheckIn = `
      <button 
        data-email = "${participante.email}"
        onclick = "fazCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
  }

  return `
  <tr>
      <td>
        <strong>
          ${participante.nome}
        </strong>
        <br>
        <small>
          ${participante.email}
          </small>
      </td>
      <td> ${dataInscricao} </td>
      <td> ${dataCheckIn} </td>
    </tr>
    `
}

const atLista = (participantes) => 
{
  let aux = ""
  for(let participante of participantes) {
    aux = aux + criarPart(participante)
  }

  document.querySelector(`tbody`)
    .innerHTML = aux
}

atLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)

  const participante = 
  {
    nome : formData.get('nome'),
    email : formData.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

//validação se o e-mail já foi cadastrado
  if (participantes.find((p) => 
    p.email == participante.email
  )) {
    alert('E-mail já cadastrado!')
    event.target.querySelector('[name="email"]').value = null
    event.target.querySelector('[name="email"]').focus() 
    return
  }

  participantes = [participante, ...participantes]
  atLista(participantes)

  event.target
    .querySelector('[name="nome"]').value = null
  event.target
    .querySelector('[name="email"]').value = null
}

const fazCheckIn = (event) => 
{
  
  if (confirm ('Tem certeza que deseja realizar o check-in') == false){
    return alert('Check-in não realizado')
  }
  
  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })

  participante.dataCheckIn = new Date()

  atLista(participantes)
}