import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AlbumTracks, Maybe, SpotifySearch } from "../@Types"
import { getAlbumTracks, getAlbumsMetaData, searchAlbums } from "../services/spotifyService"
import { message } from "antd"
import { useSelector } from "react-redux"
import { RootState } from "./store"
import { useEffect, useState } from "react"


export type SpotifySlice = {
    albums: SpotifySearch.AlbumSearch.SearchResults | undefined
    albumTracks:  Record<string,  AlbumTracks.Tracks>
    loading:boolean,
    error: string | undefined
}

const initialState: SpotifySlice = {
    albums: undefined,
    loading: false,
    albumTracks: {},
    error: undefined
}

export const useAlbum = ({albumId} : {albumId:string | undefined}) => {
    const albumsSearch =  useSelector<RootState, Maybe<SpotifySearch.AlbumSearch.SearchResults>>(state => state.spotifySearchSlice.albums)
    
    const [album, setAlbum] = useState<SpotifySearch.AlbumSearch.Item | undefined>()
    const getId = (uri:string) => {
        const id = uri.split(":")[2]
        console.log(id)
        return id
    } 

    useEffect(() => {

        const fetchAlbum = async () => {
            const existingAlbum = albumsSearch?.albums?.items.find(album => getId(album.data.uri) === albumId)
            if(existingAlbum)
                setAlbum(existingAlbum)
            else {
                const metadata = await getAlbumsMetaData(albumId!)
                setAlbum({data: metadata.data.album})
            }
        }
        
        if(albumId)
            fetchAlbum()
                
    },[albumId])
    return album 
}

export const searchAlbumsAction = createAsyncThunk('spotifySearch/searchAlbums',
    async (query:string) => {
        const existingAlbums = localStorage.getItem(`albums/${query}`)
        if(existingAlbums) {
            return JSON.parse(existingAlbums) as SpotifySearch.AlbumSearch.SearchResults
        }
        const albums = await searchAlbums(query)
        localStorage.setItem(`albums/${query}`, JSON.stringify(albums))
        return albums
})

export const getAlbumTracksAction = createAsyncThunk('spotifySearch/getAlbumTracks',
    async (albumId:string) => {
    const existingAlbumTracks = localStorage.getItem(`album-tracks/${albumId}`)
    if(existingAlbumTracks) {
        return {
            albumId,
            albumTracks: JSON.parse(existingAlbumTracks) as AlbumTracks.Tracks
        }
    }
    const tracks = await getAlbumTracks(albumId)
    localStorage.setItem(`album-tracks/${albumId}`, JSON.stringify(tracks))
    return  {
        albumId,
        albumTracks:tracks
    }
})


export const spotifySearchSlice = createSlice({
    name: 'spotifySearch',
    initialState,
    reducers: {
  
    },
    extraReducers:  (builder) => {
        builder.addCase(searchAlbumsAction.pending, (state) => {
            state.loading = true
            state.albums = undefined
            state.error = undefined
        })
        builder.addCase(searchAlbumsAction.rejected, (state, action) => {
            state.loading = false
            state.albums = undefined
            state.error = action.error.message

            message.error(action.error.message)
        })
        builder.addCase(searchAlbumsAction.fulfilled, (state, action) => {
            state.loading = false
            state.albums = action.payload
            state.error = undefined
        })

        builder.addCase(getAlbumTracksAction.pending, (state) => {
            state.loading = true
            state.error = undefined
        })
        builder.addCase(getAlbumTracksAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
            message.error(action.error.message)
        })
        builder.addCase(getAlbumTracksAction.fulfilled, (state, action) => {
            state.loading = false
            const oldMap = state.albumTracks

            if(Object.entries(oldMap).length < 1) {
                state.albumTracks = {
                    [action.payload.albumId] : action.payload.albumTracks
                }
            }else {
                state.albumTracks = {
                    ...state.albumTracks,
                    [action.payload.albumId] : action.payload.albumTracks
                }
            }
            state.error = undefined
        })
    }
})