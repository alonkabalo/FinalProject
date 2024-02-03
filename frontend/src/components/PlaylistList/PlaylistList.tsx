import { Navigate, useNavigate } from "react-router"
import { usePlaylist, useUser } from "../../redux/userSlice"
import { useEffect, useState } from "react"
import {  message } from "antd"
import { Flex } from "@radix-ui/themes"
import { Maybe, TPlaylist, User } from "../../@Types"
import styled from "@emotion/styled"

import { TrashIcon } from '@radix-ui/react-icons'

const PlaylistItemStyle = styled(Flex)`
        background:rgba(100,100,100,0.2);
        padding: .25rem;
        border-radius:.25rem;
        max-width:80%;
        margin-inline:auto;
        width:100%;

        p {
           margin:.15rem;
        }

        transition: background .2s linear;
        &:hover {
                background:rgba(100,100,100,0.1);
                cursor:pointer;
        }
`


const PlaylistComponent = ({playlist} : {playlist:TPlaylist}) => {
    const nav = useNavigate()
    const playlists = usePlaylist({id: playlist._id})
    const deletePlaylist = async (e: React.MouseEvent<SVGElement, MouseEvent>) => {
           e.stopPropagation()
          await playlists.deletePlayList()
    }
    return <PlaylistItemStyle direction={'row'} justify={'between'} align={'center'} 
    onClick={() => nav(`/playlist/${playlist._id}`)}>
         <Flex direction={'column'}>  
                <p>
                {playlist.name}
                </p>
                <p>
                Tracks: {playlist.tracks.length}
                </p>
           </Flex>
        <TrashIcon style={{height:'20px',width:'20px',color:'red'}}
         onClick={deletePlaylist}/>
    </PlaylistItemStyle>
}
export default function PlaylistList() {

    const user = useUser()
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

    return <Flex direction={'column'} gap={'2'}>
            {user.playlists?.map(playlist => <PlaylistComponent key={playlist._id} playlist={playlist}/>)}
    </Flex>
}