# Imagem base do Node.js
FROM node:12-buster-slim

RUN apt-get update && apt-get install -y sudo netcat && apt-get clean && rm -rf /var/lib/apt/lists/* 

USER node

RUN mkdir /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./

# Copia o restante dos arquivos para o diretório do app
COPY . .

#RUN chmod +x /home/node/app/wait-for-it.sh

# Expõe a porta 3333
EXPOSE 3333

