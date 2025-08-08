// Three.js import
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

// Szene, Kamera und Renderer
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// Renderer erstellen und konfigurieren
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('scene'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0xffffff, 1); // Weißer Hintergrund
document.body.appendChild(renderer.domElement);

// Licht hinzufügen
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Platzhalter: Ein blauer Würfel als Beispielobjekt
const geometry = new THREE.BoxGeometry(2, 2, 0.1);
const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Fenstergröße anpassen bei Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();

