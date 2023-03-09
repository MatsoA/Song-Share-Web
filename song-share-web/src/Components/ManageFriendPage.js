import { useState, useEffect } from 'react';
import { Stack, TextField, Button, Box } from '@mui/material';
import Banner from './banner';

export default function ManageFriendPage() {

    //hook for input field
    const [entry, setEntry] = useState("")

    //hook for actual submitted search
    const [searchTerm, setSearchTerm] = useState("")

    //on submission, store entry into searchTerm
    const handleSubmit = e => {
        //reset searchTerm from previous submission
        setSearchTerm("")

        e.preventDefault();

        //update searchTerm with new value
        if (entry.length != 0) {
            setSearchTerm(entry)
        }

        //reset entry
        setEntry("")
    }

    //dynamically show text input as user types into search box
    const handleTextInputChange = e => {
        const value = e.target.value;
        setEntry(value)
    }

    //verify searcTerm is updated correctly
    useEffect(() => console.log(searchTerm), [searchTerm])

    return (
        <Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', pl: 30, pt: 5 }}>
                <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                    <TextField
                        label="Search User"
                        variant="outlined"
                        value={entry}
                        onChange={(e) => {
                            handleTextInputChange(e)
                        }}
                    />

                    <Button type="submit" variant="contained">Search</Button>
                </form>
            </Box>
        </Box>
    )
}