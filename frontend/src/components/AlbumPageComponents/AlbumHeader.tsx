import { SpotifySearch } from "../../@Types";
import { AlbumHeaderStyle } from "./styles";


type AlbumHeaderProps = { album: SpotifySearch.AlbumSearch.Item | undefined  }
export default function AlbumHeader({album} : AlbumHeaderProps) {
    if(!album) return null
    
    return <AlbumHeaderStyle columns={'70% 30%'}>
        <p className="album-name">
            {album.data.name}
        </p>
        <img src={album.data.coverArt.sources[2].url}/>
    </AlbumHeaderStyle>
}