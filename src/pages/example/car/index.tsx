import { useEffect } from "react"
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
function CarIndex() {
    const init = () => {
        const width = window.innerWidth, height = window.innerHeight
        //场景
        const scene = new THREE.Scene()
        //添加背景颜色
        scene.background = new THREE.Color(0x666666)
        //相机
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
        camera.position.set(0, 2, 6)
        //渲染器
        const renderer = new THREE.WebGLRenderer({
            //抗锯齿
            antialias: true
        })
        renderer.setSize(width, height)
        //相机轨道
        const orbitControls = new OrbitControls(camera, renderer.domElement)
        orbitControls.enableDamping = true
        orbitControls.dampingFactor = 0.2
        orbitControls.enableZoom = true
        //网格线
        const gridHelper = new THREE.GridHelper(20, 20)
        gridHelper.material.opacity = 0.3
        gridHelper.material.transparent = true

        scene.add(gridHelper)

        let wheels = []
        let carBody, frontCar, hoodCar, glassCar;
        //创建材质
        const bodyMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xff0000,
            metalness: 1,
            roughness: 0.5,
            clearcoat: 1,
            clearcoatRoughness: 0,
        })
        const frontMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xff0000,
            metalness: 1,
            roughness: 0.5,
            clearcoat: 1,
            clearcoatRoughness: 0,
        })
        const hoodMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xff0000,
            metalness: 1,
            roughness: 0.5,
            clearcoat: 1,
            clearcoatRoughness: 0,
        })
        const wheelMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xff0000,
            metalness: 1,
            roughness: 0.1,
        })
        const glassMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            transmission: 1,
            metalness: 0,
            transparent: true,
            roughness: 0,
        })


        //创建GLTF实例
        const loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('../../../draco/gltf/');
        // 将 DRACO 解码器实例传递给 GLTF 加载器
        loader.setDRACOLoader(dracoLoader);
        //加载模型
        loader.load('../../../model/bmw/bmw01.glb', function (gltf) {
            const bmw = gltf.scene
            console.log('模型：---》', bmw)
            bmw.traverse((child) => {
                //只有THREE.Mesh才有isMesh属性
                if (child instanceof THREE.Mesh) {
                    console.log('子对象：---》', child.name)
                }
                //是否是轮毂
                if (child instanceof THREE.Mesh && child.name.includes('轮毂')) {
                    child.material = wheelMaterial
                    wheels.push(child)
                }
                //是否是车身
                if (child instanceof THREE.Mesh && child.name.includes('Mesh002')) {
                    child.material = bodyMaterial
                    carBody = child
                }
                //是否是前脸
                if (child instanceof THREE.Mesh && child.name.includes('前脸')) {
                    child.material = frontMaterial
                    frontCar = child
                }
                //是否是引擎盖
                if (child instanceof THREE.Mesh && child.name.includes('引擎盖')) {
                    child.material = hoodMaterial
                    hoodCar = child
                }
                //是否是挡风玻璃
                if (child instanceof THREE.Mesh && child.name.includes('挡风玻璃')) {
                    child.material = glassMaterial
                    glassCar = child
                }
            })
            scene.add(bmw)
        });

        //添加灯光
        const light1 = new THREE.DirectionalLight(0xffffff, 2);
        light1.position.set(0, 0, 10);
        scene.add(light1);
        const light2 = new THREE.DirectionalLight(0xffffff, 2);
        light2.position.set(0, 0, -10);
        scene.add(light2);
        const light3 = new THREE.DirectionalLight(0xffffff, 2);
        light3.position.set(10, 0, 0);
        scene.add(light3);
        const light4 = new THREE.DirectionalLight(0xffffff, 2);
        light4.position.set(-10, 0, 0);
        scene.add(light4);
        const light5 = new THREE.DirectionalLight(0xffffff, 4);
        light5.position.set(0, 10, 0);
        scene.add(light5);
        const light6 = new THREE.DirectionalLight(0xffffff, 4);
        light6.position.set(5, 10, 0);
        scene.add(light6);
        const light7 = new THREE.DirectionalLight(0xffffff, 4);
        light7.position.set(-5, 10, 0);
        scene.add(light7);

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
    }
    useEffect(() => {
        init()
    }, [])
    return (
        <div className="car-model-container">
            <div id="container"></div>
            <div className="car-config">
                <h1>汽车展示与选配</h1>
                <h2>选择车身颜色</h2>
            </div>
        </div>
    )
}

export default CarIndex;