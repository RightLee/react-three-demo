import { useEffect } from "react"
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
const LightIndex = () => {
    const init = () => {
        const width = window.innerWidth, height = window.innerHeight
        //场景
        const scene = new THREE.Scene()
        //添加背景颜色
        scene.background = new THREE.Color(0x666666)
        //相机
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
        //渲染器
        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(width, height)
        renderer.shadowMap.enabled = true
        //创建几何体
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        //创建材质
        const material = new THREE.MeshPhongMaterial({
            color: 0x00ff00,
            shininess: 100,
        })
        //网格
        const cube = new THREE.Mesh(geometry, material)
        cube.position.set(0, 0.5, 0)

        //物体接受光源
        cube.receiveShadow = true
        //物体投射光源
        cube.castShadow = true
        scene.add(cube)

        //添加光源
        //环境光
        const light = new THREE.AmbientLight(0xffffff, 1)
        scene.add(light)
        //点光源
        const pointlight = new THREE.PointLight(0xffffff, 100, 100)
        pointlight.position.set(5, 3, 5)
        pointlight.castShadow = true
        scene.add(pointlight)

        //创建地面
        const meshfloor = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 10),
            new THREE.MeshPhongMaterial({ color: 0x0099ff })
        )
        meshfloor.rotation.x -= Math.PI / 2
        //物体接受光源
        meshfloor.receiveShadow = true
        scene.add(meshfloor)

        camera.position.z = 5
        //坐标轴
        const axesHelper = new THREE.AxesHelper(5)
        scene.add(axesHelper)
        //相机轨道
        const orbitControls = new OrbitControls(camera, renderer.domElement)
        orbitControls.enableDamping = true
        orbitControls.dampingFactor = 0.2
        orbitControls.enableZoom = true

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
        <div id="container"></div>
    )
}

export default LightIndex