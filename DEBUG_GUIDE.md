# 🐛 Guía de Debug para el Formulario de WhatsApp

## 🔍 Cómo verificar si funciona:

### 1. **Abrir la Consola del Navegador**
- **Chrome/Edge:** Presiona `F12` o `Ctrl+Shift+I`
- **Firefox:** Presiona `F12` 
- Ve a la pestaña **"Console"**

### 2. **Recargar la página**
- Presiona `F5` o `Ctrl+R`
- En la consola deberías ver:
```
🚀 Inicializando formulario de contacto...
✅ Formulario encontrado: <form class="contact-form" id="contact-form">
✅ Event listener agregado al formulario
🔍 Configurando validación...
📝 Campos encontrados: 4
Campo 1: name
Campo 2: email
Campo 3: subject
Campo 4: message
✅ Validación inicializada
```

### 3. **Llenar el formulario**
- Completa todos los campos:
  - Nombre: Tu nombre
  - Email: tu@email.com
  - Asunto: Prueba
  - Mensaje: Mensaje de prueba

### 4. **Hacer clic en "Enviar por WhatsApp"**
- En la consola deberías ver:
```
📋 Formulario enviado
📝 Datos del formulario:
- Nombre: Tu nombre
- Email: tu@email.com
- Asunto: Prueba
- Mensaje: Mensaje de prueba
🔄 Botón deshabilitado
💬 Mensaje creado: [mensaje codificado]
📱 Número de WhatsApp: 5492996120756
🔗 URL generada: https://wa.me/5492996120756?text=...
📱 Abriendo WhatsApp...
✅ WhatsApp abierto correctamente
✅ Formulario reseteado
🔄 Botón restaurado
```

## ❌ Posibles Problemas y Soluciones:

### **Problema 1: No aparecen los logs de inicialización**
**Causa:** El JavaScript no se está cargando
**Solución:**
- Verifica que el archivo `script/main.js` existe
- Verifica que el HTML incluye: `<script src="script/main.js"></script>`

### **Problema 2: Error "No se encontró el formulario"**
**Causa:** El ID del formulario no coincide
**Solución:**
- Verifica que el formulario tenga: `id="contact-form"`

### **Problema 3: WhatsApp no se abre**
**Causa:** Bloqueador de popups
**Solución:**
- Permite popups en tu navegador
- Prueba en modo incógnito
- Verifica si aparece "⚠️ Posible bloqueo de popup" en la consola

### **Problema 4: Campos vacíos**
**Causa:** Los campos no tienen valores
**Solución:**
- Asegúrate de llenar todos los campos
- Verifica que los `name` de los inputs coincidan

### **Problema 5: JavaScript no funciona**
**Causa:** Errores de sintaxis
**Solución:**
- Busca errores rojos en la consola
- Verifica que no haya caracteres especiales en el código

## 🧪 Prueba Manual Paso a Paso:

1. **Abre tu portfolio en el navegador**
2. **Abre las herramientas de desarrollador (F12)**
3. **Ve a la pestaña Console**
4. **Recarga la página (F5)**
5. **Verifica los mensajes de inicialización**
6. **Ve a la sección de contacto**
7. **Llena el formulario completo**
8. **Haz clic en "Enviar por WhatsApp"**
9. **Verifica los logs en la consola**
10. **Confirma que se abre WhatsApp**

## 📱 Qué debería pasar:

1. ✅ Se deshabilita el botón
2. ✅ Cambia el texto a "Preparando WhatsApp..."
3. ✅ Se abre una nueva pestaña/ventana con WhatsApp Web
4. ✅ El mensaje aparece pre-escrito
5. ✅ Se muestra notificación de éxito
6. ✅ Se limpia el formulario
7. ✅ Se restaura el botón

## 🆘 Si sigue sin funcionar:

1. **Copia todos los logs de la consola**
2. **Toma captura de pantalla de cualquier error**
3. **Verifica que estés usando un navegador moderno**
4. **Prueba en modo incógnito**
5. **Prueba en otro navegador**

## 🔧 Comandos rápidos para debuggear:

### **1. Verificar si el formulario existe:**
```javascript
const form = document.getElementById('contact-form');
console.log('Formulario encontrado:', !!form);
if (form) {
    console.log('Campos:', form.querySelectorAll('input, textarea').length);
}
```

### **2. Verificar estado de los campos:**
```javascript
checkFormStatus()
```

### **3. Probar el formulario automáticamente:**
```javascript
testContactForm()
```

### **4. Verificar valores en tiempo real:**
```javascript
const form = document.getElementById('contact-form');
console.log('Nombre:', `"${form.name.value}"`);
console.log('Email:', `"${form.email.value}"`);
console.log('Asunto:', `"${form.subject.value}"`);
console.log('Mensaje:', `"${form.message.value}"`);
```

¡Esto te ayudará a identificar exactamente dónde está el problema!