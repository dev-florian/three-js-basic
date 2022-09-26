import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import gsap from 'gsap'


export default function images() {
    //SIZE OF CANVAS
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    let images = document.querySelectorAll('.image');
    if (images) {
        images.forEach(canvas => {
            // Scene : CREATE DEFAULT SCENE
            const scene = new THREE.Scene()

            // Objects : CREATE YOUR GEOMETRY PLANE HERE
            const geometry = new THREE.PlaneGeometry(1, 1.3);

            // Materials : ADD MATERIAL AND HIS CONFIG ( STANDARD MATERIAL )
            const textureLoader = new THREE.TextureLoader();
            const material = new THREE.MeshBasicMaterial({
                map: textureLoader.load(canvas.getAttribute('src'))
            })

            // Mesh : MERGE OBJECT AND MATERIAL
            const mesh = new THREE.Mesh(geometry, material)

            //ADD TO SCENE
            scene.add(mesh)

            // Lights : ADD LIGHTS
            const pointLight = new THREE.PointLight(0xffffff, 0.4)
            pointLight.position.x = 2
            pointLight.position.y = 3
            pointLight.position.z = 4
            scene.add(pointLight)

            // Base camera
            const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
            camera.position.x = -1
            camera.position.y = 0
            camera.position.z = 2
            scene.add(camera)

            //HOVER
            let objs = [];
            scene.traverse(object => {
                if (object.isMesh) {
                    console.log('here');
                    objs.push(object)
                }
            });


            function onPointerMove(event) {
                if(document.elementFromPoint(event.clientX, event.clientY) === canvas){
                    let mouse = new THREE.Vector2();
                    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
                    let raycaster = new THREE.Raycaster();
                    raycaster.setFromCamera(mouse, camera);
                    let intersects = raycaster.intersectObjects(objs);
                    if (intersects.length > 0) {
                        intersects.forEach(intersect => {
                            console.log(intersects);
                            let object = intersect.object;
                            gsap.to(object.scale, {x: 1.8, y: 1.8});
                            gsap.to(object.rotation, {y: -.5});
                            gsap.to(object.position, {z: -0.9});
                        });
                    }else{
                        objs.forEach(object => {
                            gsap.to(object.scale, {x: 1, y: 1});
                            gsap.to(object.rotation, {y: 0});
                            gsap.to(object.position, {z: 0});
                        })
                    }
                }else{
                    objs.forEach(object => {
                        gsap.to(object.scale, {x: 1, y: 1});
                        gsap.to(object.rotation, {y: 0});
                        gsap.to(object.position, {z: 0});
                    })
                }

            }


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

            /**
             * Renderer
             */
            const renderer = new THREE.WebGLRenderer({
                canvas: canvas,
                alpha: true
            })
            renderer.setSize(sizes.width, sizes.height)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

            const clock = new THREE.Clock()

            const autoAnim = () => {
                const elapsedTime = clock.getElapsedTime()

                // Update Orbital Controls
                // controls.update()

                // Render
                renderer.render(scene, camera)

                window.addEventListener('pointermove', onPointerMove);

                // Call tick again on the next frame
                window.requestAnimationFrame(autoAnim)

            }

            autoAnim()

        });
    }
}



