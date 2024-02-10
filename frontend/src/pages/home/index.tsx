import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import { Maybe, SpotifySearch, Top200, User } from "../../@Types"
import { useUser } from "../../redux/userSlice"
import React, { useEffect, useState } from "react"
import { getTop200Tracks } from "../../services/spotifyService"
import Top200TracksCardGallery from "../../components/Card/CardGallery"
import { searchAlbumsAction } from "../../redux/spotifySearchSlice"
import AlbumsCardGallery from "../../components/Card/AlbumsCardGallery"
import axios from "axios"


const collections = ["Most popular", "Top 10 in US", "International", "Vibes"]
export default function Home() {
    const user = useUser()
    const [top200Tracks, setTop200Tracks] = useState<Top200.Top200TrackResponse>([])
    const albumsSearch =  useSelector<RootState, Record<string,Maybe<SpotifySearch.AlbumSearch.SearchResults>>>(state => state.spotifySearchSlice.albums)

    const [keywords,setKeywords] = useState(["Love", "Peace"])

    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(searchAlbumsAction("Love"))
    },[])
    
    useEffect(() => {
        dispatch(searchAlbumsAction("Peace"))
    },[])
    
    useEffect(() => {
        const fetchRandomAlbums = async () => {
            try {
                 const {data} = await axios.get("https://random-word-api.herokuapp.com/word")
                 if(data.length > 0) {
                     await dispatch(searchAlbumsAction(data[0]))
                     setKeywords([...keywords, data[0]])
                 }
            }catch(e) {  }
        }
        fetchRandomAlbums()
        fetchRandomAlbums()
    },[])
    

    return <div>
        <div dir="rtl">
            {albumsSearch && <>
            
            {React.Children.toArray(
                keywords.map((keyword,index) =>   albumsSearch[keyword]?.albums && <>
                <h2 className="header-home" dir="ltr">{collections[index]}</h2>
                <AlbumsCardGallery word={keyword} albums={albumsSearch[keyword]!!.albums}/>
                    <br/>
                </>))}
            </>}
        </div>
    </div>
}