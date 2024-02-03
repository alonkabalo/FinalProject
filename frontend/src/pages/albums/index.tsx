import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect } from "react";
import { useAlbum, getAlbumTracksAction } from "../../redux/spotifySearchSlice";
import { AlbumTracks, Maybe } from "../../@Types";
import AlbumHeader from "../../components/AlbumPageComponents/AlbumHeader";
import AlbumTracksTable from "../../components/AlbumsTracksTable/AlbumTracksTable";


export default function AlbumPage() {
    const { albumId } = useParams()
    const tracks = useSelector<RootState, Maybe<AlbumTracks.Tracks>>(state => state.spotifySearchSlice.albumTracks[albumId!])

    const album = useAlbum({ albumId })
    const nav = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
   
    useEffect(() => {
        if(albumId)
            dispatch(getAlbumTracksAction(albumId))
        else nav("/not-found")
    }, [albumId])

 

    if(!tracks) return null
    if(!tracks.data.album)
        return <div>
                No Album found
        </div>


    return <div>
        <AlbumHeader album={album}/>
        <AlbumTracksTable tracks={tracks} album={album}/>
    </div>    
}