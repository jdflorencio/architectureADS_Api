#!/bin/bash

# Define as variáveis de ambiente
DB_HOST=db
DB_PORT=5432

# Aguarda até que o banco de dados esteja disponível
while ! nc -z $DB_HOST $DB_PORT; do
  sleep 0.1
done

# Executa os comandos após o banco de dados estar disponível

#npx sequelize-cli db:migrate
#npx sequelize-cli db:seed:all
