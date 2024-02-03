import styled from "@emotion/styled";
import { Maybe, SpotifySearch } from "../../@Types";
import AlbumTracksTable, { Seconds } from "../AlbumsTracksTable/AlbumTracksTable";
import { Flex, Grid, Separator } from "@radix-ui/themes";
import { useCallback } from "react";
import TrackDropDownMenu from "../TrackDropDownMenu/TrackDropDownMenu";
import { usePlaylistsDialog } from "../../context/PlaylistsContext";
import { PRIMARY_GREEN } from "../../utils";
import { useFavorites } from "../../redux/userSlice";


const ResultsGrid = styled(Grid)`
    max-width:80%;

.result-list {
    max-height:350px;
    overflow-y:scroll;
        ::-webkit-scrollbar {
        height: 10px;
    }
    ::-webkit-scrollbar-track {
        background: rgba(0,0,0,0.55); 
    }
    ::-webkit-scrollbar-thumb {
    background: #888; 
    border-radius: 5px;
    }
    ::-webkit-scrollbar-thumb:hover {
    background: #555; 
    }
}

.open-podcast {
    &:hover {
        filter: brightness(85%);
        cursor:pointer;
    }
}
.description {
    font-size:12px;
    color:gray;
}
.album-coverArt {
    width:50px;
    height:50px;
}

`

const TrackResults = ({tracks} : {tracks: SpotifySearch.MultiSearch.Track[]}) => {
    const {openPlaylists} = usePlaylistsDialog()
    const favorites = useFavorites()
    const TrackRow = useCallback(({data} : {data: SpotifySearch.MultiSearch.Data9}) =>  {
    const trackId = data.uri.split(":")[2]
    return <Flex
    direction={'column'}
    key={data.uri}>
    <Flex 
    justify={'between'}
    px={'2'}
    direction='row' className="result-row">
        <Flex direction={'row'} gap={'4'}>
        <img className="album-coverArt" src={(data.albumOfTrack.coverArt.sources ?? [])[0]?.url}/> 
        <Flex direction={'column'}>
            <span>{data.name}</span>
            <span className="description">{data.artists.items.map(artist => artist.profile.name).join(',')}</span>
        </Flex>
       </Flex>
    <Flex direction={'row'} gap={'4'} align={'center'}>
    <div><Seconds millis={data.duration.totalMilliseconds}/></div>
       <TrackDropDownMenu
        addToPlaylist={() => {
        openPlaylists({id: trackId,name:data.name})
        }}
        track={{...data, url: `https://open.spotify.com/track/${trackId}`}}/>
          <div  
            onClick={() => favorites.likeTrack(trackId)}>
                {favorites.isFavorite(trackId) ? <i className="fa-solid fa-heart" style={{color:PRIMARY_GREEN}}></i> : <i className="fa-regular fa-heart"></i>}
            </div>
    </Flex>
       
    </Flex>
    <Separator orientation="horizontal" color='brown' style={{width:'100%'}} my={'4'}/>
    </Flex>
    },[favorites])
   return <ResultsGrid rows={'1fr'} columns={'70% 30%'} gap={'8'}>
   
    
    <div className="side">
        <h2>Tracks</h2>
        <Flex direction={'row'} justify={'between'}>
            <div>Name</div>
            <div>Duration</div>
        </Flex>

        <Separator orientation="horizontal" color='cyan' style={{width:'100%'}} my={'4'}/>
        <div className="result-list" >
            {tracks.map(({data}) =><TrackRow key={data.uri} data={data}/>)}
        </div>

    </div>

   <div>
     <h2>Top result</h2>
     <TrackRow data={tracks[0]?.data}/>
   </div>
  
   </ResultsGrid>
}


const PodcastResults = ({podcasts} : {podcasts: SpotifySearch.MultiSearch.Podcasts}) => {

    const PodcastRow = useCallback(({data} : {data :  SpotifySearch.MultiSearch.Data6}) => {


        const openPodcast= () => {
            const splitted = data.uri.split(":")
            const type = splitted[1]
            const showId = splitted[2]
            window.open( `https://open.spotify.com/${type}/${showId}`)
        }
        return <Flex
        onClick={openPodcast} className="open-podcast"
        direction={'column'}
        key={data.uri}>
        <Flex 
        justify={'between'}
        px={'2'}
        direction='row' className="result-row">
        <Flex direction={'row'} gap={'4'}>
        <img className="album-coverArt" src={(data.coverArt.sources ?? [])[0]?.url}/> 
        <Flex direction={'column'}>
            <span>{data.name}</span>
            <span className="description">{data.publisher.name}</span>
        </Flex>
        </Flex>
        <Flex>
            {data.type}
          </Flex>
          </Flex>  

      
        </Flex>
    },[])
    return <ResultsGrid rows={'1fr'} columns={'1fr'}>
    <div className="side">
        <h2>Podcasts</h2>
        <Flex direction={'row'} justify={'between'}>
            <div>Name</div>
            <div>Type</div>
        </Flex>

        <Separator orientation="horizontal" color='cyan' style={{width:'100%'}} my={'4'}/>
        <div className="result-list" >
            {podcasts.items.map(({data}) =><PodcastRow key={data.uri} data={data}/>)}
        </div>
    </div>
   </ResultsGrid>
}

export type MultiSearchResultsProps = {results: Maybe<SpotifySearch.MultiSearch.SearchResults>,searching:boolean}
export default function MultiSearchResults(
    {results, searching}: MultiSearchResultsProps
) {

    if(!results && !searching) {
        return <div>Nothing to show...</div>
    }
    else if(searching) {
       return <div>Searching...</div>
    }
    else if(!results) {
        return <div>Nothing to show...</div>
    }



    return <div>
        <TrackResults tracks={results.tracks}/>
        <PodcastResults podcasts={results.podcasts}/>
    </div>
}