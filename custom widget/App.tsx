import { Admin, CustomRoutes, Loading, Resource, useAuthState, useI18nProvider } from "react-admin";
import { Route } from "react-router";
import { dataProvider } from "./api/DjDataProvider";
import { Page } from "./page/Page";
import { Search } from "./page/Search";
import { TablePage } from "./page/TablePage";
import { util } from "./api/Util";
import { RecordPage } from "./page/RecordPage";
import { DailyGoalProvider } from './context/DailyGoalContext';
import MyLayout from "./MyLayout";
import LoginPage from "./login/LoginSetupPage";
import authProvider from "./login/AuthProvider";
import authCallback from "./login/AuthCallback";
import { profile } from "./api/Profile";
import { Navigate } from "react-router-dom";
import { ToolbarPage } from "./page/ToolbarPage";
import { createContext, ReactNode, useEffect, useState } from "react";
import { render } from "./api/Render";
import { ModalProgress } from "./components/ModalProgress";
import { ModalDialog } from "./components/ModalDialog";
import polyglotI18nProvider from 'ra-i18n-polyglot';
import { merge } from 'lodash'
import loginConfig from "./login/LoginConfig";
import en from 'ra-language-english';
import fr from 'ra-language-french';
import { formalGermanMessages as de } from '@haleos/ra-language-german'
import DatenschutzPage from "./login/DatenschutzPage";


// @ts-ignore
import ititalianMessages from 'ra-language-italian';
// @ts-ignore
import spanishMessages from '@blackbox-vision/ra-language-spanish';
import { LevelProvider } from "./context/LevelContext";

/**
 * global context to indicate whether we are in edit mode
 */
export const EditContext = createContext<boolean>(false)

/**
 * global context for container foreach value
 */
export const ValueContext = createContext<any>(undefined)

/**
 * Helper component that makes sure RA authProvider.checkAuth() is called
 */
const Auth = ({ children }: { children: ReactNode }) => {
  const auth = useAuthState({}, false);
  // console.log("AuthState", auth);

  if (auth.isLoading)
    return <Loading />

  return <>
    {children}
  </>
}

/**
 * main react admin entry component
 */
const App = () => {

  const [, setDdl] = useState(0)
  render.setDdl = () => setDdl(Date.now())

  const [edit, setEdit] = useState(false);
  render.setEdit = setEdit

  const [, setProfileLoaded] = useState(false);
  render.setProfileLoaded = setProfileLoaded

  const getTables = async (): Promise<any> => {
    try {
      return await dataProvider.tableLabels()
    }
    catch (error) {
      return Promise.resolve([])
    }
  }

  const [currentVersion, setCurrentVersion] = useState<string>("v2");
      
      useEffect(() => {
          // Beim ersten Laden die Version aus localStorage holen
          const storedVersion = localStorage.getItem("version") || "v2"; // Falls keine Version vorhanden, v2 als Standard
          setCurrentVersion(storedVersion);
      }, []);

  let translations = profile.local('translations')
  if (!translations)
    translations = {}
  translations.de = merge(de, translations.de)
  translations.en = merge(en, translations.en)
  translations.it = merge(ititalianMessages, translations.it)
  translations.fr = merge(fr, translations.fr)
  translations.es = merge(spanishMessages, translations.es)

  if(currentVersion === "v1"){
    return <EditContext.Provider value={edit}>
    <ModalProgress />
    <ModalDialog />
    <DailyGoalProvider>
    <LevelProvider>
    <Admin
      i18nProvider={polyglotI18nProvider(
        locale => translations[locale] ? translations[locale] : en,
        loginConfig.defaultLocale,
        loginConfig.locales.map((locale: string) => { return { name: locale, locale } }),
        { allowMissing: true }
      )}
      disableTelemetry
      dataProvider={dataProvider}
      theme={profile.getUISettings().theme}
      darkTheme={profile.getUISettings().darkTheme}
      layout={MyLayout}
      loginPage={LoginPage}
      authProvider={authProvider} authCallbackPage={authCallback}
      requireAuth={true}
      dashboard={() => <Navigate to={profile.getUISettings().homepage}></Navigate>}
    >
      {async (permissions: any) => {
        const tables = await getTables()
        let i = 0
        return <>
          {Object.keys(tables).map((t: string) => <Resource
            key={i++}
            name={util.toResource(util.parseTableID(t))}
            list={<Auth><TablePage /></Auth>}
            edit={<Auth><RecordPage /></Auth>}
            recordRepresentation={tables[t] ? (record) => t === 'dj/config/Property' ? (record.title ? record.title : record.ID) : util.label(tables[t], record) : undefined}
          />)}
          <CustomRoutes>
            { /* TODO: this implies that 'search' and 'page' are no legal db names */}
            <Route path="search/*" element={<Auth><Search /></Auth>}></Route>
            <Route path="page/*" element={<Auth><Page></Page></Auth>}></Route>
            <Route path="config/widget/dj-toolbar" element={<Auth><ToolbarPage></ToolbarPage></Auth>}></Route>
            <Route path="config/widget/dj-sidenav" element={<Auth><ToolbarPage></ToolbarPage></Auth>}></Route>
          </CustomRoutes>
          <CustomRoutes noLayout>
            <Route path="full/*" element={<Auth><Page /></Auth>}></Route>
            <Route path="/datenschutz" element={<DatenschutzPage />} />
          </CustomRoutes>
        </>
      }}
    </Admin>
    </LevelProvider>
    </DailyGoalProvider>
  </EditContext.Provider >
  }
  else if(currentVersion === "v2"){
    return <EditContext.Provider value={edit}>
      <ModalProgress />
      <ModalDialog />
      <DailyGoalProvider>
      <LevelProvider>
      <Admin
        i18nProvider={polyglotI18nProvider(
          locale => translations[locale] ? translations[locale] : en,
          loginConfig.defaultLocale,
          loginConfig.locales.map((locale: string) => { return { name: locale, locale } }),
          { allowMissing: true }
        )}
        disableTelemetry
        dataProvider={dataProvider}
        theme={profile.getUISettings().theme}
        darkTheme={profile.getUISettings().darkTheme}
        layout={MyLayout}
        loginPage={LoginPage}
        authProvider={authProvider} authCallbackPage={authCallback}
        requireAuth={true}
        dashboard={() => <Navigate to={profile.getUISettings().homepage}></Navigate>}
      >
        {async (permissions: any) => {
          const tables = await getTables()
          let i = 0
          return <>
            {Object.keys(tables).map((t: string) => <Resource
              key={i++}
              name={util.toResource(util.parseTableID(t))}
              list={<Auth><TablePage /></Auth>}
              edit={<Auth><RecordPage /></Auth>}
              recordRepresentation={tables[t] ? (record) => t === 'dj/config/Property' ? (record.title ? record.title : record.ID) : util.label(tables[t], record) : undefined}
            />)}
            <CustomRoutes>
              { /* TODO: this implies that 'search' and 'page' are no legal db names */}
              <Route path="search/*" element={<Auth><Search /></Auth>}></Route>
              <Route path="page/*" element={<Auth><Page></Page></Auth>}></Route>
              <Route path="config/widget/dj-toolbar2" element={<Auth><ToolbarPage></ToolbarPage></Auth>}></Route>
              <Route path="config/widget/dj-sidenav" element={<Auth><ToolbarPage></ToolbarPage></Auth>}></Route>
            </CustomRoutes>
            <CustomRoutes noLayout>
              <Route path="full/*" element={<Auth><Page /></Auth>}></Route>
              <Route path="/datenschutz" element={<DatenschutzPage />} />
            </CustomRoutes>
          </>
        }}
      </Admin>
      </LevelProvider>
      </DailyGoalProvider>
    </EditContext.Provider >
  }
}

export default App;
