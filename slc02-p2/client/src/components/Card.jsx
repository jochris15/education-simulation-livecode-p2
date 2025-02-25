import formatCurrency from "../helpers/currency"
import { useNavigate } from "react-router"
import axios from "axios";
import baseUrl from "../api/baseUrl";
import Toastify from 'toastify-js'

export default function Card({ grocery, fetchGroceries }) {
    const navigate = useNavigate()

    async function handleDelete() {
        try {
            const { data } = await axios.delete(`${baseUrl}/groceries/${grocery.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            fetchGroceries()
            Toastify({
                text: data.message,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#34D399",
                    color: "black",
                    border: "solid #000000",
                    borderRadius: "8px",
                    boxShadow: "2px 2px black"
                },
            }).showToast();
        } catch (error) {
            Toastify({
                text: error.response.data.message,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#F87171",
                    color: "black",
                    border: "solid #000000",
                    borderRadius: "8px",
                    boxShadow: "2px 2px black"
                },
            }).showToast();
        }
    }

    return (
        <>
            <div className="flex flex-col flex-start items-center bg-orange-300 border-2 border-black p-5 rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)] h-full">
                <div className="flex-1">
                    <img
                        src={grocery.imageUrl}
                        alt="grocery image"
                        className="border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer h-full"
                    />
                </div>
                <div className="flex w-full justify-between my-3 items-center">
                    <b>
                        {grocery.title}
                    </b>
                    <span className="bg-orange-400 p-2 rounded-lg text-xs">
                        {grocery.tag}
                    </span>
                </div>
                <hr className="border-black w-full" />
                <div className="flex justify-between mt-4 w-full">
                    <div>
                        <i className="fa-solid fa-tags fa-xl my-5 mr-1"></i><b className="text-green-800 text-lg">{formatCurrency(grocery.price)}</b>
                    </div>
                    <div>
                        <a className="fa-solid fa-trash fa-xl my-5 cursor-pointer mr-5"
                            onClick={handleDelete} />
                        <a className="fa-solid fa-pen-to-square fa-xl my-5 cursor-pointer"
                            onClick={() => navigate(`/update-grocery/${grocery.id}`)} />
                    </div>
                </div>
            </div>
        </>
    )
}