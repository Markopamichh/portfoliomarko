# Configuración de EmailJS para el Portfolio

## ¿Qué es EmailJS?
EmailJS es un servicio que permite enviar emails directamente desde el frontend sin necesidad de un servidor backend.

## Pasos para configurar EmailJS:

### 1. Crear cuenta en EmailJS
1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Regístrate con tu email
3. Confirma tu email

### 2. Configurar el servicio de email
1. En el dashboard, ve a "Email Services"
2. Haz clic en "Add New Service"
3. Selecciona tu proveedor de email (Gmail recomendado)
4. Conecta tu cuenta de Gmail (markopamich10@gmail.com)
5. Copia el **Service ID** que se genera

### 3. Crear un template de email
1. Ve a "Email Templates"
2. Haz clic en "Create New Template"
3. Configura el template con este contenido:

**Subject:** `Nueva consulta de {{subject}} - Portfolio`

**Content:**
```
Hola Marko,

Has recibido una nueva consulta desde tu portfolio:

Nombre: {{from_name}}
Email: {{from_email}}
Asunto: {{subject}}

Mensaje:
{{message}}

---
Este mensaje fue enviado desde tu portfolio web.
```

4. Copia el **Template ID**

### 4. Obtener la clave pública
1. Ve a "Account" > "General"
2. Encuentra y copia tu **Public Key**

### 5. Actualizar el código JavaScript
En el archivo `script/main.js`, busca estas líneas y reemplaza con tus valores:

```javascript
function initializeEmailJS() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Reemplazar con tu Public Key
}

// En la función handleFormSubmit:
const response = await emailjs.send(
    'YOUR_SERVICE_ID',    // Reemplazar con tu Service ID
    'YOUR_TEMPLATE_ID',   // Reemplazar con tu Template ID
    formData
);
```

### 6. Configuración recomendada para Gmail
Si usas Gmail:
1. Asegúrate de tener la verificación en 2 pasos activada
2. Crea una "Contraseña de aplicación" específica para EmailJS
3. Usa esta contraseña al conectar Gmail con EmailJS

### 7. Testing
1. Una vez configurado todo, prueba el formulario
2. Verifica que los emails lleguen a markopamich10@gmail.com
3. Revisa también la carpeta de spam

## Variables disponibles en el template:
- `{{from_name}}` - Nombre del remitente
- `{{from_email}}` - Email del remitente  
- `{{subject}}` - Asunto del mensaje
- `{{message}}` - Contenido del mensaje
- `{{to_email}}` - Email de destino (markopamich10@gmail.com)

## Límites del plan gratuito:
- 200 emails por mes
- Para más emails, considera el plan de pago

## Seguridad:
- La clave pública puede ser visible en el frontend (es seguro)
- No expongas las claves privadas
- EmailJS validará el dominio desde donde se envían los emails

¡Una vez configurado, tu formulario de contacto enviará emails automáticamente a tu Gmail!