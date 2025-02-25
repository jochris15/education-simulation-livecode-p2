import { Link, useNavigate } from 'react-router'
import logo from './assets/hacktiv-esport.png'
import Toastify from 'toastify-js'

export default function Navbar() {
    const navigate = useNavigate()

    function handleLogout() {
        Toastify({
            text: "Success logout",
            duration: 2000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "left",
            stopOnFocus: true,
            style: {
                background: "#00B29F",
                color: "#17202A",
                boxShadow: "0 5px 10px black",
                fontWeight: "bold"
            }
        }).showToast();
        localStorage.clear()
        navigate('/login')
    }

    return (
        <>
            <nav className="navbar sticky top-0 z-10 p-3 bg-base-300 shadow">
                <div className="navbar-start">
                    <Link to="/" className="text-2xl font-bold px-6">
                        <img src={logo} className='w-1/2' />
                    </Link>
                </div>
                <div className="navbar-end">
                </div>
                <div className="navbar-end">
                    <Link to='/add' className="btn btn-accent btn-sm mx-1">Add Game</Link>
                    <Link to='/login' className="btn btn-neutral btn-sm mx-1">
                        Login
                    </Link>
                    <a className="btn btn-error btn-sm mx-1" onClick={handleLogout}>
                        Logout
                    </a>
                </div>
            </nav>
        </>
    )
}