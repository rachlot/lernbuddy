import { useContext, useEffect } from "react"
import { WidgetLoader } from "../widgets/WidgetLoader"
import { EditContext } from "../App";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Legal } from "../components/Legal";
import { profile } from "../api/Profile";
import { AuthErrorProps, Button, Loading } from 'react-admin';
import authProvider from '../login/AuthProvider'; // Pfad ggf. anpassen
import LogoutIcon from '@mui/icons-material/Logout'; // oder anderes Icon
import { IconButton, Tooltip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Link, Box } from '@mui/material';

/**
 * simply delegate to widget loader
 
export const SideMenu = () => {

    const edit = useContext(EditContext)

    if (edit)
        return <Box sx={{ pointerEvents: 'none' }}>
            <WidgetLoader compid='dj-sidenav' />
        </Box>
    else
        return <WidgetLoader compid='dj-sidenav' />
}*/
export const SideMenu = () => {
    const edit = useContext(EditContext)
    const [isOpen, setIsOpen] = useState(true);
    const [currentVersion, setCurrentVersion] = useState<string>("v2");

    useEffect(() => {
        // Beim ersten Laden die Version aus localStorage holen
        const storedVersion = localStorage.getItem("version") || "v2"; // Falls keine Version vorhanden, v2 als Standard
        setCurrentVersion(storedVersion);
    }, []);

    const content = (
        <>
            <WidgetLoader compid='dj-toolbar-2v' />
        </>
    );

    const content2 = (
        <>
            <WidgetLoader compid='dj-toolbar-settings' />
        </>
    );

    if (currentVersion === "v1") {
        if (edit)
            return <Box sx={{ pointerEvents: 'none' }}>
                <WidgetLoader compid='dj-sidenav' />
            </Box>
        else
            return <WidgetLoader compid='dj-sidenav' />
    }
    else if(currentVersion === "v2"){

        return (
            <Box
                sx={{
                    backgroundColor: '#DEF7FF',
                    color: 'primary.main',
                    minHeight: '100vh',
                    width: isOpen ? 280 : 56, // collapsable
                    transition: 'width 0.3s',
                    overflowX: 'hidden',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}
            >
                <Box>
                    <IconButton
                        onClick={() => setIsOpen(!isOpen)}
                        sx={{ color: 'inherit', mb: 3, ml: 1, mt: 2}}
                    >
                        <MenuIcon />
                    </IconButton>
                    {edit
                        ? <Box sx={{ pointerEvents: 'none'}}>{content}</Box>
                        : content}
                </Box>
                <Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            py: 2
                        }}>
                        <Legal />
                            {profile.getUISettings().logoUrl ? <Box
                                component="img"
                                sx={{ height: isOpen ? 48 : 32, mt: 1, mb: 1, mx:'auto' }}
                                src={profile.getUISettings().logoUrl}
                        /> : <></>}
                    </Box>
                    <Box sx={{ textAlign: 'center', mt: 1, mb: 2 }}>
                        {isOpen && (
                            edit
                                ? <Box sx={{ pointerEvents: 'none'}}>{content2}</Box>
                                : content2
                        )}
                    </Box>
                </Box>
            </Box>
        );
    }

    return edit
        ? <Box sx={{ pointerEvents: 'none' }}>{content}</Box>
        : content;
}