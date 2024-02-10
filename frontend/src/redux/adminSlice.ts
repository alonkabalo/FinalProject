import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AlbumTracks, Maybe, SpotifySearch, User } from "../@Types"
import { getAlbumTracks, getAlbumsMetaData, searchAlbums } from "../services/spotifyService"
import { message } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "./store"
import { useEffect, useState } from "react"
import { allUsers, deleteUser } from "../services/userService"
import { isErrorResponse } from "../utils"


export type AdminSlice = {
    allUsers: User[]
    loading:boolean,
    error: string | undefined
}

const initialState: AdminSlice = {
    loading: false,
    allUsers: [],
    error: undefined
}


export const getAllUsers = createAsyncThunk('admin/getAllUsers',
    async () => {
    const response = await allUsers()
    if(isErrorResponse(response)) 
            return response.data
    return response.data
})

export const deleteUserAction = createAsyncThunk('admin/deleteUser',
    async (id: string) => {
    const response = await deleteUser(id)
    if(isErrorResponse(response)) 
            return response.data
    return response.data
})


export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers:  (builder) => {
        builder.addCase(getAllUsers.pending, (state) => {
            state.loading = true
            state.allUsers = []
            state.error = undefined
        })
        builder.addCase(getAllUsers.rejected, (state, action) => {
            state.loading = false
            state.allUsers = []
            state.error = action.error.message

            console.error(action.error.message)
        })
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.loading = false
            state.allUsers = action.payload as any
            state.error = undefined
        })


        builder.addCase(deleteUserAction.pending, (state) => {
            state.loading = true
            state.error = undefined
        })
        builder.addCase(deleteUserAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message

            console.error(action.error.message)
        })
        builder.addCase(deleteUserAction.fulfilled, (state, action) => {
            state.loading = false
            state.allUsers = state.allUsers.filter(u => u._id !== action.payload?._id)
            state.error = undefined
        })
    }
})

export const useManagement = () => {
    const users = useSelector<RootState, User[]>(state => state.adminSlice.allUsers)
    const loading = useSelector<RootState, boolean>(state => state.adminSlice.loading)
    const error = useSelector<RootState, string | undefined>(state => state.adminSlice.error)
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        if(!users || users.length === 0) {
            dispatch(getAllUsers())
        }
    },[])

    const deleteUser = async (id:string) => {
        await dispatch(deleteUserAction(id))
    }

    return {
        users,
        loading,
        deleteUser,
        error
    }
}