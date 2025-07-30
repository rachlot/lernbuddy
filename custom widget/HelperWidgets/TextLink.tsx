import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useSidebarState } from 'react-admin';
import { Widget } from '../../model/widget';
import { text, href, tooltip, roles } from '../../api/Const';
import { useDjTranslate } from '../../hooks/useDjTranslate';

/**
 * Simple text link shown only when sidebar is open
 */
export const TextLink = ({ widget }: { widget: Widget }) => {
    const [isOpen] = useSidebarState();
    const translate = useDjTranslate();

    if (!isOpen) return null;

    return (
        <MuiLink
            component={RouterLink}
            to={widget.href || '/'}
            underline="hover"
            color="text.primary"
            sx={{
                fontSize: '0.9rem',
                display: 'inline-block',
                mt: 1,
                mx: 'auto',
                textAlign: 'center',
            }}
            title={translate(widget.tooltip)}
        >
            {translate(widget.text || 'Link')}
        </MuiLink>
    );
};

export const config = {
    id: 'text-link',
    title: 'Text Link (Sidebar)',
    description: 'Textlink nur sichtbar bei geöffneter Sidebar',
    version: 1,
    icon: 'link',
    controls: {
        type: 'autoform',
        schema: {
            properties: {
                text: text,
                href: href,
                tooltip: tooltip,
                roles: roles
            }
        }
    }
};
