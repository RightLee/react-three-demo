import './App.css'
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom'
import HomeIndex from './pages/home/index'
import GeometryIndex from './pages/geometry/index'
import UVIndex from './pages/uv/index'
import LightIndex from './pages/light/index'
import GuiIndex from './pages/gui/index'
import DemoIndex from './pages/demo/index'
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
          <Route path="demo" element={<DemoIndex />} />
        </Route>
      </Routes>
    </Router>
  )
}

function Layout() {
  return (
    <div className='layout-box'>
      <header className='layout-header'>
        <nav>
          <ul className='layout-route-box'>
            <li>
              <Link to="/">首页</Link>
            </li>
            <li>
              <Link to="/geometry">几何体</Link>
            </li>
            <li>
              <Link to="/uv">UV</Link>
            </li>
            <li>
              <Link to="/light">光源</Link>
            </li>
            <li>
              <Link to="/demo">Demo</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className='layout-main'>
        <Outlet />
      </main>
    </div>
  )
}

export default App
