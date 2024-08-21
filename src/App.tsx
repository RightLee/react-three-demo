import './App.css'
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom'
import HomeIndex from './pages/home/index'
import GuiIndex from './pages/gui/index'
import DemoIndex from './pages/gui/index'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<HomeIndex />} />
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
              <Link to="/gui">GUI</Link>
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
