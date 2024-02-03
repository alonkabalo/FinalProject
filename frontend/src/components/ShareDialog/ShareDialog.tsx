import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import './styles.css';
import { useShare } from '../../context/ShareContext';
import { WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';
import { Flex, Grid } from '@radix-ui/themes';

const ShareDialog = () => {

const {shareData, closeShare} = useShare()

  return <AlertDialog.Root open={shareData !== undefined && shareData !== null}>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="AlertDialogOverlay" />
      <AlertDialog.Content className="AlertDialogContent">
        <AlertDialog.Title className="AlertDialogTitle">
            Share {shareData?.name}
        </AlertDialog.Title>
        <AlertDialog.Description className="AlertDialogDescription">
            Share {shareData?.name} on the following platforms:
            <br/>
            <br/>
            {shareData &&<Flex  gap={'4'}>
                <WhatsappShareButton style={{marginInline:'8px'}} url={shareData.url}>
                    <WhatsappIcon style={{width:'35px',height:'35px'}}/>
                </WhatsappShareButton>
                <FacebookShareButton style={{marginInline:'8px'}} url={shareData.url}>
                    <FacebookIcon style={{width:'35px',height:'35px'}}/>
                </FacebookShareButton>

                <TwitterShareButton style={{marginInline:'8px'}} url={shareData.url}>
                    <TwitterIcon style={{width:'35px',height:'35px'}}/>
                </TwitterShareButton>
            </Flex>}
        </AlertDialog.Description>
        <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
          <AlertDialog.Cancel asChild>
            <button className="Button mauve" onClick={closeShare}>Cancel</button>
          </AlertDialog.Cancel>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
}

export default ShareDialog;