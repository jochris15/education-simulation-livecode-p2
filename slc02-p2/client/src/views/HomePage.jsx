import loadingGif from '../assets/loading.svg'
import { useEffect, useState } from "react"
import axios from "axios"
import baseUrl from "../api/baseUrl"
import Toastify from 'toastify-js'
import Card from '../components/Card'

export default function HomePage() {
    const [groceries, setGroceries] = useState([])
    const [loading, setLoading] = useState(false)

    async function fetchGroceries() {
        try {
            setLoading(true)
            const { data } = await axios.get(`${baseUrl}/groceries`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            setGroceries(data)
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
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchGroceries()
    }, [])

    return (
        <>
            {/* Home */}
            <div className="mt-8">
                {loading ? (
                    <>
                        <div className="flex justify-center w-screen h-screen">
                            <img src={loadingGif} className="w-1/4" />
                        </div>
                    </>
                ) : (
                    <>
                        {/* Main Product */}
                        <div
                            id="PAGE-HOME"
                            className="min-h-screen flex items-center justify-center"
                        >
                            <main className="my-8 bg-white grid grid-cols-4 gap-5">
                                {groceries.map((grocery) => {
                                    return (
                                        <Card key={grocery.id} grocery={grocery} fetchGroceries={fetchGroceries} />
                                    )
                                })}
                            </main>
                        </div>
                    </>
                )}
            </div>
        </>

    )
}