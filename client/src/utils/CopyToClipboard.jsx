import React, { useState, useEffect } from 'react';

import FileCopyIcon from '@material-ui/icons/FileCopy';
import Snackbar from '@material-ui/core/Snackbar';


export default function CopyToClipboard({ textToCopy, notification }) {

    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const [text, setText] = useState(textToCopy);
    const [isCopied, setIsCopied] = useState(false);

    // This is the function we wrote earlier
    async function copyTextToClipboard(text) {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    }

    // onClick handler function for the copy button
    const handleCopyClick = () => {
        // Asynchronously call copyTextToClipboard
        copyTextToClipboard(text)
        .then(() => {
            if (notification == 'snackbar') {    
                setOpen(true);
            } else {
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 1500);   
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return (
        
        <div class="copy">

            <FileCopyIcon onClick={handleCopyClick} />
            <span>{isCopied && 'Copied!'}</span>

            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={open}
                autoHideDuration={1500}
                message={'copied: ' + text}
                onClose={handleClose}
            />

        </div>

    );
}
