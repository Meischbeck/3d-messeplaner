import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

// === Szene & Kamera ===
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

// === Renderer ===
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('scene'),
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0xffffff, 1);

// === Licht ===
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// === Bodenplatte (anfangs Würfel) ===
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// === Fenstergröße anpassen ===
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// === Animation ===
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// === Formularverarbeitung ===
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('config-form');

  // Enter-Taste im Formular deaktivieren
  form.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  });

  // Beim Absenden des Formulars: Eingaben auslesen & Bodenplatte anpassen
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const width = parseFloat(document.getElementById('width').value);
    const depth = parseFloat(document.getElementById('depth').value);
    const height = 0.08; // Feste Bodenhöhe (80mm)

    if (width > 0 && depth > 0) {
      cube.scale.set(width, height, depth);
    }
  });
});
