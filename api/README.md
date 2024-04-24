# Documentación de API
## Instalación

Para ejecutar esta API en tu máquina local, se necesitará tener instalado Node.js y MongoDB. Después de clonar este repositorio, seguir estos pasos:

1. Instalar las dependencias utilizando npm:
```
npm install
```

2. Crear un archivo .env en la raíz del proyecto (o renombrar el archivo `.env.template`) y configurar las variables de entorno necesarias:
```
MONGO_URI=
JWT_SECRET=
EMAIL_USER=
EMAIL_PASSWORD=
PORT=5000
```

## Uso
Para ejecutar la API, utilizar el siguiente comando:
```
npm start
```
Esto iniciará la API y estará disponible en `http://localhost:5000` por defecto.

## Documentación

La documentación de la API se genera automáticamente mediante Swagger y está disponible en `http://localhost:5000/docs`.