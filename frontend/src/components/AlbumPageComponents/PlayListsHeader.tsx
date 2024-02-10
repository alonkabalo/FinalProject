import { ListBulletIcon } from "@radix-ui/react-icons";
import { SpotifySearch } from "../../@Types";
import { AlbumHeaderStyle } from "./styles";


export default function PlaylistsHeader() {
    
    return <AlbumHeaderStyle columns={'70% 30%'}>
        <p className="album-name">
            Playlists
        </p>
        <div className="purple-gradient">
          <ListBulletIcon color="white" style={{width:'100%',height:'100%'}}/>
        </div>
    </AlbumHeaderStyle>
}