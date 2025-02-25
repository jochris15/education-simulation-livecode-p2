import axios from "axios"
import baseUrl from "../api/baseUrl"
import Toastify from 'toastify-js'
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

export default function EditPage() {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState(0)
    const [tag, setTag] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const { id } = useParams()

    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const body = { title, price: +price, tag, imageUrl }
            const { data } = await axios.put(`${baseUrl}/groceries/${id}`, body, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            navigate('/')
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

    async function fetchGrocery() {
        try {
            const { data } = await axios.get(`${baseUrl}/groceries/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            setTitle(data.title)
            setPrice(data.price)
            setTag(data.tag)
            setImageUrl(data.imageUrl)
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

    useEffect(() => {
        fetchGrocery()
    }, [])

    return (
        <>
            {/* EditPage */}
            <form className="p-10 mt-5 border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-orange-300" onSubmit={handleSubmit}>
                <h1 className="text-2xl font-bold text-center mb-4">Edit Grocery</h1>
                <div className="grid grid-cols-2 gap-6 my-10">
                    <div>
                        <label className="label">
                            <span className="font-bold">Title</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Title"
                            className="rounded-lg w-full px-3 py-2 border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="font-bold">Price</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Enter Price"
                            className="rounded-lg w-full px-3 py-2 border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}

                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="font-bold">Tag</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Tag"
                            className="rounded-lg w-full px-3 py-2 border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                            onChange={(e) => setTag(e.target.value)}
                            value={tag}
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="font-bold">Image (URL)</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Image URL"
                            className="rounded-lg w-full px-3 py-2 border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                            onChange={(e) => setImageUrl(e.target.value)}
                            value={imageUrl}
                        />
                    </div>
                </div>
                <div className="mt-5">
                    <button className="w-full mt-5 py-2 px-4 border-2 border-black rounded-lg text-sm font-medium text-white bg-gray-700 hover:bg-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                        Edit
                    </button>
                </div>
            </form>
        </>

    )
}