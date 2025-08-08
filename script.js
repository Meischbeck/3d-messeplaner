import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

// Szene & Kamera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 8);
camera.lookAt(0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('scene'),
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0xffffff, 1);

// Licht
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Bodenplatte (wird bei Klick erstellt)
let floorMesh = null;

// Fenstergröße anpassen
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation
function animate() {
  requestAnimationFrame(animate);
  if (floorMesh) floorMesh.rotation.y += 0.005;
  renderer.render(scene, camera);
}
animate();

// Formular-Verarbeitung
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('config-form');

  form.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') e.preventDefault();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const width = parseFloat(document.getElementById('width').value);
    const depth = parseFloat(document.getElementById('depth').value);
    const height = 0.08; // Feste Bodenhöhe

    if (width > 0 && depth > 0) {
      // Alte Bodenplatte entfernen
      if (floorMesh) {
        scene.remove(floorMesh);
        floorMesh.geometry.dispose();
        floorMesh.material.dispose();
      }

      // Neue Bodenplatte erstellen
      const geometry = new THREE.BoxGeometry(width, height, depth);
      const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
      floorMesh = new THREE.Mesh(geometry, material);
      floorMesh.position.y = height / 2; // auf den Boden stellen

      scene.add(floorMesh);
    }
  });
});
