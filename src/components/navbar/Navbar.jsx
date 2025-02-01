import './navbar.css'
import menu_icon from '../../assets/menu.png'
import logo from '../../assets/logo.png'
import search from '../../assets/search.png'
import notification from '../../assets/notification.png'
import profile from '../../assets/jack.png'
import upload from '../../assets/upload.png'
import more from '../../assets/more.png'
import { Link } from 'react-router-dom'

const Navbar = ({setsidebar}) => {
    return ( 
        <nav className='navbar flex-direction'>
            <div className="nav-left flex-direction">
                <img className='menu_icon' onClick={()=>setsidebar(prev=>prev===false?true:false)} src={menu_icon} alt="icon" />
                <Link to="/"><img className='logo' src={logo} alt="logo" /></Link>
            </div>

            <div className="nav-middle flex-direction">
                <div className="search-box">
                <input type="text" placeholder='Search'/>
                <img src={search} alt="" />
                </div>
            </div>

            <div className="nav-right flex-direction">
                <img src={upload} alt="" />
                <img src={more} alt="" />
                <img src={notification} alt="" />
                <img src={profile} className='user-icon' alt="" />
            </div>
        </nav>
     );
}
 
export default Navbar;