import {
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Button,
} from "@mui/material";
import {
  CheckBoxOutlineBlankOutlined,
  DraftsOutlined,
  HomeOutlined,
  InboxOutlined,
  MailOutline,
  ReceiptOutlined,
  MenuOutlined,
  PersonAddAltOutlined
} from "@mui/icons-material";
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { useState } from "react";
import { Link, Outlet } from 'react-router-dom'
import Banner from './banner';

const drawerWidth = 240;
//list of tabs for drawer
const data = [
  {
    name: "Feed",
    icon: <HomeOutlined />,
    path: "."
  },
  {
    name: "Add/Remove Friends",
    icon: <PersonAddAltOutlined />,
    path: "friends"
  },
  {
    name: "Send Songs",
    icon: <LibraryMusicIcon />,
    path: "music"
  },
];

//actual drawer component
export default function MainDrawer() {

  //tracker for state of drawer
  const [open, setOpen] = useState(false);

  //render tabs based off of list above
  const getList = () => (
    <div style={{ width: 250 }} onClick={() => setOpen(false)}>
      {data.map((item, index) => (
        <ListItemButton
          key={index}
          component={Link} //react router link component
          to={item.path} //path refers to react router path
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItemButton>
      ))}
    </div>
  );
  return (
    <div>
      <Banner />
      <Button onClick={() => setOpen(true)}><MenuOutlined /> Menu </Button>
      <Drawer sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }} variant="permanent" anchor={"left"} onClose={() => setOpen(false)}>
        {getList()}
      </Drawer>
      <Outlet />
    </div>
  );
}

