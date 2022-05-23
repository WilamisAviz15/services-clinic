# ServicesClinic

# BACKEND 

Para executar o backend é necessário ter o node instalado.
O backend da aplicação foi feito utilizando Nodejs e express.

## Executando o servidor
Instale as dependencias:
`npm i`
Execute o servidor do backend:
`npm run dev`


# FRONTEND 
Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) v 13.2.6.

## Executando o servidor de desenvolvimento
Instale as dependencias:
`npm i`
Execute o servidor do frontend:
`ng serve`
Navegue até `http://localhost:4200/`. 
O aplicativo será recarregado automaticamente se você alterar qualquer um dos arquivos de origem.


# Banco de Dados
Foi utilizado o postgresql através do ElephantSQL. Esse modelo é uma Cloud PostgreSQL, sendo um metodo gerenciado de banco de dados na Cloud. Toda a configuração já está feita, basta apenas utilizar o sistema.
É possível fazer requisições através do Postman ou insomnia, utilizando a URL `http://localhost:3000/` informando a rota que deseja.
Requisições disponíveis da API:
 ## Usuário
 
| Método | URL                               | Descrição                 |
|--------|-----------------------------------|---------------------------|
| GET    | http://localhost:3000/users/      | Obter todos os usuário    |
| POST   | http://localhost:3000/users/      | Adicionar novo usuário    |
| PUT    | http://localhost:3000/users/:uuid | Atualizar usuário pelo ID |
| DELETE | http://localhost:3000/users/:uuid | Deletar usuário pelo ID   |


## Login

| Método | URL                               | Descrição                 |
|--------|-----------------------------------|---------------------------|
| POST   | http://localhost:3000/            | Validar login             |

## Serviços Médicos

| Método | URL                                         | Descrição                        |
|--------|---------------------------------------------|----------------------------------|
| GET    | http://localhost:3000/medicalServices/      | Obter todos os serviços médicos  |
| POST   | http://localhost:3000/medicalServices/      | Adicionar novo serviço médico    |
| PUT    | http://localhost:3000/medicalServices/:uuid | Atualizar serviço médico pelo ID |
| DELETE | http://localhost:3000/medicalServices/:uuid | Deletar serviço médico pelo ID   |
| POST   | medicalServices/medicalServicesByDate       | Buscar pela data                 |

## Atendimento Médico

| Método | URL                                                 | Descrição                             |
|--------|-----------------------------------------------------|---------------------------------------|
| GET    | http://localhost:3000/medicalAppointment/           | Obter todos os atendimentos médicos   |
| GET    | http://localhost:3000/medicalAppointment/:uuid      | todos os atendimentos médicos por id  |
| GET    | http://localhost:3000/medicalAppointment/byCPF/:cpf | todos os atendimentos médicos por cpf |
| POST   | http://localhost:3000/medicalAppointment/           | Adicionar novo atendimento médico     |
| PUT    | http://localhost:3000/medicalAppointment/:uuid      | Atualizar atendimento médico pelo ID  |
| DELETE | http://localhost:3000/medicalAppointment/:uuid      | Deletar atendimento médico pelo ID    |

## Médicos

| Método | URL                                                | Descrição                         |
|--------|----------------------------------------------------|-----------------------------------|
| GET    | http://localhost:3000/doctors/                     | Obter todos os médicos            |
| GET    | http://localhost:3000/doctors/:uuid                | Obter médico por id               |
| POST   | http://localhost:3000/doctors/                     | Adicionar novo médico             |
| PUT    | http://localhost:3000/doctors/:uuid                | Atualizar médico pelo ID          |
| PUT    | http://localhost:3000/doctors/valueToReceive/:uuid | Atualizar valor a receber pelo ID |
| DELETE | http://localhost:3000/doctors/:uuid                | Deletar médico pelo ID            |

Também é possível rodar o banco localmente. Basta pegar o arquivo `backend/database/sql/init.sql`. Ele contêm todas as querys com criação das tabelas e inserções.
