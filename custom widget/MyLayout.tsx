import { Layout, LayoutProps, useSidebarState } from 'react-admin';
import { Box } from '@mui/material';
import { SideMenu } from './widgets/SideMenu';
import { Toolbar } from './page/Toolbar';
import { useEffect } from 'react';
import { profile } from './api/Profile';
import { useState } from "react";

/**
 * layout with custom toolbar and side menu
 
const MyLayout = (props: any) => {

    // run this once to apply sideNavOpen
    const [, setOpen] = useSidebarState()
    //useEffect(() => setOpen(profile.getUISettings().sideNavOpen), [setOpen])
    useEffect(() => {setOpen(true);}, [setOpen])

    return <Layout
        {...props}
        appBar={SideMenu}
        //menu={SideMenu}
        //sx={{mt: 0}}
    />
};

export default MyLayout;*/

const MyLayout = (props: any) => {

    // run this once to apply sideNavOpen
    const [, setOpen] = useSidebarState()
    //useEffect(() => setOpen(profile.getUISettings().sideNavOpen), [setOpen])
    useEffect(() => {setOpen(true);}, [setOpen])
    const [isOpen, setIsOpen] = useState(true);
    const [currentVersion, setCurrentVersion] = useState<string>("v2");
    
    useEffect(() => {
        // Beim ersten Laden die Version aus localStorage holen
        const storedVersion = localStorage.getItem("version") || "v2"; // Falls keine Version vorhanden, v2 als Standard
        setCurrentVersion(storedVersion);
    }, []);

    if(currentVersion === "v1"){
      return (
        <Layout {...props} appBar={Toolbar} menu={SideMenu} />
      );
    }
    else if(currentVersion === "v2"){
      return (
        <Box sx={{ display: 'flex', height: '100vh'}}>
          
          {/* Sidebar */}
          <Box sx={{ width: 'inherit', backgroundColor: 'secondary.main' }}>
            <SideMenu />
          </Box>
    
          {/* Inhalt – du bestimmst selbst, wo das gerendert wird */}
          <Box sx={{ flexGrow: 1, padding: 3, overflow: 'scroll'}}>
            {props.children}
          </Box>
        </Box>
      );
    }
  };
  
  export default MyLayout;