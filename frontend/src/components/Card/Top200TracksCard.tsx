import { Top200 } from "../../@Types";
import { StyledCard } from "./styles";

type Top200TracksCardProps = { track : Top200.Top200TrackResult }
export default function Top200TracksCard({track}: Top200TracksCardProps) {
    return <StyledCard>
            <img src={track.trackMetadata.displayImageUri}/>
            <label className="title">
                {track.trackMetadata.trackName}
                </label>
            <label className="desc">
                {track.trackMetadata.labels.map(label => label.name).join(",") + ","  + track.trackMetadata.releaseDate}
            </label>
            
    </StyledCard>
}