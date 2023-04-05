import Signout from './Signout';
import React from 'react';
import { useLocation } from 'react-router-dom'
import { collection, addDoc, getDocs } from "firebase/firestore"
import { database } from "./firebaseConfig";
import { Box, Divider, Checkbox, FormGroup, FormControlLabel, Typography,
    Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer } from '@mui/material';
import {SongFeedList} from './SongFeedList'
import Song from './Song'



export default function MainPage({ userDetails, setUserDetails }) {
    
    return (
        <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', pl: 30, pt: 5 }}>
            <Typography variant = 'h6'>
             My Feed
            </Typography>
            <Divider />
            <TableContainer component={Paper}>
                <Table aria-label="Songs">
                    <TableHead>
                        <TableRow>
                        <TableCell sx={{ typography: 'body1'}}>Play</TableCell>

                            <TableCell sx={{ typography: 'body1'}}>Title</TableCell>
                            <TableCell align = "left" sx={{ typography: 'body1'}}>Sent By</TableCell>
                            <TableCell align = "left" sx={{ typography: 'body1'}}>Review</TableCell>
                        </TableRow>
                    </TableHead>
                    <SongFeedList userDetails = {userDetails}/>
                </Table>
            </TableContainer>
            <Divider />
        </Box>
    );

} 