import { IconButton, InputBase, Paper, Box } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import { Widget } from "../../model/widget"
import { text, title } from "../../api/Const"
import { useState } from "react"

export const SimpleInputField = ({ widget, onData }: { widget: Widget; onData: (data: string) => void }) => {
    const [value, setValue] = useState("")

    const handleSend = () => {
        onData(value)
        setValue("") // to clear input
      }

            return (
                    <Box sx={{ width:"100%", height: "8%", minHeight:"60px" }}>
                        <Paper
                            component="form"
                            onSubmit={(e) => {
                                e.preventDefault()
                                handleSend()
                            }}
                            sx={{
                                height:"100%",
                                p: "2px 8px",
                                display: "flex",
                                alignItems: "center",
                                borderRadius: "12px",
                                border: "1px solid #ddd",
                                boxShadow: "none",
                                backgroundColor: "#fff",
                                width: "100%",
                            }}
                        >
                            <InputBase
                                sx={{ ml: 1, flex: 1, paddingRight: '14px', paddingLeft: '14px', paddingTop: '16.5px', paddingBottom: '16.5px'}}
                                placeholder="Schreibe hier deine Anzahl auf ..."
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            />
                        </Paper>
                    </Box>
    )
}

export const configChatField = {
    id: 'ChatField',
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