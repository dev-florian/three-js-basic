import '../css/style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Canvas : DIV
const canvas = document.querySelector('canvas.webgl')

// Scene : CREATE DEFAULT SCENE
const scene = new THREE.Scene()

// Objects : CREATE YOUR GEOMETRY
const geometry = new THREE.SphereBufferGeometry(1, 32, 20);

// Materials : ADD MATERIAL AND HIS CONFIG ( STANDARD MATERIAL )
const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load('./NormalMap.png');
console.log(normalTexture);
const material = new THREE.MeshStandardMaterial()
material.color = new THREE.Color(0x000000)
material.normalMap = normalTexture

// Mesh : MERGE OBJECT AND MATERIAL
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights : ADD LIGHTS
const pointLight = new THREE.PointLight(0xffffff, 0.9)
pointLight.position.x = 1.9
pointLight.position.y = 2.3
pointLight.position.z = -2.5
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0x8B0000, 2)
pointLight2.position.x = -0.75
pointLight2.position.y = -0.75
pointLight2.position.z = -0.3
scene.add(pointLight2)

//SIZE OF CANVAS
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//REPONSIVE CONVAS
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Base camera : SET THE CAMERA
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Debug : ADD PANEL
const gui = new dat.GUI()
let lightDebug = gui.addFolder('Light')
lightDebug.add(pointLight.position, 'x').min(-20).max(20).step(0.01)
lightDebug.add(pointLight.position, 'y').min(-20).max(20).step(0.01)
lightDebug.add(pointLight.position, 'z').min(-20).max(20).step(0.01)
lightDebug.add(pointLight, 'intensity').min(0).max(3).step(0.01)

let lightDebug2 = gui.addFolder('Light2')
lightDebug2.add(pointLight2.position, 'x').min(-20).max(20).step(0.01)
lightDebug2.add(pointLight2.position, 'y').min(-20).max(20).step(0.01)
lightDebug2.add(pointLight2.position, 'z').min(-20).max(20).step(0.01)
lightDebug2.add(pointLight2, 'intensity').min(0).max(3).step(0.01)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const autoAnim = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(autoAnim)
}

autoAnim()