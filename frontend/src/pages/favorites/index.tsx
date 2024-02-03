import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect } from "react";
import { useAlbum, getAlbumTracksAction } from "../../redux/spotifySearchSlice";
import { AlbumTracks, Maybe } from "../../@Types";
import AlbumHeader from "../../components/AlbumPageComponents/AlbumHeader";
import AlbumTracksTable from "../../components/AlbumsTracksTable/AlbumTracksTable";
import { useUser } from "../../redux/userSlice";
import FavoritesHeader from "../../components/AlbumPageComponents/FavoritesHeader";
import TracksTableFavorites from "../../components/AlbumsTracksTable/TracksTableFavorites";


export default function FavoritesPage() {
    const nav = useNavigate()
    const user = useUser()
   
    useEffect(() => {
        if(!user)
             nav("/auth/signin")
    }, [user])

 

    return <div>
        <FavoritesHeader/>
        <TracksTableFavorites/>
    </div>    
}