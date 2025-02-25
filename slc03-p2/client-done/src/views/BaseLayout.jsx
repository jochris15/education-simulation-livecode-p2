import { Outlet, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import Toastify from 'toastify-js'

export default function BaseLayout() {
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.token) {
            Toastify({
                text: "Please login first",
                duration: 2000,
                newWindow: true,
                close: true,
                gravity: "bottom",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "#EF4C54",
                    color: "#17202A",
                    boxShadow: "0 5px 10px black",
                    fontWeight: "bold"
                }
            }).showToast();
            navigate('/')
        }
    }, [])
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}