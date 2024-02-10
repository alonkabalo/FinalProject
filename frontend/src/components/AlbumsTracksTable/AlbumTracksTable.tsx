import { Table } from "@radix-ui/themes";
import { AlbumTracks, Maybe, SpotifySearch } from "../../@Types";
import styled from "@emotion/styled";
import React, { useCallback, useState } from "react";
import { Flex } from "antd";
import { useFavorites, usePlaylist } from "../../redux/userSlice";
import { PRIMARY_GREEN } from "../../utils";
import TrackDropDownMenu from "../TrackDropDownMenu/TrackDropDownMenu";
import { usePlaylistsDialog } from "../../context/PlaylistsContext";

type AlbumTracksTableProps = {tracks: Maybe<AlbumTracks.Tracks>, album:SpotifySearch.AlbumSearch.Item | undefined}

export const TableRoot = styled(Table.Root)`
    margin-inline:auto;
    width:fit-content;
    min-width: 95%;
    margin-top:2.5rem;
`
export const TableHeaderCell = styled(Table.ColumnHeaderCell)`
    color:gray;
`

export const TableRow = styled(Table.Row)<{selected:boolean}>`
    color:white;
    cursor:pointer;
    .album-coverArt {
        width: 50px;
        height:50px;
    }
    .like-cell {
        opacity:0;
        display:flex;
        flex-direction: row;
        align-items:center;
        justify-content:center;
        gap:1rem;
    }
    .play-button {
        display:none;
    }
    .track-number {
        min-width:15px;
        transform:translateY(1rem);
    }

    .track-name {
        transform:translateY(1rem);
    }
    .track-album {
        transform:translateY(1rem);
    }
    &:hover {
        .like-cell {
            opacity:1;
        }
        .track-number {

            .play-button {
                display:flex;
                transform:translateY(.25rem);
            }
            span {
                display:none;
            }
        }
    } 

    background: ${props => props.selected ? 'rgba(155,155,155,0.4)' : 'inherit'};
    ${props => props.selected ? `   
    ` : `
        &:hover {
            background:rgba(55,55,55,0.2) !important;  
        } 
    `}
    ${props => props.selected ? `   
    ` : `
        &:active {
            background:rgba(105,105,105,0.2) !important; 
        }
    `}

`

export const TitleCell = styled(Flex)`

`
export const Seconds = ({millis} : {millis:number}) => {
        const minutes = ("0" + Math.floor( millis / 1000 / 60)).slice(-2)
        const seconds = ("0" + Math.floor((millis % 60000) / 1000)).slice(-2)
        return <>{ `${minutes}:${seconds}`}</>
}
export default function AlbumTracksTable({tracks, album} : AlbumTracksTableProps) {
  

    const [selectedTrack, setSelectedTrack] = useState<number | undefined>()
    const favorites = useFavorites()
    const playlists = usePlaylist({id:undefined})
    const {openPlaylists} = usePlaylistsDialog()
    const TrackRow = useCallback(({trackData, index} : {trackData: AlbumTracks.Item, index:number}) =>  {
        const trackId = trackData.track.uri.split(":")[2]
        return <TableRow selected={index === selectedTrack}
                 onClick={() => setSelectedTrack(index)}>
            <Table.Cell>
                <TitleCell gap={16}>
                <span className="track-number">
                <span>{index}</span>
                <i onClick={() => {
                      window.open(`https://open.spotify.com/track/${trackId}`)
                    }} className="fa-solid fa-play play-button"></i>
                </span>
                <img className="album-coverArt" src={(album?.data.coverArt.sources ?? [])[0]?.url}/>
                <span className="track-name">
                {trackData.track.name}
                </span>
                  
                </TitleCell>
            </Table.Cell>
            <Table.Cell className="track-album">
                {album?.data.name}
            </Table.Cell>

            <Table.Cell className="track-album">
                <Seconds  millis={trackData.track.duration.totalMilliseconds}/>
            </Table.Cell>
            <Table.Cell className="like-cell track-album">
            
            <div className="show-more">
                 <TrackDropDownMenu 
                 addToPlaylist={() => {
                    openPlaylists({id: trackId,name:trackData.track.name})
                 //   playlists.addToPlaylist()
                 }}
                 track={{...trackData.track, url: `https://open.spotify.com/track/${trackId}`}}/>
            </div>
            <div  
            onClick={() => favorites.likeTrack(trackId)}>
                {favorites.isFavorite(trackId) ? <i className="fa-solid fa-heart" style={{color:PRIMARY_GREEN}}></i> : <i className="fa-regular fa-heart"></i>}
            </div>
            </Table.Cell>
          
    </TableRow>}, [selectedTrack, album, favorites])


    return <TableRoot>
                <Table.Header>
                    <Table.Row>
                        <TableHeaderCell>
                            #Title
                        </TableHeaderCell>

                        <TableHeaderCell>
                            Album
                        </TableHeaderCell>

                        <TableHeaderCell>
                            Duration
                        </TableHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {React.Children.toArray(tracks?.data.album.tracks.items.map((item,index) => 
                    <TrackRow trackData={item} index={index+1}/>))}
                </Table.Body>


    </TableRoot>

}