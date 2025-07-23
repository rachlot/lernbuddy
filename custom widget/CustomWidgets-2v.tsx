import { config } from "./widgets/Smiles";
import { Smiles } from "./widgets/Smiles";
import { IconTextLink, config as iconTextLinkConfig } from "./widgets/IconTextLink";

import { configQuizModusPage } from "./widgets/QuizModusPage";
import { QuizModusPage } from "./widgets/QuizModusPage";

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
        widget: Smiles,
        config: config,
    },
    {
        widget: IconTextLink,
        config: iconTextLinkConfig
    },
    {
         widget: QuizModusPage,
         config: configQuizModusPage
     }
]