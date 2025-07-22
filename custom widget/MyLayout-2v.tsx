import { Layout, LayoutProps, useSidebarState } from 'react-admin';
import { Box } from '@mui/material';
import { SideMenu } from './page/SideMenu';
import { Toolbar } from './page/Toolbar';
import { useEffect } from 'react';
import { profile } from './api/Profile';

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

const MyLayout = ({ children }: LayoutProps) => {

    // run this once to apply sideNavOpen
    const [, setOpen] = useSidebarState()
    //useEffect(() => setOpen(profile.getUISettings().sideNavOpen), [setOpen])
    useEffect(() => {setOpen(true);}, [setOpen])

    return (
      <Box sx={{ display: 'flex', height: '100vh'}}>
        
        {/* Sidebar */}
        <Box sx={{ width: 'inherit', backgroundColor: 'secondary.main' }}>
          <SideMenu />
        </Box>
  
        {/* Inhalt – du bestimmst selbst, wo das gerendert wird */}
        <Box sx={{ flexGrow: 1, padding: 3 }}>
          {children}
        </Box>
      </Box>
    );
  };
  
  export default MyLayout;