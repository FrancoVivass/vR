# 🚀 Desplegar Sistema Solar AR en Vercel

## Opción 1: Desde GitHub (RECOMENDADO)

### Paso 1: Crear repositorio en GitHub

1. **Ve a [github.com](https://github.com)**
2. **Clic en "New repository"**
3. **Configuración:**
   - Nombre: `sistema-solar-ar` o `solar-system-ar`
   - Descripción: "Sistema Solar AR - Challenge 4"
   - Marca "Public"
   - NO marques "Add README" (ya tienes uno)

### Paso 2: Subir archivos

```bash
# En tu carpeta del proyecto (C:\Users\alped\OneDrive\Desktop\Repositorios\VR)
git init
git add .
git commit -m "Sistema Solar AR - Challenge 4"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/sistema-solar-ar.git
git push -u origin main
```

### Paso 3: Conectar con Vercel

1. **Ve a [vercel.com](https://vercel.com)**
2. **Regístrate con GitHub**
3. **Clic en "New Project"**
4. **Importa tu repositorio**
5. **Configuración:**
   - Framework Preset: "Other"
   - Root Directory: "./"
   - Build Command: (dejar vacío)
   - Output Directory: (dejar vacío)
6. **Clic en "Deploy"**

### Paso 4: ¡Listo!

Tu sitio estará en: `https://sistema-solar-ar.vercel.app`

---

## Opción 2: Desde Vercel CLI (AVANZADO)

### Paso 1: Instalar Vercel CLI

```bash
npm install -g vercel
```

### Paso 2: Iniciar sesión

```bash
vercel login
```

### Paso 3: Desplegar

```bash
# En tu carpeta del proyecto
vercel
```

### Paso 4: Seguir instrucciones

- ¿Cuál es el nombre de tu proyecto? `sistema-solar-ar`
- ¿En qué directorio está tu código? `./`
- ¿Quieres sobrescribir la configuración? `N`

---

## Opción 3: Arrastrar y Soltar (FÁCIL)

### Paso 1: Preparar archivos

1. **Selecciona todos los archivos** de tu proyecto
2. **Crea un archivo ZIP** con todo
3. **Asegúrate de incluir:**
   - `menu.html` (página principal)
   - `index-mobile-simple.html`
   - `index-simple.html`
   - `index-ar-simple.html`
   - `styles.css`
   - `solar-system.js`
   - `ar-config.js`
   - Todos los demás archivos

### Paso 2: Subir a Vercel

1. **Ve a [vercel.com](https://vercel.com)**
2. **Regístrate o inicia sesión**
3. **Clic en "New Project"**
4. **Arrastra tu archivo ZIP**
5. **¡Listo!**

---

## ⚙️ Configuración Adicional

### Archivo vercel.json (opcional)

```json
{
  "version": 2,
  "builds": [
    {
      "src": "menu.html",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/",
      "dest": "/menu.html"
    }
  ]
}
```

### Variables de Entorno (si necesitas)

No necesarias para este proyecto.

---

## 🔧 Solución de Problemas

### ❌ "Build failed"
- Verifica que todos los archivos estén incluidos
- Asegúrate de que `menu.html` esté en la raíz
- Revisa que no haya errores de sintaxis

### ❌ "404 Not Found"
- Verifica que `menu.html` sea el archivo principal
- Asegúrate de que la ruta sea correcta
- Revisa la configuración de rutas

### ❌ "CORS Error"
- Vercel maneja CORS automáticamente
- No debería haber problemas con este proyecto

---

## 📱 Pruebas Post-Despliegue

### 1. Probar en Desktop
- Abre la URL en Chrome/Firefox
- Verifica que `menu.html` cargue
- Prueba "Desktop Simple"

### 2. Probar en Móvil
- Abre la URL en tu teléfono
- Verifica que `menu.html` cargue
- Prueba "Móvil Simple"

### 3. Probar AR
- Abre "AR Sin Marcador" en móvil
- Verifica que la cámara funcione
- Prueba la interacción

---

## 🌐 URLs Finales

Después del despliegue tendrás:

- **Menú Principal:** `https://tu-proyecto.vercel.app/menu.html`
- **Móvil Simple:** `https://tu-proyecto.vercel.app/index-mobile-simple.html`
- **Desktop Simple:** `https://tu-proyecto.vercel.app/index-simple.html`
- **AR Sin Marcador:** `https://tu-proyecto.vercel.app/index-ar-simple.html`

---

## 🎯 Recomendaciones

### ✅ **Mejor Opción: GitHub + Vercel**
- Control de versiones
- Despliegues automáticos
- Fácil actualización
- Profesional

### ✅ **Opción Rápida: Arrastrar y Soltar**
- Más fácil
- Sin configuración
- Ideal para demos

### ✅ **Opción Avanzada: Vercel CLI**
- Control total
- Automatización
- Para desarrolladores

---

## 🚀 ¡Listo para la Demo!

Una vez desplegado:

1. **Comparte la URL** con tu clase
2. **Muestra el menú** con 6 versiones
3. **Prueba en diferentes dispositivos**
4. **Explica las tecnologías** utilizadas

¡Tu Sistema Solar AR estará disponible para todo el mundo! 🌍✨
