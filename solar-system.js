// Sistema Solar AR - JavaScript Principal
// Challenge 4 - Realidad Aumentada

class SolarSystemAR {
    constructor() {
        this.planetData = {
            sun: {
                name: "Sol",
                description: "Nuestra estrella, una bola gigante de gas caliente que proporciona luz y calor a todo el sistema solar. Contiene el 99.86% de la masa total del sistema solar.",
                diameter: "1,392,700 km",
                distance: "Centro del sistema",
                period: "25-35 días (rotación)",
                temperature: "5,778 K (superficie)",
                composition: "73% Hidrógeno, 25% Helio"
            },
            mercury: {
                name: "Mercurio",
                description: "El planeta más cercano al Sol. Tiene temperaturas extremas que van desde 427°C durante el día hasta -173°C por la noche. No tiene atmósfera.",
                diameter: "4,879 km",
                distance: "57.9 millones km",
                period: "88 días terrestres",
                temperature: "427°C a -173°C",
                moons: "0"
            },
            venus: {
                name: "Venus",
                description: "El planeta más caliente del sistema solar debido a su densa atmósfera de dióxido de carbono que crea un efecto invernadero extremo.",
                diameter: "12,104 km",
                distance: "108.2 millones km",
                period: "225 días terrestres",
                temperature: "462°C",
                moons: "0"
            },
            earth: {
                name: "Tierra",
                description: "Nuestro hogar. El único planeta conocido con vida, agua líquida y una atmósfera rica en oxígeno. Tiene un campo magnético que nos protege del viento solar.",
                diameter: "12,756 km",
                distance: "149.6 millones km",
                period: "365.25 días",
                temperature: "15°C (promedio)",
                moons: "1 (Luna)"
            },
            mars: {
                name: "Marte",
                description: "El planeta rojo. Tiene el volcán más grande del sistema solar (Monte Olimpo) y evidencia de agua líquida en el pasado. Es el objetivo principal para la exploración humana.",
                diameter: "6,792 km",
                distance: "227.9 millones km",
                period: "687 días terrestres",
                temperature: "-65°C (promedio)",
                moons: "2 (Fobos y Deimos)"
            },
            jupiter: {
                name: "Júpiter",
                description: "El planeta más grande del sistema solar. Es un gigante gaseoso con la Gran Mancha Roja, una tormenta gigante que ha durado siglos. Tiene más de 80 lunas.",
                diameter: "142,984 km",
                distance: "778.5 millones km",
                period: "11.9 años terrestres",
                temperature: "-110°C",
                moons: "80+ (incluyendo Io, Europa, Ganímedes, Calisto)"
            },
            saturn: {
                name: "Saturno",
                description: "Famoso por sus anillos espectaculares compuestos de hielo y roca. Es menos denso que el agua y flotaría en un océano gigante. Tiene más de 80 lunas.",
                diameter: "120,536 km",
                distance: "1,432 millones km",
                period: "29.5 años terrestres",
                temperature: "-140°C",
                moons: "80+ (incluyendo Titán, Encelado)"
            },
            uranus: {
                name: "Urano",
                description: "El planeta que rota de lado debido a una colisión en el pasado. Tiene anillos tenues y una atmósfera de hidrógeno, helio y metano que le da su color azul.",
                diameter: "51,118 km",
                distance: "2,867 millones km",
                period: "84 años terrestres",
                temperature: "-195°C",
                moons: "27"
            },
            neptune: {
                name: "Neptuno",
                description: "El planeta más ventoso del sistema solar. Sus vientos pueden alcanzar hasta 2,100 km/h. Es el planeta más alejado del Sol y tarda 165 años en completar una órbita.",
                diameter: "49,528 km",
                distance: "4,515 millones km",
                period: "165 años terrestres",
                temperature: "-200°C",
                moons: "14"
            }
        };

        this.animationsPaused = false;
        this.arMode = false;
        this.currentPlanet = null;
        this.orbitSpeed = 1;
        
        this.init();
    }

    init() {
        this.createStarsTexture();
        this.setupEventListeners();
        this.setupAR();
        this.addParticleEffects();
        console.log('Sistema Solar AR inicializado correctamente');
    }

    createStarsTexture() {
        const canvas = document.getElementById('starsCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Fondo negro
        ctx.fillStyle = '#000011';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Crear diferentes tipos de estrellas
        for (let i = 0; i < 3000; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = Math.random() * 3;
            const brightness = Math.random();
            
            // Estrellas de diferentes colores
            const colors = ['#ffffff', '#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            ctx.fillStyle = color;
            ctx.globalAlpha = brightness;
            
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Agregar nebulosas
        const gradient = ctx.createRadialGradient(
            canvas.width * 0.3, canvas.height * 0.3, 0,
            canvas.width * 0.3, canvas.height * 0.3, canvas.width * 0.5
        );
        gradient.addColorStop(0, 'rgba(255, 100, 200, 0.1)');
        gradient.addColorStop(1, 'rgba(255, 100, 200, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    setupEventListeners() {
        // Cerrar información con tecla Escape
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.closePlanetInfo();
            }
        });

        // Detectar clics en planetas
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('clickable')) {
                const planetId = event.target.id;
                this.showPlanetInfo(planetId);
            }
        });

        // Controles de teclado
        document.addEventListener('keydown', (event) => {
            switch(event.key) {
                case 'r':
                case 'R':
                    this.resetView();
                    break;
                case ' ':
                    event.preventDefault();
                    this.toggleAnimation();
                    break;
                case 'a':
                case 'A':
                    this.toggleAR();
                    break;
            }
        });
    }

    setupAR() {
        // Configurar AR.js si está disponible
        if (typeof AFRAME !== 'undefined' && AFRAME.components['arjs']) {
            console.log('AR.js detectado y configurado');
        }
    }

    addParticleEffects() {
        // Agregar efectos de partículas al Sol
        const sun = document.getElementById('sun');
        if (sun) {
            // Efecto de brillo
            sun.addEventListener('mouseenter', () => {
                sun.setAttribute('material', 'emissiveIntensity', '0.8');
            });
            
            sun.addEventListener('mouseleave', () => {
                sun.setAttribute('material', 'emissiveIntensity', '0.3');
            });
        }
    }

    showPlanetInfo(planetId) {
        const data = this.planetData[planetId];
        if (!data) return;

        this.currentPlanet = planetId;
        
        // Actualizar contenido
        document.getElementById('planetName').textContent = data.name;
        document.getElementById('planetDescription').textContent = data.description;
        document.getElementById('planetDiameter').textContent = data.diameter;
        document.getElementById('planetDistance').textContent = data.distance;
        document.getElementById('planetPeriod').textContent = data.period;

        // Agregar información adicional si existe
        const infoDiv = document.getElementById('planetInfo');
        let additionalInfo = '';
        
        if (data.temperature) {
            additionalInfo += `<p><strong>Temperatura:</strong> ${data.temperature}</p>`;
        }
        if (data.composition) {
            additionalInfo += `<p><strong>Composición:</strong> ${data.composition}</p>`;
        }
        if (data.moons) {
            additionalInfo += `<p><strong>Lunas:</strong> ${data.moons}</p>`;
        }

        // Insertar información adicional antes del botón de cerrar
        const closeBtn = infoDiv.querySelector('.close-btn');
        closeBtn.insertAdjacentHTML('beforebegin', additionalInfo);

        // Mostrar con animación
        infoDiv.style.display = 'block';
        
        // Efecto de resaltado en el planeta
        this.highlightPlanet(planetId);
    }

    highlightPlanet(planetId) {
        const planet = document.getElementById(planetId);
        if (planet) {
            planet.classList.add('planet-glow');
            setTimeout(() => {
                planet.classList.remove('planet-glow');
            }, 2000);
        }
    }

    closePlanetInfo() {
        document.getElementById('planetInfo').style.display = 'none';
        this.currentPlanet = null;
    }

    resetView() {
        const camera = document.getElementById('camera');
        if (camera) {
            camera.setAttribute('position', '0 1.6 5');
            camera.setAttribute('rotation', '0 0 0');
        }
        
        // Feedback visual
        this.showNotification('Vista reseteada');
    }

    toggleAnimation() {
        this.animationsPaused = !this.animationsPaused;
        const scene = document.getElementById('scene');
        
        if (scene) {
            const animations = scene.querySelectorAll('[animation]');
            
            animations.forEach(anim => {
                if (this.animationsPaused) {
                    anim.pause();
                } else {
                    anim.play();
                }
            });
        }
        
        const status = this.animationsPaused ? 'pausadas' : 'reanudadas';
        this.showNotification(`Animaciones ${status}`);
    }

    toggleAR() {
        this.arMode = !this.arMode;
        const marker = document.getElementById('arMarker');
        
        if (marker) {
            marker.style.display = this.arMode ? 'block' : 'none';
        }
        
        const status = this.arMode ? 'activado' : 'desactivado';
        this.showNotification(`Modo AR ${status}`);
    }

    showNotification(message) {
        // Crear notificación temporal
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255, 215, 0, 0.9);
            color: black;
            padding: 10px 20px;
            border-radius: 25px;
            z-index: 2000;
            font-weight: bold;
            animation: slideIn 0.3s ease-out;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 2000);
    }

    // Método para cambiar la velocidad de las órbitas
    setOrbitSpeed(speed) {
        this.orbitSpeed = speed;
        const scene = document.getElementById('scene');
        
        if (scene) {
            const orbitAnimations = scene.querySelectorAll('[id$="Orbit"] [animation]');
            orbitAnimations.forEach(anim => {
                const currentDur = parseFloat(anim.getAttribute('dur'));
                anim.setAttribute('dur', currentDur / speed);
            });
        }
    }

    // Método para enfocar un planeta específico
    focusOnPlanet(planetId) {
        const planet = document.getElementById(planetId);
        const camera = document.getElementById('camera');
        
        if (planet && camera) {
            const planetPosition = planet.getAttribute('position');
            const cameraPosition = camera.getAttribute('position');
            
            // Calcular nueva posición de la cámara
            const newX = planetPosition.x + 2;
            const newY = planetPosition.y + 1;
            const newZ = planetPosition.z + 2;
            
            camera.setAttribute('position', `${newX} ${newY} ${newZ}`);
            camera.setAttribute('look-controls', 'enabled', false);
            
            // Restaurar controles después de un tiempo
            setTimeout(() => {
                camera.setAttribute('look-controls', 'enabled', true);
            }, 3000);
        }
    }

    // Método para obtener estadísticas del sistema
    getSystemStats() {
        const planets = Object.keys(this.planetData).length;
        const totalMoons = Object.values(this.planetData).reduce((total, planet) => {
            return total + (planet.moons ? parseInt(planet.moons) : 0);
        }, 0);
        
        return {
            planets: planets,
            totalMoons: totalMoons,
            animationsPaused: this.animationsPaused,
            arMode: this.arMode
        };
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.solarSystem = new SolarSystemAR();
    
    // Agregar estilos de animación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});

// Exportar para uso global
window.SolarSystemAR = SolarSystemAR;
