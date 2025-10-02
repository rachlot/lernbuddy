import { Box, Button, CardContent, CircularProgress, Alert, Typography } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import { useEffect, useState } from "react";
import { LocalesMenuButton, LoginForm, useLocaleState, useLogin, useNotify, useTimeout } from "react-admin";
import { Legal } from "../components/Legal";
import authProvider from "./AuthProvider";
import loginConfig from "./LoginConfig";
import CreateUserButton from "./firebase/DialogCreateUser";
import ForgotPasswordButton from "./firebase/DialogPasswordReset";
import { firebaseApp } from "./firebase/FirebaseApp";
import { OutlinedButton } from "../widgets/HelperWidgets/OutlinedButton";
import { Link } from "react-router-dom";

const LoginFormEx = (props: any) => {

  const [locale] = useLocaleState()

  const [loading, setLoading] = useState(false);

  const [autoOff, setAutoOff] = useState(false);
  const login = useLogin();
  const notify = useNotify();
  const adminMode = window.location.search === "?admin";
  const autoTimeout = !adminMode && loginConfig?.autoLogin?.timeout !== undefined ? loginConfig?.autoLogin?.timeout : undefined;
  const timeout = useTimeout(autoTimeout !== undefined ? autoTimeout : 7 * 24 * 3600 * 1000, "dj-login-timer");
  firebaseApp.auth();
  
  const [isPageOne, setIsPageOne] = useState(true);
  const handleStart = () => {
    if(isPageOne == true){
        setIsPageOne(false)
    }
    else{
        setIsPageOne(true)
    }
  }

  const handleLogin = async (info: any) => {
    if (info.key !== undefined)
      authProvider.setConfigIndex(info.key);
    setLoading(true);
    try {
      await login(info); // Do not provide code, just trigger the redirection
    } catch (error) {
      // Handle errors from AuthProvider (like Firebase popup-closed etc)
      setLoading(false);

      if ((error as Error).message === 'User does not have the role required to read table Table in database config') {
        if (loginConfig.i18n[locale]?.noPrivilegeButton)
          notify(
            <Alert severity="warning" action={<Button onClick={() => document.location = loginConfig.i18n[locale]?.noPrivilegeURL} color="inherit" size="small">{loginConfig.i18n[locale]?.noPrivilegeButton}</Button>}>
              {loginConfig.i18n[locale]?.noPrivilege}.
            </Alert>,
            { autoHideDuration: 20000 }
          )
        else
          notify(loginConfig.i18n[locale]?.noPrivilege, { type: 'warning', autoHideDuration: 20000 })
      }
      else
        notify((error as Error).message, { type: 'error' });
    }
  };

  // Stop auto login if any key is pressed or mouse clicked
  useEffect(() => {
    const cb = () => {
      //console.log("AutoLogin off");
      setAutoOff(true);
    }

    // Set title
    if (loginConfig.title || loginConfig.signInTabText)
      document.title = loginConfig.title || loginConfig.signInTabText;

    document.body.addEventListener('click', cb);
    window.addEventListener("keydown", cb);
    return () => {
      document.body.removeEventListener("click", cb);
      window.removeEventListener("keydown", cb);
    }
  }, []);

  // Handle auto-Login after timeout
  useEffect(() => {
    if (timeout && !autoOff) {
      let target = loginConfig?.autoLogin?.target;
      if (target === "guest")
        gp();
      else {
        console.log("autoLogin", target)
        handleLogin(target || { key: 0 });
      }
    }
  }, [timeout, autoOff]);

  const autoSecs = autoTimeout >= 1000 ? autoTimeout / 1000 : 0;
  const [count, setCount] = useState(autoSecs);
  useEffect(() => {
    if (autoOff)
      setCount(0);
    else if (autoSecs && count > 0) {
      setTimeout(() => setCount(count - 1), 1000);
    }
  }, [autoSecs, count, autoOff]);

  const gp = () => handleLogin(JSON.parse(atob('eyJ1c2VybmFtZSI6Imd1ZXN0QGRhc2hqb2luLmNvbSIsInBhc3N3b3JkIjoiSS5hbS5ndWVzdCEifQ==')))

  const emailLoginEnabled = loginConfig.emailLoginEnabled || adminMode

  // eslint-disable-next-line 
  useEffect(() => {
    if (!emailLoginEnabled)
      if (!loginConfig.providers)
        if (!loginConfig.openIdConfigs)
          if (loginConfig.guestLoginEnabled)
            gp()
    // eslint-disable-next-line
  }, []);

  const providers = loginConfig.providers?.split(" ");

    return (
      <div>
        <Legal />
        <div style={{ textAlign: "center" }}>{loginConfig.signInTabText}{count ? " (" + count + ")" : ""}</div>
  
        {emailLoginEnabled && (
          <div>
            <LoginForm {...props}></LoginForm>
            {loginConfig.passwordResetEnabled && <ForgotPasswordButton  {...props}></ForgotPasswordButton>}
            {loginConfig.registrationEnabled && <CreateUserButton  {...props}></CreateUserButton>}
          </div>
        )}
        <CardContent>
          {providers && (providers).map((provider: string) =>
            <div key={provider} style={{ paddingTop: "5px" }}><Button
              type="button"
              color="primary"
              variant="outlined"
              startIcon={provider === 'google' ? <GoogleIcon /> : undefined}
              onClick={() => handleLogin({ provider })}
              disabled={loading}
              fullWidth
            >
              {loading && (
                <CircularProgress sx={{ marginRight: 1 }} size={18} thickness={2} />
              )}
              {loginConfig.i18n[locale]?.continueWith} {provider}
            </Button><br />
            <Button
              component={Link}
              type="button"
              to="/datenschutz"
              sx={{ mt: "24px"}}
              fullWidth
              color="primary"
              variant="outlined"
            >
              Zum Datenschutzstatement
            </Button>
            </div>
          )}
  
          {Object.entries(loginConfig.openIdConfigs || {}).map(([key, config]: [any, any]) =>
            <div key={key} style={{ paddingTop: "5px" }}><Button
              type="button"
              color="primary"
              variant="contained"
              onClick={() => handleLogin({ key })}
              disabled={loading}
              fullWidth
            >
              {loading && (
                <CircularProgress sx={{ marginRight: 1 }} size={18} thickness={2} />
              )}
              {config?.name}
            </Button><br />
            </div>
          )}
          {loginConfig.guestLoginEnabled && <div style={{ paddingTop: "5px" }}><Button
            type="button"
            color="primary"
            variant="contained"
            onClick={gp}
            disabled={loading}
            fullWidth
          >
            {loading && (
              <CircularProgress sx={{ marginRight: 1 }} size={18} thickness={2} />
            )}
            {loginConfig.i18n[locale]?.guest}
          </Button><br />
          </div>
          }
          {loginConfig.locales.length > 1 && <><br></br>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <LocalesMenuButton languages={loginConfig.locales.map((l: string) => {
                return {
                  locale: l,
                  name: l
                }
              })}></LocalesMenuButton>
            </Box></>}
        </CardContent>
      </div >
    );
  
};

export default LoginFormEx;