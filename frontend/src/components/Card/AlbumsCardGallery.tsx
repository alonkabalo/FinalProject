import { SpotifySearch, Top200 } from "../../@Types";
import AlbumCard from "./AlbumCard";
import { CardGallery } from "./styles";
import {Children} from "react";
type AlbumsCardGalleryProps = { albums : SpotifySearch.AlbumSearch.Albums ,word: string}

export default function AlbumsCardGallery({ albums, word  }: AlbumsCardGalleryProps) {

    return <CardGallery>
        {Children.toArray(albums.items.map(album => <AlbumCard word={word} album={album}/>))}
    </CardGallery>
}