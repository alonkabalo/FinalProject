import React, { useContext, useState } from "react"
import { Maybe } from "../@Types"

export interface IPlaylistsContext {
    openPlaylists: (track: {id:string,name:string}) => void
    closePlaylists: () => void
    addToPlayListTrack: Maybe<{id:string,name:String}>
    addNewPlaylistOpen: boolean
    closeAddNewPlaylistDialog: () => void
    openAddNewPlaylistDialog: () => void
}


const PlayListsContext = React.createContext<IPlaylistsContext|null>(null)
export const PlaylistsContextProvider = ({children} : {children: React.ReactNode}) => {
    const [addToPlayListTrack,setAddToPlayListTrack] = useState<Maybe<{id:string, name:string}>>()
    const [addNewPlaylistOpen,setAddNewPlaylistOpen] = useState<boolean>(false)
    const openPlaylists = ({id,name} :{id:string,name:string})  =>{
        setAddToPlayListTrack({id ,name})
    }
    const closePlaylists = () => {
        setAddToPlayListTrack(undefined)
    }

    const openAddNewPlaylistDialog = () => {
        setAddNewPlaylistOpen(true) 
    }
    const closeAddNewPlaylistDialog = () => {
        setAddNewPlaylistOpen(false) 
    }
    return <PlayListsContext.Provider value={{
        addToPlayListTrack,addNewPlaylistOpen,closeAddNewPlaylistDialog, openAddNewPlaylistDialog, openPlaylists,closePlaylists}}>
        {children}
    </PlayListsContext.Provider>
}

export const usePlaylistsDialog = () => {
    const context = useContext(PlayListsContext)
    if(!context) {
        throw new Error("Playlists context not provided")
    }
    return context
}