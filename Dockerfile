# Imagen de Node.js
FROM node:16-alpine

# Directorio de trabajo
WORKDIR /app

# Copiar el archivo package.json y package-lock.json a la imagen
COPY package*.json ./
 
# Instalar las dependencias
RUN npm install

COPY nest-cli.json ./
COPY tsconfig.build.json ./
COPY tsconfig.json ./
COPY src ./

# Complilar la aplicación
RUN npm run build

#Define las variables de entorno
ENV DB_HOST ''
ENV DB_PORT ''
ENV DB_USERNAME ''
ENV DB_PASSWORD ''
ENV DB_DATABASE ''

# Puerto expuesto
EXPOSE 3000 

#Iniciar la aplicacion
CMD ["npm", "run", "start:prod"]
