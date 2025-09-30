# 🚀 Desplegar Sistema Solar AR en GitHub Pages

## Opción 1: GitHub Pages (RECOMENDADO)

### Pasos:

1. **Crear repositorio en GitHub:**
   - Ve a [github.com](https://github.com)
   - Clic en "New repository"
   - Nombre: `sistema-solar-ar` o `solar-system-ar`
   - Marca "Public"
   - NO marques "Add README" (ya tienes uno)

2. **Subir archivos:**
   ```bash
   # En tu carpeta del proyecto
   git init
   git add .
   git commit -m "Sistema Solar AR - Challenge 4"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/sistema-solar-ar.git
   git push -u origin main
   ```

3. **Activar GitHub Pages:**
   - Ve a tu repositorio en GitHub
   - Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: "main"
   - Folder: "/ (root)"
   - Save

4. **Tu sitio estará en:**
   `https://TU-USUARIO.github.io/sistema-solar-ar/`

## Ventajas:
- ✅ Completamente GRATIS
- ✅ HTTPS automático
- ✅ Actualización automática
- ✅ Fácil de compartir
- ✅ Profesional

## Después de subir:
- El archivo `demo.html` será tu página principal
- `index.html` será la aplicación principal
- Comparte el enlace con cualquiera
