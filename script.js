let scene, camera, renderer, controls;
let floorMesh = null;

function initScene() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(4, 4, 8);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('scene'),
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0xffffff, 1); // weißer Hintergrund

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.target.set(0, 0, 0);

  const light = new THREE.AmbientLight(0xffffff, 1);
  scene.add(light);

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

function setupUI() {
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
    }
  });
}

window.addEventListener('load', () => {
  initScene();
  setupUI();
});
