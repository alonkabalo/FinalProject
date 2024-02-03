import React, { useRef, useState } from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import './styles.css';
import { useShare } from '../../context/ShareContext';
import { WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';
import { Flex, Grid, TextField } from '@radix-ui/themes';
import { usePlaylistsDialog } from '../../context/PlaylistsContext';
import { usePlaylist, useUser } from '../../redux/userSlice';
import { Maybe, TPlaylist } from '../../@Types';
import { message } from 'antd';

const AddPlaylistsDialog = () => {
  const { closeAddNewPlaylistDialog ,closePlaylists, addNewPlaylistOpen,addToPlayListTrack} = usePlaylistsDialog()
  const user = useUser()
  const [selectedPlaylist,setSelectedPlaylist] = useState<Maybe<TPlaylist>>()
  const playlists = usePlaylist({id: selectedPlaylist?._id})
  const ref = useRef<HTMLInputElement | null>(null)
  return <AlertDialog.Root open={addNewPlaylistOpen}>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="AlertDialogOverlay" />
      <AlertDialog.Content className="AlertDialogContent">
        <AlertDialog.Title className="AlertDialogTitle">
            Create new playlist
        </AlertDialog.Title>
        <AlertDialog.Description className="AlertDialogDescription">
         <input ref={ref} required placeholder='Enter playlist name'/>
        </AlertDialog.Description>
        <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
          <AlertDialog.Cancel asChild>
          <button className="Button mauve" onClick={async () => {
                if(!ref.current?.value) {
                message.info("No playlist name provided..")
                return
              }
              if(addToPlayListTrack) { // user creates a playlist with a selected track
                  await playlists.createPlayList(ref.current!.value, [addToPlayListTrack.id])
                  closeAddNewPlaylistDialog()
                  closePlaylists()
              } else { // user creates a playlist without tracks
                  playlists.createPlayList(ref.current!.value, [])
              }
            }}>Create Playlist</button>
        </AlertDialog.Cancel>
          <AlertDialog.Cancel asChild>
            <button className="Button mauve" onClick={closeAddNewPlaylistDialog}>Cancel</button>
          </AlertDialog.Cancel>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
}

export default AddPlaylistsDialog;