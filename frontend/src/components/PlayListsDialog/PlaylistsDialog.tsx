import React, { useState } from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import './styles.css';
import { useShare } from '../../context/ShareContext';
import { WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';
import { Flex, Grid } from '@radix-ui/themes';
import { usePlaylistsDialog } from '../../context/PlaylistsContext';
import { usePlaylist, useUser } from '../../redux/userSlice';
import { Maybe, TPlaylist } from '../../@Types';
import { message } from 'antd';

const PlaylistsDialog = () => {
  const { closePlaylists, addToPlayListTrack,openAddNewPlaylistDialog} = usePlaylistsDialog()
  const user = useUser()
  const [selectedPlaylist,setSelectedPlaylist] = useState<Maybe<TPlaylist>>()
  const playlists = usePlaylist({id: selectedPlaylist?._id})
  return <AlertDialog.Root open={addToPlayListTrack !== undefined}>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="AlertDialogOverlay" />
      <AlertDialog.Content className="AlertDialogContent">
        <AlertDialog.Title className="AlertDialogTitle">
            Choose playlist to add {addToPlayListTrack?.name} to
        </AlertDialog.Title>
        <AlertDialog.Description className="AlertDialogDescription">
           {user && React.Children.toArray(
            user.playlists?.map(playlist => <Flex
           
            style={{background: playlist._id === selectedPlaylist?._id ? '#1DB954' : 'black'} }
            className='playlist-row'
            onClick={() => setSelectedPlaylist(playlist)}>
              <p>{playlist.name}</p>
            </Flex>)
           )}
        </AlertDialog.Description>
        <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
          <AlertDialog.Cancel asChild>
          <button className="Button mauve" onClick={() => {
              if(!selectedPlaylist || !addToPlayListTrack) {
                message.info("No playlist selected..")
                return
              }
            playlists.addToPlaylist(selectedPlaylist._id, addToPlayListTrack.id)
            }}>Add To playlist</button>
        </AlertDialog.Cancel>
          <AlertDialog.Cancel asChild>
            <button className="Button mauve" onClick={closePlaylists}>Cancel</button>
          </AlertDialog.Cancel>

          <AlertDialog.Cancel asChild>
            <button className="Button mauve" onClick={openAddNewPlaylistDialog}>Create new Playlist</button>
          </AlertDialog.Cancel>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
}

export default PlaylistsDialog;