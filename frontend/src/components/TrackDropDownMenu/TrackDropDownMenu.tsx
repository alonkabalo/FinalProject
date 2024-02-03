import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  HamburgerMenuIcon,
  DotFilledIcon,
  CheckIcon,
  ChevronRightIcon,
} from '@radix-ui/react-icons';
import './styles.css'
import ShareDialog from '../ShareDialog/ShareDialog';
import { SpotifySearch, Track } from '../../@Types';
import { useShare } from '../../context/ShareContext';

interface TrackDropDownMenuActions {
    addToPlaylist: () => void
    inPlaylistPage?: boolean
    track: any
}
function TrackDropDownMenu(props: TrackDropDownMenuActions)  {
    const {openShare} = useShare()
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
            <i className="fa-solid fa-ellipsis"></i>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
          <DropdownMenu.Item className="DropdownMenuItem" onClick={() => props.addToPlaylist()}>
           {props.inPlaylistPage ? "Remove from playlist" : "Add to playlist"}
          </DropdownMenu.Item>
            <DropdownMenu.Item className="DropdownMenuItem" onClick={() => {
                openShare(
                    {name: props.track.name, url: props.track.url}
                )
            }}>
               Share
            </DropdownMenu.Item>
          <DropdownMenu.Item className="DropdownMenuItem" onClick={() => window.open(props.track.url)}>
            Play 
          </DropdownMenu.Item>
       
          <DropdownMenu.Arrow className="DropdownMenuArrow" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default TrackDropDownMenu;