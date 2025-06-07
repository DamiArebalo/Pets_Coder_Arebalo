# 🎭 Mocking API - Desafío Entregable

> **Nota importante:** Este proyecto fue desarrollado sin modificar ni una línea del código base original. Todo se implementó como extensión del sistema existente.

## 🚀 ¿Qué hace?

Genera datos falsos de usuarios y mascotas para testing, y los puede insertar directamente en la base de datos.

## 📍 Endpoints

### Generar usuarios mock
```
GET /api/mocks/mockingusers?users=50
```
- Password siempre es `"coder123"` (encriptada)
- Role aleatorio entre `"user"` y `"admin"`
- Pets como array vacío

### Generar mascotas mock  
```
GET /api/mocks/mockingpets?pets=50
```
- Datos realistas generados con Faker.js

### Insertar datos en BD
```
POST /api/mocks/generatedata?users=10&pets=15
```
- Crea los registros en la base de datos
- Usa los controladores existentes sin modificarlos

## 🛠️ Archivos creados

- `routes/mocks.router.js` - Router principal
- `services/users.service.js` - Generador de usuarios
- `services/pets.service.js` - Generador de mascotas
- `utils/hash.util.js` - Encriptación de passwords

## ✅ Cómo probar

1. **Generar datos:**
   \`\`\`bash
   curl "localhost:8080/api/mocks/mockingusers?users=100"
   \`\`\`

2. **Insertar en BD:**
   \`\`\`bash
   curl -X POST "localhost:8080/api/mocks/generatedata?users=20&pets=30"
   \`\`\`

3. **Verificar que se guardaron:**
   \`\`\`bash
   curl "localhost:8080/api/users"
   curl "localhost:8080/api/pets"
   \`\`\`

## 🎯 Lo que se cumplió

- ✅ Router `/api/mocks` funcionando
- ✅ Endpoint `/mockingpets` funcionando
- ✅ Endpoint `/mockingusers` funcionando
- ✅ Inserción masiva en BD sin tocar controladores originales
- ✅ Todo verificable con los GET existentes

**El truco:** Para no modificar los controladores, simulo el `req.body` que esperan y uso sus propias funciones para crear los registros.
