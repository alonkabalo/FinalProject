import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { usePlaylist, useUser } from "../../redux/userSlice";
import PlaylistHeader from "../../components/AlbumPageComponents/PlayListHeader";
import TracksTablePlaylist from "../../components/AlbumsTracksTable/TracksTablePlaylist";
import PlaylistsHeader from "../../components/AlbumPageComponents/PlayListsHeader";
import PlaylistList from "../../components/PlaylistList/PlaylistList";
import { Separator } from "@radix-ui/themes";


export default function PlaylistListPage() {
    const nav = useNavigate()
    const user = useUser()
   
    const {playListId} = useParams()

    const playlists = usePlaylist({id: playListId})

    return <div>
        <PlaylistsHeader/>
        <Separator orientation="horizontal" color='gold' style={{width:'100%'}} my={'8'}/>
        <PlaylistList/>
    </div>    
}