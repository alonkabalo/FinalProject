import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import { Maybe, SpotifySearch, Top200, User } from "../../@Types"
import { useUser } from "../../redux/userSlice"
import { useEffect, useState } from "react"
import { getTop200Tracks } from "../../services/spotifyService"
import Top200TracksCardGallery from "../../components/Card/CardGallery"
import { searchAlbumsAction } from "../../redux/spotifySearchSlice"
import AlbumsCardGallery from "../../components/Card/AlbumsCardGallery"

export default function Home() {
    const user = useUser()
    const [top200Tracks, setTop200Tracks] = useState<Top200.Top200TrackResponse>([])

    const albumsSearch =  useSelector<RootState, Maybe<SpotifySearch.AlbumSearch.SearchResults>>(state => state.spotifySearchSlice.albums)

    const dispatch = useDispatch<AppDispatch>()
    /*useEffect(() => {
        const fetchTracks = async (country: string) => {
            try {
                const savedTracks = localStorage.getItem(`top_200_tracks_${country}`)
                if(savedTracks) {
                    setTop200Tracks(JSON.parse(savedTracks))
                    return
                }
                const tracks = await getTop200Tracks(country)

                localStorage.setItem(`top_200_tracks_${country}`, JSON.stringify(tracks))
                setTop200Tracks(tracks)
            } catch(e) {
                console.error(e)
            }
        }
        fetchTracks("IL")
    }, [])*/
    useEffect(() => {
        dispatch(searchAlbumsAction("Love"))
      },[])
    

    return <div>
        <b>Home</b>
        {user && <div> Hello {user.name}</div>}
        <div dir="rtl">
            {albumsSearch && <AlbumsCardGallery albums={albumsSearch.albums}/>}
        </div>
    </div>
}