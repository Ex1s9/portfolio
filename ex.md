Это самый мощный способ.
Three.js уже содержит материал MeshPhysicalMaterial, поддерживающий преломление света через ior (индекс преломления).
Минимальный пример:
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, innerWidth/innerHeight, 0.1, 100);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

// Задний фон
const envTexture = new THREE.TextureLoader().load('env.jpg');
scene.background = envTexture;

// Геометрия стекла
const geometry = new THREE.SphereGeometry(2, 64, 64);
const material = new THREE.MeshPhysicalMaterial({
transmission: 1.0,  // прозрачность
thickness: 0.5,     // толщина стекла
roughness: 0.0,     // гладкость
ior: 1.5,           // коэффициент преломления (1.0 = воздух, 1.5 = стекло)
envMap: envTexture,
envMapIntensity: 1.0
});

const glass = new THREE.Mesh(geometry, material);
scene.add(glass);

function animate() {
requestAnimationFrame(animate);
glass.rotation.y += 0.01;
renderer.render(scene, camera);
}
animate();
📈 Этот вариант создаёт реальное физическое преломление, включая отражения и искажения, зависящие от угла.
Для эффекта “по бокам экрана” ты можешь сделать вместо сферы — два узких слоя по краям или даже плоский PlaneGeometry с normalMap и refractionRatio.