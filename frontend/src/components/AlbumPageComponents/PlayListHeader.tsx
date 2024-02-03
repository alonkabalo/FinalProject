import { ListBulletIcon } from "@radix-ui/react-icons";
import { Maybe, SpotifySearch, TPlaylist } from "../../@Types";
import { AlbumHeaderStyle } from "./styles";


export default function PlaylistHeader({playList} : {playList: Maybe<TPlaylist>}) {
    
    return <AlbumHeaderStyle columns={'70% 30%'}>
        <div className="album-name">
           <div>
              Playlist: {playList?.name}
           </div>
           <div>
           Number of tracks: {playList?.tracks.length}
           </div>
        </div>
        <div className="blue-gradient">
          <ListBulletIcon color="white" style={{width:'100%', height:'100%'}}/>
        </div>
    </AlbumHeaderStyle>
}