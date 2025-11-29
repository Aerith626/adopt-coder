# Imagen base
FROM node:18-alpine

# Carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json 
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código del proyecto
COPY . .

# Variables de entorno por defecto (puedes cambiarlas)
ENV PORT=8080

# Exponer el puerto
EXPOSE 8080

# Comando para iniciar la app
CMD ["npm", "start"]
