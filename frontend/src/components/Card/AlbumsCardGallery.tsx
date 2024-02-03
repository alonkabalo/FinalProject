import { SpotifySearch, Top200 } from "../../@Types";
import AlbumCard from "./AlbumCard";
import { CardGallery } from "./styles";
import {Children} from "react";
type AlbumsCardGalleryProps = { albums : SpotifySearch.AlbumSearch.Albums }

export default function AlbumsCardGallery({ albums }: AlbumsCardGalleryProps) {

    return <CardGallery>
        {Children.toArray(albums.items.map(album => <AlbumCard album={album}/>))}
    </CardGallery>
}