import { useEffect } from 'react';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function CardIndex() {

    useEffect(() => {
        console.log('CardIndex')
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x666666);
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 2, 6)
        const renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight)
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableZoom = true;
        //网格线
        const gridHelper = new THREE.GridHelper(20, 20)
        scene.add(gridHelper)

        //渲染方法
        const animate = () => {
            requestAnimationFrame(animate)
            renderer.render(scene, camera)
        }
        animate()
        document.getElementById('container')?.appendChild(renderer.domElement)
        //监听窗口变化
        window.addEventListener('resize', () => {
            renderer.setSize(window.innerWidth, window.innerHeight)
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
        })

    }, [])
    return (
        <div id="container"></div>
    )
}

export default CardIndex;