import { useEffect } from 'react';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
function HomeIndex() {
  const init = () => {
    const width = window.innerWidth, height = window.innerHeight 
    //场景
    const scene = new THREE.Scene()
    //相机
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    //渲染器
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(width, height)
    //几何体
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    //材质
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    // 创建6种不同颜色的材质
    const materials = [
      new THREE.MeshBasicMaterial({ color: 0xff0000 }), // 红色
      new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // 绿色
      new THREE.MeshBasicMaterial({ color: 0x0000ff }), // 蓝色
      new THREE.MeshBasicMaterial({ color: 0xffff00 }), // 黄色
      new THREE.MeshBasicMaterial({ color: 0x00ffff }), // 青色
      new THREE.MeshBasicMaterial({ color: 0xff00ff })  // 紫色
    ];
    const cube = new THREE.Mesh(geometry, materials)
    cube.position.y = 2;
    scene.add(cube)
    camera.position.z = 5
    //网格线
    const gridHelper = new THREE.GridHelper(20, 20)
    scene.add(gridHelper)
    //相机轨道
    const orbitControls = new OrbitControls(camera, renderer.domElement)
    orbitControls.enableDamping = true
    orbitControls.dampingFactor = 0.2
    orbitControls.enableZoom = true
    //坐标轴
    const axesHelper = new THREE.AxesHelper(5)
    axesHelper.position.y = 2;
    scene.add(axesHelper)

    //渲染方法
    const animate = () => {
      requestAnimationFrame(animate)
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      renderer.render(scene, camera)
    }
    animate()
    document.getElementById('container')?.appendChild(renderer.domElement)
  }

  useEffect(() => {
    init()
  },[])
  

  return (
    <>
      <div id="container"></div>
    </>
  )
}

export default HomeIndex