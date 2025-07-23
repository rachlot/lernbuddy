import { IconButton, InputBase, Paper, Box } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import { Widget } from "../model/widget"
import { text, title } from "../api/Const"
import { useState } from "react"
import { ChatField } from "./ChatField"

export const QuizModusPage = ({ widget }: { widget: Widget }) => {
    const [value, setValue] = useState("")

    const handleSend = () => {
        console.log("Send:", value)
        setValue("") // optional: clear input after sending
    }

            return (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        width: "100%",
                        height: "95vh", // Volle Seitenhöhe
                        paddingBottom: "40px", // Abstand zum unteren Rand
                        boxSizing: "border-box", // padding zählt zur Höhe
                    }}
                >
                    <ChatField widget={widget}></ChatField>
                </Box>
    )
}

export const configQuizModusPage = {
    id: 'QuizModusPage',
    title: 'chatter2000',
    description: 'Renders a SMILES string as a 3D molecule',
    version: 1,
    controls: {
        type: 'autoform',
        schema: {
            properties: {
                title: title,
                text: text
            }
        }
    }
}