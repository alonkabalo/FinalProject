import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AlbumTracks, Maybe, SpotifySearch } from "../@Types"
import { getAlbumTracks, getAlbumsMetaData, searchAlbums } from "../services/spotifyService"
import { message } from "antd"
import { useSelector } from "react-redux"
import { RootState } from "./store"
import { useEffect, useState } from "react"


export type SpotifySlice = {
    albums:Record<string,  SpotifySearch.AlbumSearch.SearchResults | undefined>,
    albumTracks:  Record<string,  AlbumTracks.Tracks>
    loading:boolean,
    error: string | undefined
}

const initialState: SpotifySlice = {
    albums: {},
    loading: false,
    albumTracks: {},
    error: undefined
}

export const useAlbum = ({albumId, word} : {albumId:string | undefined, word:string | undefined}) => {
    const albumsSearch =  useSelector<RootState, Record<string,Maybe<SpotifySearch.AlbumSearch.SearchResults>>>(state => state.spotifySearchSlice.albums)
    
    const [album, setAlbum] = useState<SpotifySearch.AlbumSearch.Item | undefined>()
    const getId = (uri:string) => {
        const id = uri.split(":")[2]
        console.log(id)
        return id
    } 

    useEffect(() => {

        const fetchAlbum = async () => {
            if(!word)return
            const existingAlbum = albumsSearch[word]?.albums.items.find(album => getId(album.data.uri) === albumId)
            if(existingAlbum)
                setAlbum(existingAlbum)
            else {
                const metadata = await getAlbumsMetaData(albumId!)
                setAlbum({data: metadata.data.album})
            }
        }
        
        if(albumId)
            fetchAlbum()
                
    },[albumId,word])
    return album 
}

export const searchAlbumsAction = createAsyncThunk('spotifySearch/searchAlbums',
    async (query:string) => {
        const existingAlbums = localStorage.getItem(`albums/${query}`)
        if(existingAlbums) {
            return {
                query,
                albums: JSON.parse(existingAlbums) as SpotifySearch.AlbumSearch.SearchResults
            }
        }
        const albums = await searchAlbums(query)
        localStorage.setItem(`albums/${query}`, JSON.stringify(albums))
        return {
            query,
            albums
        }
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
           // state.albums = undefined
            state.error = undefined
        })
        builder.addCase(searchAlbumsAction.rejected, (state, action) => {
            state.loading = false
            //state.albums = undefined
            state.error = action.error.message

            message.error(action.error.message)
        })
        builder.addCase(searchAlbumsAction.fulfilled, (state, action) => {
            state.loading = false
            state.albums = {
                ...state.albums,
                [action.payload.query]: action.payload.albums
            }
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