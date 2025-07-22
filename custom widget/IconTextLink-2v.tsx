import { Box, Icon as MuiIcon, ListItemButton, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import { Widget } from "../model/widget";
import { icon, href, text, tooltip, roles } from "../api/Const";
import { useExpressionContext } from "../hooks/useExpressionContext";
import { util } from "../api/Util";
import { useLoc } from "../hooks/useLoc";
import { Link } from "react-router-dom";
import { useDjTranslate } from "../hooks/useDjTranslate";
import { useSidebarState } from 'react-admin';
import { useLocation } from "react-router-dom";

export function IconTextLink({ widget }: { widget: Widget }) {
    const context = useExpressionContext();
    const hrefResolved = util.simpleTemplate(widget.href, context);
    const translate = useDjTranslate();
    const [isOpen] = useSidebarState();
    const location = useLocation();
    const isActive = hrefResolved === "/"
    ? location.pathname === "/"
    : location.pathname.startsWith(hrefResolved);

    const content = (
        <ListItemButton
            component={hrefResolved ? Link : "div"}
            to={hrefResolved || ""}
            target={hrefResolved?.startsWith("http") ? "_blank" : undefined}
            sx={{
                paddingY: 1,
                paddingX: 2,
                height: 48,
                backgroundColor: isActive ? '#0021FF' : 'transparent',
                color: isActive ? 'primary.contrastText' : 'inherit',
                '&:hover': {
                    backgroundColor: isActive ? 'primary.dark' : 'rgba(0,0,0,0.04)'
                }
            }}
        >
            {widget.icon &&
                <ListItemIcon sx={{ minWidth: 0, marginRight: 4, justifyContent: "center", color: "inherit"}}>
                    <MuiIcon>{util.simpleTemplate(widget.icon, context)}</MuiIcon>
                </ListItemIcon>
            }
            {isOpen && <ListItemText primary={translate(widget.text)} />}
        </ListItemButton>
    );

    return widget.tooltip ? <Tooltip title={translate(widget.tooltip)}>{content}</Tooltip> : content;
}

export const config = {
    id: "icon-text-link",
    title: "Icon + Text Link",
    description: "Link mit Icon und Text nebeneinander",
    version: 1,
    icon: <MuiIcon>link</MuiIcon>,
    controls: {
        type: "autoform",
        schema: {
            properties: {
                text: text,
                icon: icon,
                href: href,
                tooltip: tooltip,
                roles: roles
            }
        }
    }
}
