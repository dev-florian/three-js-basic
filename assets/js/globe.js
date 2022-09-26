import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'


export default function globe() {
    //SIZE OF CANVAS
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }


    // Canvas : DIV
    const canvas = document.querySelector('.globe')

// Scene : CREATE DEFAULT SCENE
    const scene = new THREE.Scene()

// Objects : CREATE YOUR GEOMETRY
    const geometry = new THREE.SphereBufferGeometry(1, 32, 20);

// Materials : ADD MATERIAL AND HIS CONFIG ( STANDARD MATERIAL )
    const textureLoader = new THREE.TextureLoader();
    const normalTexture = textureLoader.load('./textures/NormalMap.png');
    const material = new THREE.MeshStandardMaterial()
    material.color = new THREE.Color(0x000000)
    material.normalMap = normalTexture

// Mesh : MERGE OBJECT AND MATERIAL
    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

// Lights : ADD LIGHTS
    const pointLight = new THREE.PointLight(0x00008B, 16)
    pointLight.position.x = 4.5
    pointLight.position.y = 7
    pointLight.position.z = -10
    scene.add(pointLight)

    const pointLight2 = new THREE.PointLight(0x8B0000, 16)
    pointLight2.position.x = -3.75
    pointLight2.position.y = -5
    pointLight2.position.z = -10
    scene.add(pointLight2)

    //REPONSIVE CONVAS
    window.addEventListener('resize', () => {
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
    lightDebug.add(pointLight, 'intensity').min(0).max(6).step(0.01)

    let lightDebug2 = gui.addFolder('Light2')
    lightDebug2.add(pointLight2.position, 'x').min(-30).max(30).step(0.01)
    lightDebug2.add(pointLight2.position, 'y').min(-30).max(30).step(0.01)
    lightDebug2.add(pointLight2.position, 'z').min(-30).max(30).step(0.01)
    lightDebug2.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

    const pointerLighterHelp = new THREE.PointLightHelper(pointLight, 1)
    scene.add(pointerLighterHelp)
    const pointerLighterHelp2 = new THREE.PointLightHelper(pointLight2, 1)
    scene.add(pointerLighterHelp2)

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

    document.addEventListener('mousemove', mousemoveAnimation);

    let mouseX = 0;
    let mouseY = 0;

    let targetX = 0;
    let targetY = 0;

    const windowX = window.innerWidth / 2
    const windowY = window.innerHeight / 2

    let scrollAnimation = e => {

        // Calculate scrolls here
        sphere.rotation.y = window.scrollY * 0.01;
    };

    window.addEventListener('scroll', scrollAnimation);

    const clock = new THREE.Clock()

    const autoAnim = () => {

        targetX = mouseX * 0.001
        targetY = mouseY * 0.001
        const elapsedTime = clock.getElapsedTime()

        // Update objects
        sphere.rotation.y = .2 * elapsedTime
        sphere.rotation.z = .2 * elapsedTime

        sphere.rotation.x += 0.5 * (targetY - sphere.rotation.x)
        sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y)

        // Update Orbital Controls
        // controls.update()

        // Render
        renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(autoAnim)
    }

    function mousemoveAnimation(event) {
        mouseX = (event.clientX - windowX);
        mouseY = (event.clientY - windowY);
    }

    autoAnim()
}



