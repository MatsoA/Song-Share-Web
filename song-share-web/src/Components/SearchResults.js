import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react';


export default function SearchResults({ data, element, showResults, setShowResults }) {
    /*used for yt results display*/
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
    const open = Boolean(anchorEl);


    useEffect(() => {
        console.log(showResults, element)
        if (showResults) {
            setAnchorEl(element)
        } else {
            setAnchorEl(null);
        }
    }, [showResults]);

    useEffect(() => {
        console.log(anchorEl)
    }, [anchorEl]);


    return (
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => {
                setShowResults(false)
            }}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            {data.map((entry, index) => (
                <MenuItem key={index}>{entry.testField1}</MenuItem>
            ))}
        </Menu>
    )
}