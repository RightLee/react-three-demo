import { useEffect } from 'react';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
function UVIndex() {
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
    //几何体
    const geometry = new THREE.PlaneGeometry(1, 1)

    //纹理
    const texture = new THREE.TextureLoader().load('textures/texture.jpg')

    //uv定义范围(左上 右上 左下 右下)
    const uv = new Float32Array([
      0.5, 1,
      1, 1,
      0.5, 0.5,
      1, 0.5,
    ])

    geometry.attributes.uv = new THREE.BufferAttribute(uv, 2)
    const material = new THREE.MeshBasicMaterial({
      // color: 0xff0000,
      map: texture,
      side: THREE.DoubleSide,
    });
    const cube = new THREE.Mesh(geometry, material);

    //网格
    scene.add(cube)
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
    <>
      <div id="container"></div>
    </>
  )
}

export default UVIndex;