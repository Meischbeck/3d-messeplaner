
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

// Szene und Kamera
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('scene'),
  antialias: true,
  alpha: false
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0xffffff, 1); // Weißer Hintergrund

// Licht
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Objekt
const geometry = new THREE.BoxGeometry(2, 2, 0.1);
const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Render Loop
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();

// === Formular-Verarbeitung ===
const form = document.getElementById('config-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Eingabewerte holen
  const width = parseFloat(document.getElementById('width').value);
  const depth = parseFloat(document.getElementById('depth').value);
  const height = parseFloat(document.getElementById('wallHeight').value);

  // Würfel skalieren (Breite = X, Höhe = Y, Tiefe = Z)
  cube.scale.set(width / 2, height / 2, depth / 2);
});

