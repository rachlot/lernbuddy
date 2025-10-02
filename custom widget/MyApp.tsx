// Theming
import App from './App';
import defaultTheme from './styles/theme/defaultTheme';
import { ThemeProvider, CssBaseline } from '@mui/material';
import 'material-icons';
import 'material-icons/iconfont/outlined.css';


const ThemedApp = () => { 
    return <ThemeProvider theme={defaultTheme}><CssBaseline/><App/></ThemeProvider>
}

export default ThemedApp;
