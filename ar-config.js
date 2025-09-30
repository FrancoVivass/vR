// Configuración AR para Sistema Solar
// Optimizaciones específicas para Realidad Aumentada

class ARConfig {
    constructor() {
        this.isARSupported = false;
        this.isMobile = false;
        this.cameraPermission = false;
        this.init();
    }

    init() {
        this.detectDevice();
        this.checkARSupport();
        this.setupAROptimizations();
    }

    detectDevice() {
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        console.log(`Dispositivo detectado: ${this.isMobile ? 'Móvil' : 'Desktop'}`);
    }

    checkARSupport() {
        // Verificar soporte para WebXR
        if ('xr' in navigator) {
            navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
                this.isARSupported = supported;
                console.log(`WebXR AR soportado: ${supported}`);
            });
        }

        // Verificar soporte para AR.js
        if (typeof AFRAME !== 'undefined' && AFRAME.components['arjs']) {
            this.isARSupported = true;
            console.log('AR.js detectado y disponible');
        }
    }

    setupAROptimizations() {
        if (this.isMobile) {
            this.optimizeForMobile();
        }
        
        this.setupCameraPermissions();
        this.setupARMarkers();
    }

    optimizeForMobile() {
        // Reducir calidad para mejor rendimiento en móviles
        const scene = document.getElementById('scene');
        if (scene) {
            scene.setAttribute('renderer', 'antialias: false; pixelRatio: 0.8');
        }

        // Ajustar controles de cámara para touch
        const camera = document.getElementById('camera');
        if (camera) {
            camera.setAttribute('look-controls', 'touchEnabled: true; pointerLockEnabled: false');
            camera.setAttribute('wasd-controls', 'enabled: false');
        }

        // Reducir número de estrellas en móviles
        this.reduceStarsForMobile();
    }

    reduceStarsForMobile() {
        const canvas = document.getElementById('starsCanvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#000011';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Menos estrellas para mejor rendimiento
            for (let i = 0; i < 1000; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const size = Math.random() * 2;
                
                ctx.fillStyle = '#ffffff';
                ctx.globalAlpha = Math.random();
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

    setupCameraPermissions() {
        // Solicitar permisos de cámara para AR
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(() => {
                    this.cameraPermission = true;
                    console.log('Permisos de cámara otorgados');
                })
                .catch((error) => {
                    console.log('Permisos de cámara denegados:', error);
                    this.showCameraPermissionMessage();
                });
        }
    }

    showCameraPermissionMessage() {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 0, 0, 0.9);
            color: white;
            padding: 20px;
            border-radius: 10px;
            z-index: 3000;
            text-align: center;
            max-width: 300px;
        `;
        message.innerHTML = `
            <h3>📷 Cámara Requerida</h3>
            <p>Para usar el modo AR, necesitas permitir el acceso a la cámara.</p>
            <button onclick="this.parentElement.remove()" style="
                background: #ffd700;
                color: black;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                margin-top: 10px;
            ">Entendido</button>
        `;
        document.body.appendChild(message);
    }

    setupARMarkers() {
        // Configurar marcadores AR personalizados
        if (typeof AFRAME !== 'undefined') {
            // Registrar componente personalizado para marcadores
            AFRAME.registerComponent('ar-marker-custom', {
                init: function() {
                    this.el.addEventListener('markerFound', () => {
                        console.log('Marcador AR encontrado');
                        this.showARSolarSystem();
                    });
                    
                    this.el.addEventListener('markerLost', () => {
                        console.log('Marcador AR perdido');
                        this.hideARSolarSystem();
                    });
                },
                
                showARSolarSystem: function() {
                    const arSystem = document.getElementById('arSolarSystem');
                    if (arSystem) {
                        arSystem.style.display = 'block';
                        // Clonar sistema solar para AR
                        this.cloneSolarSystemForAR();
                    }
                },
                
                hideARSolarSystem: function() {
                    const arSystem = document.getElementById('arSolarSystem');
                    if (arSystem) {
                        arSystem.style.display = 'none';
                    }
                },
                
                cloneSolarSystemForAR: function() {
                    const originalSystem = document.getElementById('solarSystem');
                    const arSystem = document.getElementById('arSolarSystem');
                    
                    if (originalSystem && arSystem) {
                        // Limpiar contenido anterior
                        arSystem.innerHTML = '';
                        
                        // Clonar planetas principales
                        const planets = originalSystem.querySelectorAll('a-sphere[id]');
                        planets.forEach(planet => {
                            const clone = planet.cloneNode(true);
                            clone.setAttribute('scale', '0.3 0.3 0.3');
                            clone.removeAttribute('onclick');
                            arSystem.appendChild(clone);
                        });
                    }
                }
            });
        }
    }

    // Método para activar modo AR
    activateAR() {
        if (!this.isARSupported) {
            this.showARNotSupportedMessage();
            return false;
        }

        if (!this.cameraPermission) {
            this.showCameraPermissionMessage();
            return false;
        }

        // Configurar escena para AR
        const scene = document.getElementById('scene');
        if (scene) {
            scene.setAttribute('arjs', 'sourceType: webcam; debugUIEnabled: false;');
            scene.setAttribute('vr-mode-ui', 'enabled: false');
        }

        return true;
    }

    showARNotSupportedMessage() {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 100, 0, 0.9);
            color: white;
            padding: 20px;
            border-radius: 10px;
            z-index: 3000;
            text-align: center;
            max-width: 300px;
        `;
        message.innerHTML = `
            <h3>📱 AR No Soportado</h3>
            <p>Tu dispositivo no soporta Realidad Aumentada o necesitas un navegador más moderno.</p>
            <button onclick="this.parentElement.remove()" style="
                background: #ffd700;
                color: black;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                margin-top: 10px;
            ">Entendido</button>
        `;
        document.body.appendChild(message);
    }

    // Método para obtener información del dispositivo
    getDeviceInfo() {
        return {
            isMobile: this.isMobile,
            isARSupported: this.isARSupported,
            cameraPermission: this.cameraPermission,
            userAgent: navigator.userAgent,
            platform: navigator.platform
        };
    }

    // Método para ajustar calidad basada en rendimiento
    adjustQualityBasedOnPerformance() {
        if (this.isMobile) {
            // Reducir calidad en móviles
            const scene = document.getElementById('scene');
            if (scene) {
                scene.setAttribute('renderer', 'precision: mediump; antialias: false');
            }
        }
    }
}

// Inicializar configuración AR cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.arConfig = new ARConfig();
});

// Exportar para uso global
window.ARConfig = ARConfig;
