import { Top200 } from "../../@Types";
import Top200TracksCard from "./Top200TracksCard";
import { CardGallery } from "./styles";
import {Children} from "react";
type Top200TracksCardGalleryProps = { tracks : Top200.Top200TrackResponse }

export default function Top200TracksCardGallery({ tracks }: Top200TracksCardGalleryProps) {

    return <CardGallery>
        {Children.toArray(tracks.map(track => <Top200TracksCard track={track}/>))}
    </CardGallery>
}