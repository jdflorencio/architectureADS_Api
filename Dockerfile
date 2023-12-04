# Imagem base do Node.js
FROM node:12-slim

# isso permite que o containe fique de pé para brincar com ele
#CMD ["tail", "-f", "/dev/null"]

# Cria o diretório do app
WORKDIR /app

# Copia os arquivos package.json e package-lock.json para o diretório do app
COPY package*.json ./

##RUN apt-get update  && apt-get install -y netcat


# Instala as dependências do app
RUN npm install && npm install -g nodemon && npm install --save-dev sequelize-cli

# Copia o restante dos arquivos para o diretório do app
COPY . .

# Expõe a po rta 3000
EXPOSE 3333

# Inicia o app com o Nodemon
CMD ["npm", "start"]

#docker run -p 3333:3333 -d jdflorencio/dockernode