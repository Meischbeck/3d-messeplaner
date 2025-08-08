import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

// === Szene, Kamera, Renderer ===
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('scene'),
  antialias: true,
  alpha: false
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0xffffff, 1); // Weißer Hintergrund

// === Licht ===
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// === Platzhalter: Würfel als "Messestand"
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// === Fenstergröße aktualisieren ===
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

// === Formular-Verarbeitung ===
const form = document.getElementById('config-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Werte auslesen
  const width = parseFloat(document.getElementById('width').value);
  const depth = parseFloat(document.getElementById('depth').value);
  const height = parseFloat(document.getElementById('wallHeight').value);

  // Wenn Eingaben gültig sind, Würfel skalieren
  if (width > 0 && depth > 0 && height > 0) {
    cube.scale.set(width, height, depth);
  }
});

