import { Table } from "@radix-ui/themes";
import { AlbumTracks, Maybe, SpotifySearch, Track } from "../../@Types";
import styled from "@emotion/styled";
import React, { useCallback, useEffect, useState } from "react";
import { Flex, message } from "antd";
import { useFavorites, usePlaylist, useUser } from "../../redux/userSlice";
import { PRIMARY_GREEN } from "../../utils";
import { TableHeaderCell, TableRoot, TableRow, TitleCell } from "./AlbumTracksTable";
import TrackDropDownMenu from "../TrackDropDownMenu/TrackDropDownMenu";
import { useParams } from "react-router";

export default function TracksTablePlaylist() {
    const Seconds = useCallback(({millis} : {millis:number}) => {
        const minutes = ("0" + Math.floor( millis / 1000 / 60)).slice(-2)
        const seconds = ("0" + Math.floor((millis % 60000) / 1000)).slice(-2)
        return <>{ `${minutes}:${seconds}`}</>
    },[])

    const [selectedTrack, setSelectedTrack] = useState<number | undefined>()

    const {playListId} = useParams()
    const playlists = usePlaylist({ id:playListId })
    const favorites = useFavorites()
    const user = useUser()
    
    useEffect(() => {
        if(user)
            playlists.getPlaylistTracksData()
    }, [user])

    const TrackRow = useCallback(({track, index} : {track: Track, index:number}) =>  {
        
        const trackId = track.uri.split(":")[2]
        return <TableRow selected={index === selectedTrack}
                 onClick={() => setSelectedTrack(index)}>
            <Table.Cell>
                <TitleCell gap={16}>
                    <span className="track-number" >
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
            <Table.Cell  className="track-album">
                {track.album.name}
            </Table.Cell>

            <Table.Cell  className="track-album">
                <Seconds  millis={track.duration_ms}/>
            </Table.Cell>

            <Table.Cell className="like-cell track-album">
            
            <div className="show-more">
                 <TrackDropDownMenu
                 inPlaylistPage
                 addToPlaylist={async () => {
                    if(playListId) {
                        await playlists.removeFromPlaylist(playListId, trackId)
                    }
                 }}
                 track={{...track, url: `https://open.spotify.com/track/${trackId}`}}/>
            </div>
            <div  
            onClick={() => favorites.likeTrack(trackId)}>
                {favorites.isFavorite(trackId) ? <i className="fa-solid fa-heart" style={{color:PRIMARY_GREEN}}></i> : <i className="fa-regular fa-heart"></i>}
            </div>
            </Table.Cell>
    </TableRow>}, [selectedTrack, playlists])

        const [notLoggedMessage,setNotLoggedMessage] = useState<Maybe<string>>()
        useEffect(() => {
            if(!user) {
                    setNotLoggedMessage("Log in to view playlists")
            } else {
                    setNotLoggedMessage(undefined)
            }
        }, [user])

        if(!user && notLoggedMessage) return <p>{notLoggedMessage}</p>
        else if(!user) return null


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
                    {playlists.playlistTracks && React.Children.toArray(playlists.playlistTracks.map((item,index) => 
                    <TrackRow track={item} index={index+1}/>))}
                </Table.Body>

    </TableRoot>

}