import { SpotifySearch } from "../../@Types";
import { AlbumHeaderStyle } from "./styles";

import { HeartFilledIcon } from "@radix-ui/react-icons";

export default function FavoritesHeader() {
    
    return <AlbumHeaderStyle columns={'70% 30%'}>
        <p className="album-name">
            Favorites
        </p>
        <div className="blue-gradient">
        {<i className="fa-solid fa-heart"></i> }
        </div>
    </AlbumHeaderStyle>
}