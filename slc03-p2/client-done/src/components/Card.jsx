import axios from 'axios'
import Toastify from 'toastify-js'
import { useDispatch } from "react-redux";
import { fetchAsync } from "../features/games/games-slicer";

export default function Card({ game, url }) {
    const dispatch = useDispatch();

    async function handleDelete(id) {
        try {
            const { data } = await axios.delete(`${url}/games/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })

            Toastify({
                text: data.message,
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

            dispatch(fetchAsync(url))
        } catch (error) {
            Toastify({
                text: error.response.data.message,
                duration: 2000,
                newWindow: true,
                close: true,
                gravity: "top",
                position: "left",
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
            <div className="card bg-base-300 shadow flex flex-row">
                <figure className="flex flex-col">
                    <img src={game.gameImg}
                        alt="product image" className="max-w-sm h-3/4 rounded-lg shadow ml-5" />
                </figure>
                <div className="card-body flex-1">
                    <b>{game.name}</b>
                    <hr></hr>
                    <div>
                        <i className="fa-solid fa-gamepad"></i> {game.genre}
                    </div>
                    <div>
                        <i className="fa-brands fa-dev"></i> {game.developer}
                    </div>
                    <div>
                        <i className="fa-solid fa-calendar-days"></i> {new Date(game.releaseDate).toLocaleDateString('id-ID')}
                    </div>
                    <button onClick={() => handleDelete(game.id)} className="btn btn-error btn-sm w-full mt-2">Delete</button>
                </div>
            </div>
        </>
    )
}