import * as THREE from 'three';
import './style.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';

// Scene
const scene = new THREE.Scene();

// geometory, geometory is just the shape
const geometry = new THREE.SphereGeometry(3, 64, 64);
const meterial = new THREE.MeshStandardMaterial({
  color: '#00ff83',
  roughness: 0.5,
});
console.log('geometry', geometry);
console.log('meterial', meterial);
const mesh = new THREE.Mesh(geometry, meterial);
console.log('mesh', mesh);
scene.add(mesh);

// Camera
// Sizes
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(
  45,
  size.width / size.height,
  0.1,
  100
);
camera.position.z = 20;
scene.add(camera);
console.log('camera', camera);

// Light
const light = new THREE.PointLight(0xffffff, 50, 100, 1.7);
light.position.set(0, 10, 10);
scene.add(light);
console.log('light', light);

// renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

// Control
const control = new OrbitControls(camera, canvas);
control.enableDamping = true;
control.enablePan = false;
control.enableZoom = false;
control.autoRotate = true;
control.autoRotateSpeed = 5;

// Resize
window.addEventListener('resize', () => {
  // Upload Sizes
  size.width = window.innerWidth;
  size.height = window.innerHeight;
  // Upload cameras
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();
  renderer.setSize(size.width, size.height);
});

const loop = () => {
  control.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};

loop();

const t1 = gsap.timeline({ defaults: { duration: 1 } });
t1.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
t1.fromTo('nav', { y: '-100%' }, { y: '0%' });
t1.fromTo('.title', { opacity: 0 }, { opacity: 1 });

let mouseDown = false;
let rgb = [];
window.addEventListener('mousedown', () => {
  mouseDown = true;
});
window.addEventListener('mouseup', () => {
  mouseDown = false;
});
window.addEventListener('mousemove', e => {
  if (mouseDown) {
    rgb = [
      Math.round((e.pageX / size.width) * 255),
      Math.round((e.pageY / size.width) * 255),
      150,
    ];
    let newColor = new THREE.Color(`rgb(${rgb.join(',')})`);
    gsap.to(mesh.material.color, {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b,
    });
  }
});
