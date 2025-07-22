import { useContext } from "react"
import { WidgetLoader } from "../widgets/WidgetLoader"
import { EditContext } from "../App";
import { Box, Divider } from "@mui/material";
import { useState } from "react";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";


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

    const content = (
        <>
            <WidgetLoader compid='dj-toolbar' />
            <Divider sx={{ my: 2 }} />
            <WidgetLoader compid='dj-sidenav' /> 
        </>
    );

    return (
        <Box
            sx={{
                backgroundColor: 'secondary.main',
                color: 'primary.main',
                height: '100vh',
                width: isOpen ? 280 : 56, // collapsable
                transition: 'width 0.3s',
                overflowX: 'hidden',
                boxSizing: 'border-box',
            }}
        >
            <IconButton
                onClick={() => setIsOpen(!isOpen)}
                sx={{ color: 'inherit', mb: 2, ml: 1}}
            >
                <MenuIcon />
            </IconButton>
            {edit
                ? <Box sx={{ pointerEvents: 'none' }}>{content}</Box>
                : content}
        </Box>
    );

    return edit
        ? <Box sx={{ pointerEvents: 'none' }}>{content}</Box>
        : content;
}