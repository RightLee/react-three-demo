import { useEffect } from 'react';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
function SkyBox() {
  const init = () => {
    const width = window.innerWidth, height = window.innerHeight
    //场景
    const scene = new THREE.Scene()
    //相机
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    //渲染器
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(width, height)
    //创建纹理
    // const texture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/crate.gif')
    //创建立体纹理（左右上下前后）
    const cubeTexture = new THREE.CubeTextureLoader().load([
      'textures/04.jpg', 'textures/01.jpg',
      'textures/05.jpg', 'textures/02.jpg',
      'textures/06.jpg', 'textures/03.jpg',
    ])
    scene.background = cubeTexture
    //几何体
    const sphere = new THREE.SphereGeometry(1)

    //材质
    const material = new THREE.MeshBasicMaterial({
      // map: texture,
      envMap: cubeTexture,
    })
    //创建网格
    const cube = new THREE.Mesh(sphere, material)
    cube.position.y = 2;
    scene.add(cube)
    camera.position.z = 5



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
    <>
      <div id="container"></div>
    </>
  )
}

export default SkyBox;