# Uma Simples Api para controle de vendas 

A API foi criada com o propósito de servir como o componente de back-end de um sistema de gestão de vendas.

<div style="display: inline_block"><br />
    <img align="center" alt="css" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
    <img align="center" alt="css" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white">
    <img align="center" alt="css" src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge">
    <img align="center" alt="css" src="https://img.shields.io/badge/sequelize-323330?style=for-the-badge&logo=sequelize&logoColor=blue">
    <img align="center" alt="css" src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white">
</div>

## Tecnologias envolvidas nesse projeto:

As tecnologias utilizadas neste projeto incluem Node.js, Sequelize, Docker, Postgres e JWT.

## Requesitos para executar esse projeto:

Apenas a instalação do Docker e do Docker Compose na sua máquina é necessária para executar este projeto.

## Comandos para iniciar:

'
    docker-compose up -d 
'

Após executar o docker-compose, verifique que existem dois contêineres em execução: um para a aplicação, que é exposto na porta 3333 e pode ser acessado em http://localhost:3333, e outro para o banco de dados, que tem o nome do contêiner "app-db".


No diretório, há um arquivo chamado "wait-for-it.sh", que verifica se a conexão com o banco de dados está pronta e, em seguida, executa as migrações e os seeders necessários para que esta API funcione corretamente.









