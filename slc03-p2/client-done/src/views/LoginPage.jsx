import { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from 'axios'
import { useNavigate } from 'react-router'
import Toastify from 'toastify-js'
import logo from '../components/assets/hacktiv-esport.png'
import url from "../api/baseUrl";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    async function handleLogin(e) {
        e.preventDefault()
        try {
            const addedData = { email, password }
            const { data } = await axios.post(`${url}/login`, addedData)
            localStorage.setItem("token", data.access_token)
            Toastify({
                text: "Success login",
                duration: 2000,
                newWindow: true,
                close: true,
                gravity: "bottom",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "#00B29F",
                    color: "#17202A",
                    boxShadow: "0 5px 10px black",
                    fontWeight: "bold"
                }
            }).showToast();
            navigate('/')
        } catch (error) {
            Toastify({
                text: error.response.data.message,
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
        }
    }

    useEffect(() => {
        if (localStorage.token) {
            Toastify({
                text: "You already logged in",
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
            <div className="relative flex flex-col justify-center h-[85dvh] overflow-hidden bg-base-100 mt-10">
                <div className="w-full p-6 m-auto rounded-lg shadow-md lg:max-w-lg bg-base-300">
                    <div className="flex justify-center mb-5 mr-5">
                        <img src={logo} className="w-1/2" />
                    </div>
                    <h1 className="text-3xl font-semibold text-center text-accent">
                        Log In
                    </h1>
                    <form className="space-y-4">
                        <div>
                            <label className="label">
                                <span className="text-base label-text">Email</span>
                            </label>
                            <input type="text" placeholder="Enter Email" className="w-full input input-bordered input-accent"
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label className="label">
                                <span className="text-base label-text">Password</span>
                            </label>
                            <input type="password" placeholder="Enter Password"
                                className="w-full input input-bordered input-accent"
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div>
                            <button onClick={handleLogin} className="btn btn-accent w-full mt-5">Log In</button>
                        </div>
                    </form>
                    <div className="divider divider-accent mt-7">OR</div>
                    <p className="text-center">Don't have any account ? Click <Link to='/register' className="underline">here</Link> to register</p>
                </div>
            </div>
        </>
    )
}