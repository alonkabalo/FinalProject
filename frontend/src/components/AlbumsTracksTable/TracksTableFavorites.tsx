import { Table } from "@radix-ui/themes";
import { AlbumTracks, Maybe, SpotifySearch, Track } from "../../@Types";
import styled from "@emotion/styled";
import React, { useCallback, useEffect, useState } from "react";
import { Flex } from "antd";
import { useFavorites, useUser } from "../../redux/userSlice";
import { PRIMARY_GREEN } from "../../utils";
import { TableHeaderCell, TableRoot, TableRow, TitleCell } from "./AlbumTracksTable";
import TrackDropDownMenu from "../TrackDropDownMenu/TrackDropDownMenu";
import { usePlaylistsDialog } from "../../context/PlaylistsContext";

export default function TracksTableFavorites() {
    const Seconds = useCallback(({millis} : {millis:number}) => {
        const minutes = ("0" + Math.floor( millis / 1000 / 60)).slice(-2)
        const seconds = ("0" + Math.floor((millis % 60000) / 1000)).slice(-2)
        return <>{ `${minutes}:${seconds}`}</>
    },[])

    const [selectedTrack, setSelectedTrack] = useState<number | undefined>()
    const favorites = useFavorites()
    const {openPlaylists} = usePlaylistsDialog()

    const user = useUser()
    
    useEffect(() => {
        favorites.getFavoriteTracksData()
    }, [user])

    const TrackRow = useCallback(({track, index} : {track: Track, index:number}) =>  {
        
        const trackId = track.uri.split(":")[2]
        return <TableRow selected={index === selectedTrack}
                 onClick={() => setSelectedTrack(index)}>
            <Table.Cell>
                <TitleCell gap={16}>
                    <span className="track-number">
                    <span>{index}</span>
                    <i onClick={() => {
                        window.open(track.external_urls.spotify)
                    }} className="fa-solid fa-play play-button"></i>
                    </span>
                    <img className="album-coverArt" src={(track.album.images ?? [])[0]?.url}/>
                    <span className="track-name">
                        {track.name}
                    </span>
                </TitleCell>
            </Table.Cell>
            <Table.Cell className="track-album">
 
             {track.album.name}
     
            </Table.Cell>


            <Table.Cell className="track-album">
                <Seconds  millis={track.duration_ms}/>
            </Table.Cell>
                 
            <Table.Cell className="like-cell track-album">
            
            <div className="show-more">
                 <TrackDropDownMenu
                 addToPlaylist={() => {
                    openPlaylists({id: trackId,name:track.name})
                 }} 
                 track={{...track, url: `https://open.spotify.com/track/${trackId}`}}/>
            </div>
            <div  
            onClick={() => favorites.likeTrack(trackId)}>
                {<i className="fa-solid fa-heart" style={{color:PRIMARY_GREEN}}></i> }
            </div>
            </Table.Cell>
    </TableRow>}, [selectedTrack, favorites])


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
                    {favorites?.favoriteTracks && React.Children.toArray(favorites.favoriteTracks.map((item,index) => 
                    <TrackRow track={item} index={index+1}/>))}
                </Table.Body>


    </TableRoot>

}