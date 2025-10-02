import { Box, Button, IconButton, MenuItem, Select, Typography } from "@mui/material"
import FastForwardIcon from "@mui/icons-material/FastForward"
import { Widget } from "../model/widget"
import { text, title } from "../api/Const"
import { useEffect, useState } from "react"
import { ChatField } from "./HelperWidgets/ChatField"
import { ChatTextBlock } from "./HelperWidgets/ChatTextBlock"
import { LevelTopicSelect } from "./HelperWidgets/LevelTopicSelect";
import { useDailyGoal } from "../context/DailyGoalContext";
import { useLevel } from "../context/LevelContext";
import { ContainedButton } from "./HelperWidgets/ContainedButton"
import { SimpleInputField } from "./HelperWidgets/SimpleInputField"
import authProvider from "../login/AuthProvider"
import { OutlinedButton } from "./HelperWidgets/OutlinedButton"
import { InputFieldNumbers } from "./HelperWidgets/InputFieldNumbers"

const useCurrentVersion = () => {
    const [version, setVersion] = useState("v2"); // Standardwert auf v2 gesetzt

    useEffect(() => {
        // Version aus dem localStorage lesen
        const storedVersion = localStorage.getItem("version") || "v2"; // Wenn keine Version gespeichert, Standardwert v2 verwenden
        setVersion(storedVersion);
    }, []); // Leer-Array sorgt dafür, dass es nur beim ersten Rendern ausgeführt wird

    return version;
};

export const SettingsPage = ({ widget }: { widget: Widget }) => {

    const [isPageOne, setIsPageOne] = useState(true)
    const [messages, setMessages] = useState<
        { text: string; align: "left" | "right"; withStripe: boolean }[]
    >([])
    const { dailyGoal, setDailyGoal } = useDailyGoal();
    const { level, setLevel } = useLevel();
    const currentVersion = useCurrentVersion();

    const handleStart = () => {
        if(isPageOne == true){
            setIsPageOne(false)
        }
        else{
            setIsPageOne(true)
        }
    }

    // Funktion zum Wechseln der Version (V1 <-> V2)
    const handleVersionChange = () => {
        const currentVersion = localStorage.getItem("version");
        const newVersion = currentVersion === "v1" ? "v2" : "v1"; // Wenn v1, wechsle zu v2, andernfalls zurück zu v1
        localStorage.setItem("version", newVersion);
        window.location.reload(); // Seite neu laden, um die Version anzuwenden
    };

    const handleChatSend = (chatMessage: string) => {
        console.log(chatMessage)
        if (!chatMessage.trim()) return
        addTextBlock(chatMessage, "right", false)
        setTimeout(() => {
            addTextBlock("Automatische Antwort", "left", true)
        }, 5000)
    }

    const handleGoalChange = (value: number) => {
        console.log("Aktuelles Ziel:", value);
        localStorage.setItem("dailyGoal", value.toString());
    };

    const handleLogout = async () => {
        console.log("logging out session"); 
        authProvider.logout();
        // Get rid of OpenID callback parameters in URL:
        window.location.href = window.location.origin;
      };

    const handleTopicSelected = (value: string) => {
        console.log(value)
    }

    const addTextBlock = (
        text: string,
        align: "left" | "right",
        withStripe: boolean
    ) => {
        setMessages((prev) => [
            ...prev,
            {
                text: text,
                align: align, // or "right"
                withStripe: withStripe, // or false
            },
        ])
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: "100%",
                height: "85vh", // Volle Seitenhöhe
                paddingBottom: "40px",
                paddingTop: "20px",
                boxSizing: "border-box",
            }}
        >


            {/*   ------------- Page 1 ------------------------------------------------    */}
            <Box
                style={{ display: isPageOne ? "flex" : "none" }}
                sx={{
                    width: "70%",
                    maxWidth: 500,
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    height: 'inherit'
                }}
            >
            {currentVersion === "v2" && (
                <>
                <Typography variant="h6" sx={{textAlign: 'left'}} >
                    Level
                </Typography>
                <LevelTopicSelect widget={widget} onChange={(inputValue: number) => setLevel(inputValue)}></LevelTopicSelect>
                <Typography variant="h6" sx={{textAlign: 'left'}} >
                    Aktuelle Eingabe: {localStorage.getItem("level")}
                </Typography>
                <Typography variant="h6" sx={{textAlign: 'left'}} >
                    Daily Goal
                </Typography>
                <InputFieldNumbers widget={widget} onData={(inputValue: number) => setDailyGoal(inputValue)}></InputFieldNumbers>
                <Typography variant="h6" sx={{textAlign: 'left'}} >
                    Aktuelle Eingabe: {localStorage.getItem("dailyGoal")}
                </Typography>
                </>
            )}
                <Typography variant="h6" sx={{textAlign: 'left'}} >
                    Version
                </Typography>
                <Typography variant="h7" sx={{textAlign: 'left'}} >
                    Du nutzt aktuell v2.1, du kannst jederzeit zu v1.1 downgraden.
                </Typography>
                <OutlinedButton onClick={handleVersionChange}>{currentVersion === "v1" ? "Upgraden auf v2.1" : "Downgraden auf v1.1"}</OutlinedButton>
                <Typography variant="h6" sx={{textAlign: 'left'}} >
                    Datenschutz
                </Typography>
                <OutlinedButton onClick={handleStart}>Zum Datenschutzstatement</OutlinedButton>
            {currentVersion === "v2" && (
                <>
                <Typography variant="h6" sx={{textAlign: 'left'}} >
                    Logout
                </Typography>

                <ContainedButton onClick={handleLogout}>Logout</ContainedButton>
                </>
            )}
            </Box>

            {/*   ------------- Page 2 -------------------------------------    */}
            <Box
                style={{ display: isPageOne ? "none" : "flex" }}
                sx={{
                    width: "70%",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    height: 'inherit'
                }}
            >
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography variant="h6" sx={{textAlign: 'left'}} >
                        Datenschutz
                    </Typography>
                    <ContainedButton onClick={handleStart}>Zurück</ContainedButton>
                </Box>
                <Typography variant="h7" sx={{textAlign: 'left'}} >
                    Webanalytics Matomo
                </Typography>
                <Typography variant="h7" sx={{textAlign: 'left'}} >
                    Für die Evaluation des Lernbuddys während der Nutzung verwenden wir das Webanalytics-Tool Matomo. Diese Methode ermöglicht es, wertvolle Nutzungsdaten in der natürlichen Lernumgebung zu erfassen, ohne die Nutzer:innen zu beeinträchtigen. Da eine optimale Benutzererfahrung essenziell ist, erhalten wir so authentische Einblicke in das tatsächliche Nutzungsverhalten.
                    Durch die Verwendung des datenschutzkonformen Tools Matomo Analytics werden technische Zugriffsdaten wie anonymisierte IP-Adressen, Seitenaufrufe, Verweildauer und Geräteinformationen erfasst. Sämtliche Daten werden unter strikter Einhaltung der DSGVO-Richtlinien mittels der Matomo Cloud erfasst und verarbeitet und selbstverständlich werden die Daten nicht an Dritte oder Werbenutzung weitergegeben. Die Plattform ist so konfiguriert, dass keinerlei personenbezogene Informationen gespeichert werden. Insbesondere bei den Session Recordings wird durch entsprechende Einstellungen sichergestellt, dass sensible Nutzerdaten wie Benutzernamen vollständig ausgeblendet bleiben. Für den ordnungsgemäßen Betrieb der Anwendung ist die Speicherung von Nutzer-E-Mail-Adressen unerlässlich, diese erfolgt jedoch ausschließlich auf den dedizierten Anwendungsservern und bleibt von der Matomo-Infrastruktur getrennt. Die Versuchsleitung erhält während der Speicherphase keinen Zugriff auf nicht-anonymisierte Daten. Es ist gewährleistet, dass das Forschungsteam ausschließlich mit anonymisierten Datensätzen arbeitet, da der Zugang zu identifizierbaren Informationen vollständig ausgeschlossen ist. Auf Grund der vollständigen Anonymisierung der Daten ist ein nachträglicher Widerruf nicht möglich.
                </Typography>
                <Typography variant="h7" sx={{textAlign: 'left'}} >
                    Webanalytics zur Evaluation des Lernbuddys
                </Typography>
                <Typography variant="h7" sx={{textAlign: 'left'}} >
                    Nutzereingaben sowie Nutzungsstatistiken werden mithilfe eines webbasierten Analysetools erhoben und auf dedizierten Anwendungsservern gespeichert sowie analysiert.
                    [SH3] Die Teilnehmer:innen können der Weiterverarbeitung der Nutzereingaben im Datenschutz Banner per opt-in Formulierung widersprechen oder zustimmen. Die in den Textfeldern erfassten Inhalte werden auf dedizierten Anwendungsservern gespeichert. Parallel dazu dokumentieren wir Nutzungsstatistiken wie Seitenaufrufe und Verweildauern, um Interaktionsmuster zu identifizieren. Die Erfassung erfolgt ausschließlich über die Infrastruktur der Lernbuddy-Anwendung und ist unabhängig von der Matomo Cloud-Umgebung. Aus technischen und funktionalen Gründen ist eine vollständige Anonymisierung der Daten zum Zeitpunkt der Erhebung nicht möglich. Die Daten werden der Studienleitung jedoch in vollständig anonymisierter Form für weitere Verarbeitungsschritte übermittelt. Eine Rückführung auf einzelne Personen ist zu keinem Zeitpunkt durch die Studienleitung möglich. 
                </Typography>
                <Typography variant="h7" sx={{textAlign: 'left'}} >
                    Matomo Cloud Terms of Service
                </Typography>
                <Typography variant="h7" sx={{textAlign: 'left'}} >Customer Content Ownership, Copyright and Trademark
                    <ul>
                        <li>You are solely responsible for any Customer Content. We claim no intellectual property rights over Customer Content</li>
                        <li>If you provide us with feedback, suggestions, and ideas about the Service (“Feedback”), you agree that we may use and incorporate the Feedback in any way, including in future enhancements and modifications to the Service, without payment or attribution to you.</li>
                        <li>Unless otherwise expressly stated, we own all intellectual property rights to the Service, including, without limitation, rights in copyrighted works, trademarks, designs, inventions, the look and feel of the Service. All rights reserved. You may not duplicate, copy, distribute, make derivative works or reuse any portion of our intellectual property without express written permission from InnoCraft</li>
                        <li>“InnoCraft”, the InnoCraft logo, “Matomo”, the Matomo logo and any other product or service name or slogan displayed on the Service are trademarks of InnoCraft or its affiliates, and its licensors, and may not be copied, imitated or used, in whole or in part, without the prior written permission of InnoCraft or the applicable trademark holder.</li>
                        <li>You grant us permission to use your company name and logo for promotional purposes. You may withdraw your permission at any time by no fewer than 10 days’ notice by completing the withdrawal form available at https://matomo.org/withdraw-logo/.</li>
                        
                    </ul>
                </Typography>
                <Typography variant="h7" sx={{textAlign: 'left'}} >Privacy and security of Customer Data
                    <ul>
                        <li>When you use the Service to measure Customer App or Customer Website properties, InnoCraft will receive and process on your behalf information relating to End Users.</li>
                        <li>You are responsible for ensuring that your collection of End User Data and your transfer of that End User Data to us for the purposes of us providing you with the Service complies with all privacy and data protection laws.</li>
                        <li>You instruct us to process End User Data to provide you with the Service.</li>
                        <li>Without limiting clause 9(b), InnoCraft’s processing of the End User Data is governed by the Matomo Cloud Data Processing Agreement (DPA), which forms an integral part of these Terms.</li>
                        <li>Subject to clauses 9(b) and 9(c), each party agrees to (i) handle the other party’s data in accordance with all applicable laws; and (ii) implement privacy and security measures reasonably adequate to preserve the other party data’s confidentiality and security.</li>
                        <li>You own all rights, title, and interest in or to your Customer Data (including End User Data). We obtain no rights from you to your Customer Data (including End User Data).</li>
                        <li>You must not use, and must ensure that Users do not use, the Service to send to InnoCraft sensitive information where unauthorised disclosure could cause material, severe, or catastrophic harm or impact to InnoCraft, Customer, their respective personnel, any User, End User, any data subjects or third parties. Sensitive Information includes, but is not limited to:</li>
                        <ul>
                            <li>Passwords, authentication/authorisation credentials;</li>
                            <li>Information under regulatory or contractual handling requirements (e.g., PCI, HIPAA, and state and federal data security laws) including, but not limited to:</li>
                            <li>Credit card information including credit card numbers, CIV numbers (three-digit codes for Visa and MasterCard, four-digit code for American Express) and magnetic stripe information</li>
                            <li>Social Security Numbers</li>
                            <li>Driver’s License Numbers</li>
                            <li>Passport Numbers</li>
                            <li>Government Issued Identification Numbers</li>
                            <li>Financial Account Information</li>
                            <li>Health data</li>
                            <li>Biometric data</li>
                            <li>Personally identifiable information knowingly collected from children under the age of 13 or from online services directed toward children, and</li>
                            <li>Real-time geolocation data which can identify an individual.</li>
                            <li>Business secrets deemed highly confidential (e.g., highly confidential business strategies and communications, sensitive attorney-client privileged and confidential communications).</li>
                        </ul>
                        <li>We process personal data of Customers and Users in accordance with Matomo Cloud Privacy Policy available at https://matomo.org/matomo-cloud-privacy-policy/.</li>
                        <li>You agree that InnoCraft may monitor the activity of any Customer or User account on the Service. Any such data shall be only used for the purpose of ensuring compliance with these Terms, security monitoring and providing and improving the Service.</li>
                        <li>InnoCraft may also collect registration and other information about you through InnoCraft websites. We process information collected on InnoCraft websites in accordance with our Website Privacy Policy available at https://matomo.org/privacy-policy/.</li>
                        <li>Neither our Website Privacy Policy nor the Matomo Cloud Privacy Policy describe information InnoCraft collects on Customer’s behalf from Customer App or Customer Website properties. It is Customer’s obligation to provide Customer’s own privacy policy or notice to Customer’s End Users.</li>
                    </ul>
                </Typography>
                <Typography variant="h7" sx={{textAlign: 'left'}}>
                    General Conditions
                    <ul>
                        <li>Technical support: Technical support is provided by email to paying Customers on a reasonable effort basis, without a guaranteed response time.</li>
                        <li>Third-party vendors: InnoCraft uses third-party vendors and hosting partners to provide the necessary hardware, software, networking, storage, and related technology required to run the Service.</li>
                        <li>Data transmission: You understand that the technical processing and transmission of the Service, including your Customer Content, may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices.</li>
                        <li>Governing law: This Agreement shall be governed by the laws of New Zealand, and to the maximum extent permitted by law the courts of New Zealand shall have exclusive jurisdiction to hear and determine all issues that may arise under or in relation to this Agreement and/or in connection with your use of the Service.</li>
                        <li>Waiver: Failure of InnoCraft to exercise or enforce any right or provision of the Terms does not constitute a waiver. A valid waiver must be in writing and signed by an authorised representative of InnoCraft.</li>
                        <li>Entire agreement: These Terms and any documents incorporated into these Terms by reference constitute the entire agreement between you and InnoCraft and govern your use of the Service, superseding any prior agreements between you and InnoCraft, including, but not limited to, any prior versions of the Terms.</li>
                        <li>Update: We may amend these Terms by giving you 30 days’ notice or without notice, if: (a) an immediate amendment is required for reasons outside of our control or (b) the amendment is minor or relates to new features, augmented or enhanced Services. We will notify you by email or on our website of any material changes to the Terms. If acting reasonably it can be determined that the change is materially detrimental to you, you may terminate your Subscription and receive a pro-rated refund. You must exercise the right to terminate within 10 days of being notified of the amendment.</li>
                    </ul>
                </Typography>
                
            </Box>
        </Box>
    )
}

export const configSettingsPage = {
    id: 'SettingsPage'
}