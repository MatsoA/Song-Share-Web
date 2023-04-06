import Signout from './Signout';
import React from 'react';
import { useLocation } from 'react-router-dom'
import { collection, addDoc, getDocs } from "firebase/firestore"
import { database } from "./firebaseConfig";
import { Box, Divider, Checkbox, FormGroup, FormControlLabel, Typography,
    Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer, TablePagination } from '@mui/material';
import {SongFeedList} from './SongFeedList'
import Song from './Song'
import { SentByMeList } from './SentByMeList';



export default function MainPage({ userDetails, setUserDetails }) {
    

    return (
        <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', pl: 30, pt: 5 }}>
            <Typography variant = 'h6'>
             Sent To Me
            </Typography>
            <Divider />
            <TableContainer component={Paper}>
                <Table aria-label="Songs">
                    <TableHead>
                        <TableRow>
                        <TableCell sx={{ typography: 'body1'}}>Play</TableCell>
                            <TableCell sx={{ typography: 'body1'}}>Title</TableCell>
                            <TableCell align = "left" sx={{ typography: 'body1'}}>Sent By</TableCell>
                            <TableCell align = "left" sx={{ typography: 'body1'}}>Rating</TableCell>
                            <TableCell align = "left" sx={{ typography: 'body1'}}>Comments</TableCell>

                        </TableRow>
                    </TableHead>
                    <SongFeedList userDetails = {userDetails}/>

                </Table>
            </TableContainer>
            <Divider />
            <Typography variant= 'h6'>
            Sent By Me
            </Typography>
            <TableContainer component={Paper}>
                <Table aria-label="Sent By Me">
                    <TableHead>
                        <TableRow>
                        <TableCell sx={{ typography: 'body1'}}>Play</TableCell>

                            <TableCell sx={{ typography: 'body1'}}>Title</TableCell>
                            <TableCell align = "left" sx={{ typography: 'body1'}}>Sent By</TableCell>
                            <TableCell align = "left" sx={{ typography: 'body1'}}>Rating</TableCell>
                            <TableCell align = "left" sx={{ typography: 'body1'}}>Comments</TableCell>

                        </TableRow>
                    </TableHead>
                    <SentByMeList userDetails = {userDetails}/>
                </Table>
            </TableContainer>
        </Box>
    );

} 