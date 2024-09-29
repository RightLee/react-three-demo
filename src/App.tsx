import './App.css'
import { BrowserRouter as Router, Routes, Route, Link, Outlet, useLocation } from 'react-router-dom'
import HomeIndex from './pages/home/index'
import GeometryIndex from './pages/geometry/index'
import UVIndex from './pages/uv/index'
import LightIndex from './pages/light/index'
import GuiIndex from './pages/gui/index'
import ExampleIndex from './pages/example/index'
import SkyBox from './pages/example/skybox/index'
import CarIndex from './pages/example/car/index'
import CardIndex from './pages/example/card/index'
import BuildingIndex from './pages/example/building/index'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<HomeIndex />} />
          <Route path="geometry" element={<GeometryIndex />} />
          <Route path="uv" element={<UVIndex />} />
          <Route path="light" element={<LightIndex />} />
          <Route path="gui" element={<GuiIndex />} />
          <Route path="example" element={<ExampleIndex />} >
            <Route index element={<SkyBox />} />
            <Route path="car" element={<CarIndex />} />
            <Route path="card" element={<CardIndex />} />
            <Route path="building" element={<BuildingIndex />} />
          </Route>
        </Route>
      </Routes>
    </Router >
  )
}

function Layout() {
  const location = useLocation()
  const currentPath = location.pathname
  console.log(location)
  return (
    <div className='layout-box'>
      <header className='layout-header'>
        <nav>
          <ul className='layout-route-box'>
            <li>
              <Link to="/" className={currentPath === "/" ? "active" : ""}>首页</Link>
            </li>
            <li>
              <Link to="/geometry" className={currentPath === "/geometry" ? "active" : ""}>几何体</Link>
            </li>
            <li>
              <Link to="/uv" className={currentPath === "/uv" ? "active" : ""}>UV</Link>
            </li>
            <li>
              <Link to="/light" className={currentPath === "/light" ? "active" : ""}>光源</Link>
            </li>
            <li>
              <Link to="/example" className={currentPath.includes("/example") ? "active" : ""}>示例</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className='layout-main'>
        <Outlet />
      </div>
    </div>
  )
}

export default App
