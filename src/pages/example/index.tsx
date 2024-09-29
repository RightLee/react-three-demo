import { Link, Outlet, useLocation } from 'react-router-dom'
function ExampleIndex() {
    const location = useLocation()
    const currentPath = location.pathname
    // console.log(location, currentPath)
    return (
        <div className="layout-box">
            <header className='layout-header layout-header-second'>
                <nav>
                    <ul className='layout-route-box'>
                        <li>
                            <Link to="/example" className={currentPath === "/example" ? "active" : ""}>天空盒</Link>
                        </li>
                        <li>
                            <Link to="/example/car" className={currentPath === "/example/car" ? "active" : ""}>车</Link>
                        </li>
                        <li>
                            <Link to="/example/card" className={currentPath === "/example/card" ? "active" : ""}>贺卡</Link>
                        </li>
                        <li>
                            <Link to="/example/building" className={currentPath === "/example/building" ? "active" : ""}>建筑物</Link>
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

export default ExampleIndex;
