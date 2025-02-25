import { useEffect } from 'react'
import Card from '../components/Card'
import gearLoad from '../components/assets/Gear-0.2s-264px.svg'
import { useDispatch, useSelector } from "react-redux";
import { fetchAsync } from "../features/games/games-slicer";
import url from "../api/baseUrl";

export default function HomePage() {
    const { games, loading, error } = useSelector((state) => state.games);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAsync(url))
    }, [])

    if (loading) {
        return (
            <>
                <div className="mt-32 flex justify-center items-center">
                    <img src={gearLoad} />
                </div>
            </>
        )
    }

    return (
        <>
            {!error && games.length > 0 && (
                <div id="PAGE-HOME" className="p-3">
                    <main className="grid grid-cols-2 gap-5 px-10 my-8">
                        {games.map(game => {
                            return (
                                <Card game={game} key={game.id} url={url} />
                            )
                        })}
                    </main>
                </div>
            )}
        </>
    )
}