# 💬 Chat UTN

Aplicación web de mensajería tipo chat, desarrollada como **Trabajo Práctico Final**.
Simula conversaciones entre un usuario y sus contactos, permitiendo:

- Ver una lista de contactos.
- Abrir un chat individual.
- Enviar y recibir mensajes simulados.
- Ver estados conectado / ultima conexión.
- Gestionar contactos (crear, editar, ver información).
- Respuestas automáticas.

---

## Autor

- **Nombre:** Daniel Matías Fernández (DanoDev)   
- **Trabajo Práctico:** Chat UTN – Frontend con React
---

## 🛠 Tecnologías utilizadas

- **React** con componentes funcionales
- **React Router** (navegación entre chats mediante `chat_id`)
- **Custom Hooks** (`useChatManager`) para manejar la lógica del chat
- **JavaScript ES6+**
- **CSS** modularizado por componente (`.css` en cada carpeta)
- Mock de datos en archivos JavaScript (sin backend real)

> Los datos de contactos y mensajes se manejan **en memoria**, usando servicios y archivos de datos locales. No hay base de datos ni API externa.

---

## ✅ Requisitos previos

Antes de instalar el proyecto asegurate de tener:

- **Node.js** ≥ 18  
- **npm** (incluido con Node) o algún otro gestor de paquetes (yarn, pnpm)

Verificación rápida:

```bash
node -v
npm -v
```

Instalación

Clonar el repositorio  -> git clone https://github.com/DanielFernandez14/Tp-Final-PFSD-React
cd chat-utn

Instalar dependencias -> npm install

Ejecución del proyecto -> npm run dev - Abrir en http://localhost:5173




💻 **Uso de la aplicación (flujo básico)**

1) Iniciar el entorno de desarrollo (npm run dev o npm start según el caso).

2) Abrir el navegador en la URL correspondiente (ej.: http://localhost:5173).

3) En la columna izquierda: 
Ver la lista de contactos.
Usar la barra de búsqueda para filtrar.
Hacer clic en un contacto para abrir el chat.

4) En el panel derecho:
Ver el historial de mensajes con ese contacto.
Escribir un mensaje en el formulario de envío y presionar “Enviar”.

5) Desde el encabezado o panel de info:
Ver detalles del contacto.
Editar datos básicos.
Eliminar el contacto si es necesario.

6) Desde Agregar Contacto: