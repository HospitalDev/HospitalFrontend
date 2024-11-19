# Usar la imagen base oficial de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código de la aplicación al contenedor
COPY . .

# Establecer la variable de entorno para producción
ENV NODE_ENV=production

# Construir la aplicación Next.js
RUN npm run build

# Exponer el puerto en el que corre Next.js
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
