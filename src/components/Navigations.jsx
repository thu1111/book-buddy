/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */
import {Link} from 'react-router-dom'

const Navigations = ({setToken}) => {
    const token = localStorage.getItem("token"); /*Grabbing local token*/

    const handleLogout = ()=>{ /**/
        localStorage.clear();
        setToken(null); /*reset state token*/
    }
    
    return ( 
        <nav className='navBar'>
        <Link to="/">Home</Link>
        {token?
            (
                <>
                <Link to="/users/me">Account</Link>
                <Link to="/" onClick={()=>handleLogout()}>logout</Link>
                </>
            )
            :
            (
                <>
                <Link to="/users/login">Login</Link>
                <Link to="/users/register">Register</Link>
                </>
            )
        }
        </nav>
     );
}
export default Navigations;


