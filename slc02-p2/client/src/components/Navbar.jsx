import { NavLink, useNavigate } from "react-router"

export default function Navbar() {
    const navigate = useNavigate()

    function handleLogout() {
        localStorage.clear()
        navigate('/login')
    }

    return (
        <>
            <nav className="sticky top-0 z-10 p-3 bg-orange-300 border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)] flex justify-between items-center">
                <div className="flex justify-center">
                    <NavLink to="/" className={({ isActive }) =>
                        isActive ? "text-2xl font-bold px-6 cursor-pointer underline decoration-orange-500" : "text-2xl font-bold px-6 cursor-pointer"
                    }>
                        <span>Home</span>
                    </NavLink>
                    <NavLink to="/add-grocery" className={({ isActive }) =>
                        isActive ? "text-2xl font-bold px-6 cursor-pointer underline decoration-orange-500" : "text-2xl font-bold px-6 cursor-pointer"
                    }>
                        <span>Add Grocery</span>
                    </NavLink>
                </div>
                <a onClick={handleLogout} className="text-2xl font-bold px-6 cursor-pointer text-red-700">
                    <span>Logout</span>
                </a>
            </nav>
        </>
    )
}