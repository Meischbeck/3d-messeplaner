import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js';

// === Szene & Kamera ===
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(4, 4, 8);
camera.lookAt(0, 0, 0);

// === Renderer ===
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('scene'),
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0xffffff, 1); // Weißer Hintergrund

// === OrbitControls ===
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.target.set(0, 0, 0);

// === Licht ===
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// === Bodenplatte ===
let floorMesh = null;

// === Fenstergröße anpassen ===
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// === Animation ===
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// === Formularverarbeitung ===
const generateBtn = document.getElementById('generate-button');
const widthInput = document.getElementById('width');
const depthInput = document.getElementById('depth');

generateBtn.addEventListener('click', () => {
  const width = parseFloat(widthInput.value);
  const depth = parseFloat(depthInput.value);
  const height = 0.08;

  if (width > 0 && depth > 0) {
    if (floorMesh) {
      scene.remove(floorMesh);
      floorMesh.geometry.dispose();
      floorMesh.material.dispose();
      floorMesh = null;
    }

    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
    floorMesh = new THREE.Mesh(geometry, material);
    floorMesh.position.y = height / 2;
    scene.add(floorMesh);

    controls.target.set(0, height / 2, 0);
    controls.update();

    widthInput.value = width;
    depthInput.value = depth;
  }
});


  // ⛔ Enter unterdrücken & als "Submit" behandeln
  form.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      form.dispatchEvent(new Event('submit'));
    }
  });

  // 📦 Messestand erstellen
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const width = parseFloat(widthInput.value);
    const depth = parseFloat(depthInput.value);
    const height = 0.08; // feste Bodenhöhe

    if (width > 0 && depth > 0) {
      // Vorherige Platte entfernen
      if (floorMesh) {
        scene.remove(floorMesh);
        floorMesh.geometry.dispose();
        floorMesh.material.dispose();
        floorMesh = null;
      }

      // Neue Bodenplatte
      const geometry = new THREE.BoxGeometry(width, height, depth);
      const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
      floorMesh = new THREE.Mesh(geometry, material);
      floorMesh.position.y = height / 2;
      scene.add(floorMesh);

      // Kamera-Fokus
      controls.target.set(0, height / 2, 0);
      controls.update();

      // 🔐 Eingaben beibehalten (explizit zurücksetzen)
      widthInput.value = width;
      depthInput.value = depth;
    }
  });
});
