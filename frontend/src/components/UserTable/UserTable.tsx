import { useManagement } from "../../redux/adminSlice";
import { Table } from "@radix-ui/themes";
import { AlbumTracks, Maybe, SpotifySearch, Track, User } from "../../@Types";
import styled from "@emotion/styled";
import React, { useCallback, useEffect, useState } from "react";
import { Flex, Modal, message } from "antd";
import { useFavorites, useUser } from "../../redux/userSlice";
import { PRIMARY_GREEN, isAdmin } from "../../utils";
import { TableHeaderCell, TableRoot, TableRow, TitleCell } from "../AlbumsTracksTable/AlbumTracksTable"
import TrackDropDownMenu from "../TrackDropDownMenu/TrackDropDownMenu";
import { usePlaylistsDialog } from "../../context/PlaylistsContext";

export default function UserTable() {
    
    const {users,deleteUser}  = useManagement()

    const [selectedUser, setSelectedUser] = useState<number | undefined>()
    const favorites = useFavorites()
    const {openPlaylists} = usePlaylistsDialog()

    const user = useUser()
    
    useEffect(() => {
        favorites.getFavoriteTracksData()
    }, [user])

    const UserRow = useCallback(({user, index} : {user: User, index:number}) =>  {
        
        return <TableRow selected={index === selectedUser}
                 onClick={() => setSelectedUser(index)}>
            <Table.Cell>
                <TitleCell gap={16}>
                    <span className="track-number">
                    <span>{index}</span>
                    </span>
                    <img className="album-coverArt" src={user.image}/>
                    <span className="track-name">
                        {user.name}
                    </span>
                </TitleCell>
            </Table.Cell>
            <Table.Cell className="track-album">
 
             {user.email}
     
            </Table.Cell>

            <Table.Cell className="track-album">
                {user.userType}
            </Table.Cell>

                 
            <Table.Cell className="track-album" onClick={(() =>{
                if(isAdmin(user)) {
                    message.info("Cannot delete an admin")
                    return;
                }
                Modal.confirm({
                        title:`Delete Account ${user.email}`,
                        content:`Are you sure you want to delete the account ${user.email}?`,
                        okText:"Yes, Delete",
                        onOk: async () => {
                            await deleteUser(user._id)
                            message.info("User deleted successfuly")
                        }
                })
            })}>
            <div style={{
                pointerEvents: isAdmin(user) ? 'none' : 'inherit',
                color: isAdmin(user) ? 'gray' : 'white'
            }}>
                 Delete
            </div>
            </Table.Cell>
    </TableRow>}, [selectedUser, user])


    return <TableRoot>
                <Table.Header>
                    <Table.Row>
                        <TableHeaderCell>
                            #Name
                        </TableHeaderCell>

                        <TableHeaderCell>
                            Email
                        </TableHeaderCell>

                        <TableHeaderCell>
                            Role
                        </TableHeaderCell>

                        <TableHeaderCell>
                            Actions
                        </TableHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {users &&  React.Children.toArray(users.map((item,index) => 
                    <UserRow user={item} index={index+1}/>))}
                </Table.Body>


    </TableRoot>

}