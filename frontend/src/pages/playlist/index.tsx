import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { usePlaylist, useUser } from "../../redux/userSlice";
import PlaylistHeader from "../../components/AlbumPageComponents/PlayListHeader";
import TracksTablePlaylist from "../../components/AlbumsTracksTable/TracksTablePlaylist";


export default function PlaylistPage() {
    const nav = useNavigate()
    const user = useUser()
   
    const {playListId} = useParams()

    const playlists = usePlaylist({id: playListId})

    return <div>
        <PlaylistHeader playList={playlists.currentPlayList}/>
        <TracksTablePlaylist/>
    </div>    
}