import { SpotifySearch } from "../../@Types";
import { AlbumHeaderStyle } from "../AlbumPageComponents/styles";

import { HeartFilledIcon } from "@radix-ui/react-icons";

export default function UserTableHeader() {
    
    return <AlbumHeaderStyle columns={'70% 30%'}>
        <p className="album-name">
            User Management
        </p>
        <div className="gold-gradient">
        {<i className="fa-solid fa-user"></i> }
        </div>
    </AlbumHeaderStyle>
}