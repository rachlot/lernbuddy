// Load logincfg.json
// Use fetch to use the app's origin because it might differ from the API

import { merge } from 'lodash'
import { resolveBrowserLocale } from 'react-admin'

const load = async () => {
    const x = await (await fetch("/assets/logincfg.json")).json()
    const def = {
        "defaultLocale": "en",
        "locales": [
            "en"
        ],
        "i18n": {
            "en": {
                "legal": "By using the Dashjoin services, you acknowledge that you have read and understand our <a style='color: inherit' href='https://dashjoin.com/legal.html#cookies' target='_blank'>Cookie Policy</a>, <a style='color: inherit' href='https://dashjoin.com/legal.html#privacy' target='_blank'>Privacy Policy</a> and our <a style='color: inherit' href='https://dashjoin.com/legal.html#terms' target='_blank'>Terms of Service</a>. Otherwise click <a style='color: inherit' href='https://dashjoin.com'>here</a> to leave.",
                "legalButtonText": "I understand",
                "newUser": "New User",
                "enterEmailAndPwd": "Enter your E-Mail and initial password",
                "receiveActivation": "You will receive an activation link",
                "email": "E-Mail",
                "createAccount": "Create Account",
                "resetPassword": "Reset Password",
                "enterEmail": "Enter your E-Mail",
                "receiveReset": "Password reset instructions will be sent",
                "guest": "Login as Guest",
                "continueWith": "Continue with",
                "noPrivilege": "Your user lacks the required privileges to use the system. Please contact your system administrator"
            },
            "de": {
                "legal": "<p><strong>Der Lernbuddy ist Teil eines Forschungsprojekts der Anästhesie am Universitätsklinikum Würzburg.</strong></p><p>Um den Lernbuddy weiterentwickeln zu können, benötigen wir deine Daten zur wissenschaftlichen Auswertung. Mit deiner Zustimmung erklärst du dich damit einverstanden, dass deine Daten <strong>ausschließlich anonymisiert</strong> verarbeitet werden – selbstverständlich unter strikter Beachtung der geltenden Datenschutzvorgaben.</p><p><strong>Möchtest du der Verwendung deiner Daten für Forschungszwecke zustimmen?</strong></p>",
                "legalButtonText": "Ich stimme zu",
                "newUser": "Neuer Benutzer",
                "enterEmailAndPwd": "E-Mail und initiales Passwort eingeben",
                "receiveActivation": "Ihnen wird ein Aktivierungslink zugeschickt",
                "email": "E-Mail",
                "createAccount": "Benutzer erstellen",
                "resetPassword": "Passwort zurücksetzen",
                "enterEmail": "E-Mail eingeben",
                "receiveReset": "Ihnen werden Anweisungen zum Zurücksetzen des Passworts zugesandt",
                "guest": "Als Gast Einloggen",
                "continueWith": "Weiter mit",
                "noPrivilege": "Ihr Benutzer verfügt nicht über die erforderlichen Berechtigungen, um das System zu nutzen. Bitte wenden Sie sich an Ihren Systemadministrator"
            }
        }
    }

    const res = merge(def, x)

    // do not merge the locales array
    if (x.locales)
        res.locales = x.locales

    if (res.defaultLocale === 'browser')
        res.defaultLocale = resolveBrowserLocale()

    return res
}

const loginConfig = await load()

export default loginConfig;
