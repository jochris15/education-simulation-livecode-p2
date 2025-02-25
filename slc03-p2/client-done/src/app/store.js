import { configureStore } from '@reduxjs/toolkit'
import games from '../features/games/games-slicer'

export default configureStore({
    reducer: {
        games
    }
})