import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js';

// Szene & Kamera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(4, 4, 8);
camera.lookAt(0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('scene'),
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0xffffff, 1);

// OrbitControls – Maussteuerung aktivieren
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // weiche Bewegung
controls.dampingFactor = 0.05;
controls.target.set(0, 0, 0); // Fokus auf Ursprung

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

// Animation (keine Rotation – nur Kamera)
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // wichtig für Maussteuerung
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
      // Alte Platte löschen
      if (floorMesh) {
        scene.remove(floorMesh);
        floorMesh.geometry.dispose();
        floorMesh.material.dispose();
      }

      // Neue Bodenplatte
      const geometry = new THREE.BoxGeometry(width, height, depth);
      const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
      floorMesh = new THREE.Mesh(geometry, material);
      floorMesh.position.y = height / 2; // steht auf dem Boden
      scene.add(floorMesh);

      // Kamera auf neue Mitte fokussieren
      controls.target.set(0, height / 2, 0);
      controls.update();
    }
  });
});
