import { IconButton, InputBase, Paper, Box } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import { Widget } from "../model/widget"
import { text, title } from "../api/Const"
import { useState } from "react"

export const ChatField = ({ widget }: { widget: Widget }) => {
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
                    <Box sx={{ width: "70%", height: "8%", minHeight:"100px" }}>
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
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Schreibe deine Antwort hier …"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            />
                            <Box 
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-end',
                                    height: '100%',
                                    paddingBottom:'8px'
                                }}>

                            <IconButton
                                type="submit"
                                sx={{
                                    p: "10px",
                                    backgroundColor: "#0047FF",
                                    color: "white",
                                    borderRadius: "12px",
                                    '&:hover': {
                                        backgroundColor: "#0033cc"
                                    }
                                }}
                                >
                                <SendIcon />
                            </IconButton>
                                </Box>
                        </Paper>
                    </Box>
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