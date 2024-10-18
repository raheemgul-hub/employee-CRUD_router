import { Link, Outlet } from 'react-router-dom'
import './Home.css'
function HOME() {
    return (
        //main parent file having nav bar
        <div>
            <div className='nav-bar'>
                <Link to='/'>
                    <i className="fa-solid fa-house home"></i>
                </Link>
                <div className='emp'>
                    <i className="fa-solid fa-user"></i>
                    Employee management
                </div>
            </div>
            <Outlet />
        </div>
    )
}
export default HOME