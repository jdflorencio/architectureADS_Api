# Imagem base do Node.js
FROM node:12-buster-slim


# Cria o diretório do app
WORKDIR /app

# Copia os arquivos package.json e package-lock.json para o diretório do app
COPY package*.json ./

# Instala dependências do app e ferramentas necessárias
RUN apt-get update && apt-get install -y sudo netcat && apt-get clean && rm -rf /var/lib/apt/lists/* && \
    npm install && npm install -g nodemon && npm install --save-dev sequelize-cli && npm install -g jest && \
    npx jest --init

# Copia o restante dos arquivos para o diretório do app
COPY . .

# Expõe a porta 3333
EXPOSE 3333

# Inicia o app com o Nodemon
CMD ["npm", "run","start"]
