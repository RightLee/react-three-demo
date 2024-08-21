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
    const geometry = new THREE.BufferGeometry();
    // 创建一个简单的矩形. 在这里我们左上和右下顶点被复制了两次。
    // 因为在两个三角面片里，这两个顶点都需要被用到。
    const vertices = new Float32Array( [
      -1.0, -1.0,  1.0,
      1.0, -1.0,  1.0,
      1.0,  1.0,  1.0,
      // 1.0,  1.0,  1.0,
      -1.0,  1.0,  1.0,
      // -1.0, -1.0,  1.0
    ] );

    // itemSize = 3 因为每个顶点都是一个三元组。
    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

    //需要确认几何体的顶点
    //利用索引来确定每个三角面片的顶点
    const indexs = new Uint16Array( [
      0, 1, 2, 2, 3, 0,
    ])
    geometry.index = new THREE.BufferAttribute( indexs, 1 );

    const material = new THREE.MeshBasicMaterial( { 
      color: 0xff0000,
      side: THREE.DoubleSide,
      wireframe: true,
    } );
    const mesh = new THREE.Mesh( geometry, material );
    
    //网格
    scene.add(mesh)
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

export default UVIndex;