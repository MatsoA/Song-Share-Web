import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Play({ videoLink }) {
    const [playerOpen, setPlayerOpen] = React.useState(false);
    const handleOpen = () => setPlayerOpen(true);
    const handleClose = () => setPlayerOpen(false);

    //match returns array in the form [input link, id of video]
    let videoId = videoLink.match(/^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/)[1]
    return (
        <>
            <IconButton onClick={handleOpen}><PlayCircleIcon /></IconButton>
            <Modal
                open={playerOpen}
                onClose={handleClose}
            >
                <iframe className='video'
                    title='Youtube player'
                    sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        width: '1280px',
                        height: '720px',
                        transform: 'translate(-50%, -50%)',
                    }}
                    src={`https://youtube.com/embed/${videoId}?autoplay=0`}>
                </iframe>
            </Modal>
        </>
    );
}