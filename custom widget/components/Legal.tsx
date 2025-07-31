/*import { useLocaleState } from "react-admin";
import CookieConsent from "react-cookie-consent";
import loginConfig from "../login/LoginConfig";

/**
 * Legal consent text
 * needs to be set before we log in
 * thus cannot be part of UISettings
 
export const Legal = () => {
    const [locale] = useLocaleState()
    return <CookieConsent 
    enableDeclineButton 
    buttonText={"Ich stimme zu "}
    declineButtonText="Ich wiederspreche">
        <span dangerouslySetInnerHTML={{ __html: loginConfig.i18n[locale]?.legal }} />
    </CookieConsent>
}*/

import { useLocaleState } from "react-admin";
import CookieConsent from "react-cookie-consent";
import loginConfig from "../login/LoginConfig";
import { loadMatomoAndTrack, activateMatomo  } from "../matomo/tracking-matomo";

export const Legal = () => {
    const [locale] = useLocaleState();

    const handleAccept = () => {
        loadMatomoAndTrack();       // Matomo-Script dynamisch laden
        activateMatomo (); // Consent an Matomo übermitteln
    };

    const handleDecline = () => {
        // Hier brauchst du nichts weiter zu tun,
        // Tracking bleibt inaktiv, Matomo wird nie geladen
        console.log("Tracking wurde abgelehnt.");
    };

    return (
        <div>
        <CookieConsent
            enableDeclineButton
            onAccept={handleAccept}
            onDecline={handleDecline}
            buttonText="Ich stimme zu"
            declineButtonText="Ich widerspreche"
            style={{
                background: "#2d2d2d",
                color: "#fff",
                textAlign: "center",
                padding: "2em",
                fontSize: "1rem",
                display: "block"
            }}
            buttonStyle={{
                backgroundColor: "#FFD600",
                color: "#000",
                padding: "0.75em 1.5em",
                margin: "1em",

                border: "none",
                cursor: "pointer",
            }}
            declineButtonStyle={{
                backgroundColor: "#ccc",
                color: "#000",
                padding: "0.75em 1.5em",
                margin: "1em",

                border: "none",
                cursor: "pointer",
            }}
            contentStyle={{
                display: "block",
                alignItems: "center",
                margin: "0 auto",
            }}
        >
            <span
                style={{ lineHeight: "1.6",
                    maxWidth: "700px",
                    textAlign: "left" }}
                dangerouslySetInnerHTML={{ __html: "<p><strong>Der Lernbuddy ist Teil eines Forschungsprojekts der Anästhesie am Universitätsklinikum Würzburg.</strong></p><p>Um den Lernbuddy weiterentwickeln zu können, benötigen wir deine Daten zur wissenschaftlichen Auswertung. Mit deiner Zustimmung erklärst du dich damit einverstanden, dass deine Daten <strong>ausschließlich anonymisiert</strong> verarbeitet werden – selbstverständlich unter strikter Beachtung der geltenden Datenschutzvorgaben.</p><p><strong>Möchtest du der Verwendung deiner Daten für Forschungszwecke zustimmen?</strong></p>" }}
            />
        </CookieConsent>
        </div>
    );
};

