import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Maybe, SignInForm, TPlaylist, Track, User } from "../@Types"
import * as userAPI from '../services/userService'
import { isErrorResponse, wait } from "../utils"
import { message } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "./store"
import { getTracksByIds } from "../services/spotifyService"
import { useEffect, useState } from "react"
import { uploadFile } from "../services/fileUploadservice"

type UserSlice = {
    user: Maybe<User>,
    token: string | undefined | null
    loading:boolean,
    error: string | undefined
}

const initialState : UserSlice = {
    user : undefined,
    token : localStorage.getItem('token'),
    loading: false,
    error: undefined
}

export const signInUser = createAsyncThunk(
    'users/signInUser',
    async (form: SignInForm, thunkAPI) => {
        await wait()
        const response = await userAPI.signIn(form)
        if(isErrorResponse(response)) 
            return undefined
        return response.data!
    }
)

export const getUser = createAsyncThunk(
    'users/getUser',
    async (thunkAPI) => {
        const response = await userAPI.me()
        if(isErrorResponse(response)) 
            return undefined
        if(response.data && response.data?.playlists === undefined)
            response.data.playlists = []
        return response.data!
    }
)


export const likeTrack = createAsyncThunk(
    'users/likeTrack',
    async (id: string,thunkAPI) => {
        const response = await userAPI.likeTrack(id)
        if(isErrorResponse(response)) 
            return undefined
        return response.data!
    }
)

export const updateUserImage = createAsyncThunk(
    'users/updateUserImage',
    async (data: {imageFile: File, userEmail: string},thunkAPI) => {
        const path = `images/${data.userEmail}/profile.png`
        const image = await uploadFile(path , data.imageFile)
        const updateObject = {image}
        const response = await userAPI.updateUser(updateObject)
        if(isErrorResponse(response)) 
            return undefined
        return response.data!
    }
)

export const createPlaylist = createAsyncThunk(
    'users/createPlaylist',
    async (data: {name:string, tracks: string[]},thunkAPI) => {
        const response = await userAPI.createPlaylist(data.name, data.tracks)
        if(isErrorResponse(response)) 
            return undefined
        return response.data!
    }
)


export const deletePlaylist = createAsyncThunk(
    'users/deletePlaylist',
    async (data: {playListId:string},thunkAPI) => {
        const response = await userAPI.deletePlaylist(data.playListId)
        if(isErrorResponse(response)) 
            return undefined
        return response.data!
    }
)



export const addTrackToPlaylist = createAsyncThunk(
    'users/addTrackToPlaylist',
    async (data: {playListId:string, trackId: string},thunkAPI) => {
        const response = await userAPI.addTrackToPlaylist(data.playListId, data.trackId)
        if(isErrorResponse(response)) 
            return undefined
        return response.data!
    }
)


export const deleteTrackFromPlaylist = createAsyncThunk(
    'users/deleteTrackToPlaylist',
    async (data: {playListId:string, trackId: string},thunkAPI) => {
        const response = await userAPI.deleteTrackFromPlaylist(data.playListId, data.trackId)
        if(isErrorResponse(response)) 
            return undefined
        return {
            ...response.data!,
            trackId:data.trackId
        }
    }
)



export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        signOut: (state) => {
            state.token = undefined
            state.user = undefined
            localStorage.removeItem('token')
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signInUser.pending, (state) => {
            state.loading = true
            state.user = undefined
            state.token = undefined
        })
        builder.addCase(signInUser.rejected, (state, action) => {
            state.loading = false
            state.user = undefined
            state.token = undefined
            state.error = action.error.message

            message.error(action.error.message)
        })
        builder.addCase(signInUser.fulfilled, (state, action) => {
            state.loading = false
            state.token = action.payload?.access_token
            if(action.payload)
                localStorage.setItem('token', action.payload.access_token)


            state.error = undefined
        })
      
        builder.addCase(getUser.pending, (state) => {
            state.loading = true
            state.user = undefined
        })
        builder.addCase(getUser.rejected, (state, action) => {
            state.loading = false
            state.user = null
            state.error = action.error.message
        })
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload

            message.success(`Signed in as ${action.payload?.name}`)
            state.error = undefined
        })


              
        builder.addCase(updateUserImage.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateUserImage.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        builder.addCase(updateUserImage.fulfilled, (state, action) => {
            state.loading = false
            if( action.payload)
                state.user = {...state.user, image: action.payload.image} as User
            message.success(`Successfully updated personal info`)
            state.error = undefined
        })


        builder.addCase(likeTrack.pending, (state) => {
            state.loading = true
        })
        builder.addCase(likeTrack.rejected, (state, action) => {
            state.loading = false
            message.error(action.error.message)
            state.error = action.error.message
        })
        builder.addCase(likeTrack.fulfilled, (state, action) => {
            state.loading = false
            if(state.user && action.payload) {
                state.user = {...state.user, favorites:action.payload }
            }
            message.success(`Track added to favorites`)
            state.error = undefined
        })

        builder.addCase(createPlaylist.pending, (state) => {
            state.loading = true
        })
        builder.addCase(createPlaylist.rejected, (state, action) => {
            state.loading = false
            message.error(action.error.message)
            state.error = action.error.message
        })
        builder.addCase(createPlaylist.fulfilled, (state, action) => {
            state.loading = false
            if(state.user && action.payload) {
                state.user = {...state.user, playlists:[...state.user.playlists,action.payload]}
                message.success(`New playlist created with name ${action.payload.name}`)
            }
            state.error = undefined
        })


        builder.addCase(deletePlaylist.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deletePlaylist.rejected, (state, action) => {
            state.loading = false
            message.error(action.error.message)
            state.error = action.error.message
        })
        builder.addCase(deletePlaylist.fulfilled, (state, action) => {
            state.loading = false
            if(state.user && action.payload) {
                const playlists = state.user.playlists
                const pid_index = playlists.findIndex( p => p._id === action.payload?._id)
                if(pid_index !== -1) {
                    playlists.splice(pid_index, 1)
                    state.user = {...state.user, playlists:[...playlists] as any }
                    message.success(`Playlist deleted ${action.payload.name}`)
                }
            }
            state.error = undefined
        })


        builder.addCase(addTrackToPlaylist.pending, (state) => {
            state.loading = true
        })
        builder.addCase(addTrackToPlaylist.rejected, (state, action) => {
            state.loading = false
            message.error(action.error.message)
            state.error = action.error.message
        })
        builder.addCase(addTrackToPlaylist.fulfilled, (state, action) => {
            state.loading = false
            if(state.user && action.payload) {
                const playlists = state.user.playlists
                const pIndex = playlists.findIndex(p => p._id === action.payload?._id)
                if(pIndex!==-1) {
                    playlists.splice(pIndex, 1)
                    playlists.push(action.payload)
                }
                state.user = {...state.user, playlists}
                message.success(`Added track to playlist ${action.payload.name}`)
            }
            state.error = undefined
        })


        builder.addCase(deleteTrackFromPlaylist.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteTrackFromPlaylist.rejected, (state, action) => {
            state.loading = false
            message.error(action.error.message)
            state.error = action.error.message
        })
        builder.addCase(deleteTrackFromPlaylist.fulfilled, (state, action) => {
            state.loading = false
            if(state.user && action.payload) {
                const playlists = state.user.playlists
                const playlist = playlists.find(p => p._id === action.payload?._id)
                if(playlist) {
                    const track_index = playlist.tracks.findIndex(track => track === action.payload?.trackId)
                    if(track_index !== -1) {
                        playlist.tracks.splice(track_index, 1)
                        const pIndex = playlists.findIndex(p => p._id === action.payload?._id)
                        if(pIndex!==-1) {
                            playlists.splice(pIndex, 1)
                            playlists.push(action.payload)
                        }
                        state.user = {...state.user, playlists }
                    }
                    message.success(`Deleted track from playlist ${action.payload.name}`)
                }
            }
            state.error = undefined
        })

        // TODO: Delete playlist, add/delete track on playlist
        
    }
})

export const useUser: () => Maybe<User> = () =>  useSelector<RootState, Maybe<User>>(state => state.userSlice.user)



export const usePlaylist = ({id}: {id:string | undefined}) => {
    const user = useUser()
    const dispatch = useDispatch<AppDispatch>()
    const [playlistTracks,setPlaylistTracks] = useState<Track[]>([])
    const [currentPlayList,setCurrentPlayList] = useState<Maybe<TPlaylist>>()

    useEffect(() => {
        if(user && user) {
            const playlists = user.playlists 
            const playlist = playlists.find(p => p._id === id)
            if(!playlist)return
            setCurrentPlayList(playlist)
        }

    },[id, user])
    return {
        playlistTracks,
        currentPlayList,
        getPlaylistTracksData: async () => {
            if(!user) return []
            const playlists = user.playlists
            const playlist = playlists.find(p => p._id === id)
            if(!playlist) return []
            const { tracks} = await getTracksByIds(playlist.tracks)
            setPlaylistTracks(tracks)
            return tracks
        },
        addToPlaylist: (playListId:string, trackId:string) => {
           dispatch(addTrackToPlaylist({playListId, trackId}))
        },
        removeFromPlaylist: async (playListId:string, trackId:string) => {
           await dispatch(deleteTrackFromPlaylist({playListId, trackId}))
         },
         createPlayList: async (name:string, tracks:string[]) => {
            await dispatch(createPlaylist({name, tracks}))
         },
         deletePlayList: async (playListId:string | undefined = id) => {
            if(!playListId)return
            await dispatch(deletePlaylist({playListId}))
        },
        likeTrack: (id:string) => {
            dispatch(likeTrack(id))
        },
        isFavorite:(id:string) => {
            return user && user.favorites.indexOf(id) !== -1
        }
    }
}

export const useFavorites = () => {
    const user = useUser()
    const dispatch = useDispatch<AppDispatch>()
    const [favoriteTracks,setFavoriteTracks] = useState<Track[]>([])
    return {
        favoriteTracks,
        getFavoriteTracksData: async () => {
            if(!user) return []
            const favorites = user.favorites
            const { tracks} = await getTracksByIds(favorites)
            setFavoriteTracks(tracks)
            return tracks
        },
        likeTrack: (id:string) => {
            dispatch(likeTrack(id))
        },
        isFavorite:(id:string) => {
            return user && user.favorites.indexOf(id) !== -1
        }
    }
}


const { signOut } = userSlice.actions
export {signOut}