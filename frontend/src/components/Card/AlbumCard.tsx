import { useNavigate } from "react-router";
import { SpotifySearch, Top200 } from "../../@Types";
import { StyledCard } from "./styles";

type AlbumCardProps = { album : SpotifySearch.AlbumSearch.Item,word:string }
export default function Top200TracksCard({album, word}: AlbumCardProps) {
    const nav = useNavigate()

    const navToTracksPage = () => {
        const albumId = album.data.uri.split(":")[2]
        nav(`/albums/${albumId}/${word}`)
    }

    return <StyledCard onClick={navToTracksPage}>
            <img src={album.data.coverArt.sources[0]?.url}/>
            <label className="title">
                {album.data.name}
                </label>
            <label className="desc">
                {/* KHALID, LIl Wayne... */}
                {album.data.artists.items.map(item => item.profile.name).join(",")}
            </label>
    </StyledCard>
}