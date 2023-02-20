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
  import { useState } from "react";
  import { Link, Outlet } from 'react-router-dom'
  
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
  ];
  
  export default function MainDrawer() {
    const [open, setOpen] = useState(false);
  
    const getList = () => (
      <div style={{ width: 250 }} onClick={() => setOpen(false)}>
        {data.map((item, index) => (
          <ListItemButton 
            key={index}
            component={Link}
            to={item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        ))}
      </div>
    );
    return (
      <div>
        <Button onClick={() => setOpen(true)}><MenuOutlined /> Menu </Button>
        <Drawer open={open} anchor={"left"} onClose={() => setOpen(false)}>
          {getList()}
        </Drawer>
        <Outlet />
      </div>
    );
  }
  
  