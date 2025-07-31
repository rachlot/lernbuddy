import { IconTextLink, config as iconTextLinkConfig } from "./widgets/HelperWidgets/IconTextLink";
import { LogoutButton, config as logoutButtonConfig } from "./widgets/HelperWidgets/ContainedButton";
import { TextLink, config as textLinkConfig } from './widgets/HelperWidgets/TextLink';

import { AskLernbuddyStyle, config as AskLernbuddyStyleConfig } from "./widgets/AskLernbuddyStyle";

import { configSettingsPage } from "./widgets/SettingsPage";
import { SettingsPage } from "./widgets/SettingsPage";

/**
 * extension point for custom widgets
 * Please refer to the section "Developing a Custom Widget" in the documentation
 * 
 * Custom widgets is an array of objects with the following structure:
 * 
 * widget: the TSX element that gets passed the widget configuration and that draws the actual HTML
 * config: the widget metadata that contains title, icon, and the form used to edit the widget
 */
export const customWidgets = [
    {
        widget: IconTextLink,
        config: iconTextLinkConfig
    },
    {
        widget: TextLink,
        config: textLinkConfig,
    },
    {
        widget: AskLernbuddyStyle,
        config: AskLernbuddyStyleConfig
    },
    {
        widget: SettingsPage,
        config: configSettingsPage
    }
    
]