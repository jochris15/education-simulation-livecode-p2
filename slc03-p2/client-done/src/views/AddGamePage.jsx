import { useState } from "react"
import { useNavigate } from 'react-router'
import axios from 'axios'
import Toastify from 'toastify-js'
import url from "../api/baseUrl";

export default function AddGamePage() {
    const [name, setName] = useState("")
    const [gameImg, setGameImg] = useState("")
    const [releaseDate, setReleaseDate] = useState("")
    const [developer, setDeveloper] = useState("")
    const [genre, setGenre] = useState("")
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const dataAdded = { name, gameImg, releaseDate, developer, genre }

            const { data } = await axios.post(`${url}/games`, dataAdded, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })

            Toastify({
                text: `${data.name} has been added`,
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

    return (
        <>
            <div className="p-10">
                <form className="bg-base-300 p-5 rounded-lg" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-5 mt-4">
                        <div>
                            <label className="label">
                                <span className="text-base label-text">Name</span>
                            </label>
                            <input type="text" placeholder="Name" className="w-full input input-bordered input-accent"
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div>
                            <label className="label">
                                <span className="text-base label-text">Game Image (URL)</span>
                            </label>
                            <input type="text" placeholder="Enter Game Image"
                                className="w-full input input-bordered input-accent" onChange={(e) => setGameImg(e.target.value)} />
                        </div>
                        <div>
                            <label className="label">
                                <span className="text-base label-text">Release Date</span>
                            </label>
                            <input type="date" placeholder="date" className="w-full input input-bordered input-accent"
                                onChange={(e) => setReleaseDate(e.target.value)} />
                        </div>
                        <div>
                            <label className="label">
                                <span className="text-base label-text">Developer</span>
                            </label>
                            <input type="text" placeholder="Enter Developer" className="w-full input input-bordered input-accent"
                                onChange={(e) => setDeveloper(e.target.value)} />
                        </div>
                    </div>
                    <div className="mt-5">
                        <label className="label">
                            <span className="text-base label-text">Genre</span>
                        </label>
                        <select className="w-full btn btn-outline btn-accent"
                            onChange={(e) => setGenre(e.target.value)}>
                            <option disabled selected>SELECT GENRE</option>
                            <option value="MOBA">MOBA</option>
                            <option value="FPS">FPS</option>
                            <option value="BR">Battle Royale</option>
                        </select>
                    </div>

                    <button className="w-full btn btn-accent mt-10">Add New Game</button>
                </form>
            </div>
        </>
    )
}