import { useEffect } from 'react';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
function HomeIndex() {
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

    //创建GLTF实例
    const loader = new GLTFLoader();
    //加载模型
    loader.load('../../../public/qqq.glb', function (glb) {
      scene.add(glb.scene)
    });

    //添加环境光
    const ambientLight = new THREE.AmbientLight(0x404040, 1)
    scene.add(ambientLight)

    //添加平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 3)
    directionalLight.position.set(11.2, 11.2, 7.4)
    scene.add(directionalLight)

    camera.position.x = 10
    camera.position.y = 10
    camera.position.z = 10
    //网格线
    const gridHelper = new THREE.GridHelper(20, 20)
    gridHelper.position.y = -1
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
    //全屏方法
    // doucument.body.requestFullscreen()
    //退出全屏
    // document.exitFullscreen()
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

export default HomeIndex