import { createSlice } from '@reduxjs/toolkit'
import axios from "axios"

const initialState = {
    games: [],
    loading: false,
    error: ""
};

export const gamesSlice = createSlice({
    name: "games",
    initialState,
    reducers: {
        fetchPending(state) {
            state.games = []
            state.loading = true
            state.error = ""
        },
        fetchSuccess(state, action) {
            state.games = action.payload
            state.loading = false
            state.error = ""
        },
        fetchReject(state, action) {
            state.games = []
            state.loading = false
            state.error = action.payload
        },
    }
})

export const { fetchPending, fetchSuccess, fetchReject } = gamesSlice.actions;

export const fetchAsync = (url) => async (dispatch) => {
    try {
        dispatch(fetchPending())

        const { data } = await axios.get(`${url}/games`, {
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            }
        });

        dispatch(fetchSuccess(data))
    } catch (error) {
        dispatch(fetchReject(error.message))
    }
}

export default gamesSlice.reducer;