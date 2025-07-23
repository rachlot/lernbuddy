import { Box, Button, MenuItem, Select, Typography } from "@mui/material"
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

    const [topic, setTopic] = useState("Kinderanästhesie")
    const [isPageOne, setIsPageOne] = useState(true)

    const handleStart = () => {
      setIsPageOne(!isPageOne)
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
                boxSizing: "border-box", 
            }}
        >
            <Box
                style={{display: isPageOne ? "flex" : "none"}}
                sx={{
                    width: "70%",
                    maxWidth: 500,
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                }}
            >
                <Typography variant="h6" sx={{ fontSize: 20 }}>
                    Welcher Lerninhalt soll abgefragt werden?
                </Typography>

                <Select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    fullWidth
                    variant="outlined"
                >
                    <MenuItem value="Kinderanästhesie">Kinderanästhesie</MenuItem>
                    <MenuItem value="Allgemeinanästhesie">Allgemeinanästhesie</MenuItem>
                    <MenuItem value="Notfallmedizin">Notfallmedizin</MenuItem>
                </Select>

                <Button
                    variant="contained"
                    onClick={handleStart}
                    sx={{
                        backgroundColor: "#0000ff",
                        color: "white",
                        borderRadius: "6px",
                        paddingX: 3,
                        ":hover": {
                            backgroundColor: "#0000cc",
                        },
                    }}
                >
                    Los gehts
                </Button>
            </Box>
            <Box style={{display: isPageOne ? "none" : "flex", width: "100%"}}>
                <ChatField widget={widget}></ChatField>
            </Box>
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