import { Button } from "ra-ui-materialui";
import React from "react";
import { Link } from "react-router-dom";

const DatenschutzPage = () => {
  return (
    <div style={{ marginLeft: "48px", marginRight: "48px" }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2 style={{ textAlign: 'left' }}>Datenschutz</h2>
            <Button
                component={Link}
                to="/login"
                sx={{ mt: "24px", maxWidth: "fit-content" }}
                fullWidth
                color="primary"
                variant="outlined"
            >
                Zurück zum Login
            </Button>
        </div>

        <h3 style={{ textAlign: 'left' }}>Webanalytics Matomo</h3>
        <p style={{ textAlign: 'left' }}>
            Für die Evaluation des Lernbuddys während der Nutzung verwenden wir das Webanalytics-Tool Matomo. Diese Methode ermöglicht es, wertvolle Nutzungsdaten in der natürlichen Lernumgebung zu erfassen, ohne die Nutzer:innen zu beeinträchtigen. Da eine optimale Benutzererfahrung essenziell ist, erhalten wir so authentische Einblicke in das tatsächliche Nutzungsverhalten.
            Durch die Verwendung des datenschutzkonformen Tools Matomo Analytics werden technische Zugriffsdaten wie anonymisierte IP-Adressen, Seitenaufrufe, Verweildauer und Geräteinformationen erfasst. Sämtliche Daten werden unter strikter Einhaltung der DSGVO-Richtlinien mittels der Matomo Cloud erfasst und verarbeitet und selbstverständlich werden die Daten nicht an Dritte oder Werbenutzung weitergegeben. Die Plattform ist so konfiguriert, dass keinerlei personenbezogene Informationen gespeichert werden. Insbesondere bei den Session Recordings wird durch entsprechende Einstellungen sichergestellt, dass sensible Nutzerdaten wie Benutzernamen vollständig ausgeblendet bleiben. Für den ordnungsgemäßen Betrieb der Anwendung ist die Speicherung von Nutzer-E-Mail-Adressen unerlässlich, diese erfolgt jedoch ausschließlich auf den dedizierten Anwendungsservern und bleibt von der Matomo-Infrastruktur getrennt. Die Versuchsleitung erhält während der Speicherphase keinen Zugriff auf nicht-anonymisierte Daten. Es ist gewährleistet, dass das Forschungsteam ausschließlich mit anonymisierten Datensätzen arbeitet, da der Zugang zu identifizierbaren Informationen vollständig ausgeschlossen ist. Auf Grund der vollständigen Anonymisierung der Daten ist ein nachträglicher Widerruf nicht möglich.
        </p>

        <h3 style={{ textAlign: 'left' }}>Webanalytics zur Evaluation des Lernbuddys</h3>
        <p style={{ textAlign: 'left' }}>
            Nutzereingaben sowie Nutzungsstatistiken werden mithilfe eines webbasierten Analysetools erhoben und auf dedizierten Anwendungsservern gespeichert sowie analysiert.
            Die Teilnehmer:innen können der Weiterverarbeitung der Nutzereingaben im Datenschutz Banner per opt-in Formulierung widersprechen oder zustimmen. Die in den Textfeldern erfassten Inhalte werden auf dedizierten Anwendungsservern gespeichert. Parallel dazu dokumentieren wir Nutzungsstatistiken wie Seitenaufrufe und Verweildauern, um Interaktionsmuster zu identifizieren. Die Erfassung erfolgt ausschließlich über die Infrastruktur der Lernbuddy-Anwendung und ist unabhängig von der Matomo Cloud-Umgebung. Aus technischen und funktionalen Gründen ist eine vollständige Anonymisierung der Daten zum Zeitpunkt der Erhebung nicht möglich. Die Daten werden der Studienleitung jedoch in vollständig anonymisierter Form für weitere Verarbeitungsschritte übermittelt. Eine Rückführung auf einzelne Personen ist zu keinem Zeitpunkt durch die Studienleitung möglich.
        </p>

        <h3 style={{ textAlign: 'left' }}>Matomo Cloud Terms of Service</h3>

        <h3 style={{ textAlign: 'left' }}>Customer Content Ownership, Copyright and Trademark</h3>
        <ul>
            <li>You are solely responsible for any Customer Content. We claim no intellectual property rights over Customer Content</li>
            <li>If you provide us with feedback, suggestions, and ideas about the Service (“Feedback”), you agree that we may use and incorporate the Feedback in any way...</li>
            <li>Unless otherwise expressly stated, we own all intellectual property rights to the Service...</li>
            <li>“InnoCraft”, the InnoCraft logo, “Matomo” [...] may not be copied, imitated or used...</li>
            <li>You grant us permission to use your company name and logo for promotional purposes...</li>
        </ul>

        <h3 style={{ textAlign: 'left' }}>Privacy and security of Customer Data</h3>
        <ul>
            <li>When you use the Service to measure Customer App or Website properties, InnoCraft will receive and process info about End Users.</li>
            <li>You are responsible for compliance with privacy and data protection laws.</li>
            <li>You instruct us to process End User Data to provide the Service.</li>
            <li>Processing is governed by the Matomo Cloud Data Processing Agreement (DPA).</li>
            <li>Each party agrees to handle data confidentially and securely.</li>
            <li>You own your Customer Data, including End User Data.</li>
            <li>You must not submit sensitive data. Sensitive Information includes:</li>
            <ul>
            <li>Passwords, credentials</li>
            <li>Credit card and payment data</li>
            <li>Social Security, driver's license, passport numbers</li>
            <li>Financial, health, biometric data</li>
            <li>PII of children under 13</li>
            <li>Real-time geolocation data</li>
            <li>Highly confidential business strategies, legal communication, etc.</li>
            </ul>
            <li>We process data in accordance with our Privacy Policy at https://matomo.org/matomo-cloud-privacy-policy/.</li>
            <li>We may monitor accounts for compliance and security purposes.</li>
            <li>We collect website data per our Website Privacy Policy at https://matomo.org/privacy-policy/.</li>
            <li>It's your responsibility to inform your end users via your own privacy policy.</li>
        </ul>

        <h3 style={{ textAlign: 'left' }}>General Conditions</h3>
        <ul>
            <li>Technical support via email for paying customers without guaranteed response time.</li>
            <li>We use third-party vendors for hosting, software, etc.</li>
            <li>Data may be transmitted unencrypted across networks and adapted as needed.</li>
            <li>This agreement is governed by New Zealand law.</li>
            <li>Waivers must be written and signed.</li>
            <li>These Terms override all prior versions.</li>
            <li>We may update Terms with 30 days' notice (or immediately in urgent cases).</li>
        </ul>
    </div>
  )
};

export default DatenschutzPage;