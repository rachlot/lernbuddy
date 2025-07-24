import { Box, Button, IconButton, MenuItem, Select, Typography } from "@mui/material"
import FastForwardIcon from "@mui/icons-material/FastForward"
import { Widget } from "../model/widget"
import { text, title } from "../api/Const"
import { useState } from "react"
import { ChatField } from "./HelperWidgets/ChatField"
import { QuizTopicSelect } from "./HelperWidgets/QuizTopicSelect"
import { ChatTextBlock } from "./HelperWidgets/ChatTextBlock"

export const QuizModusPage = ({ widget }: { widget: Widget }) => {

    const [isPageOne, setIsPageOne] = useState(true)
    const [messages, setMessages] = useState<
        { text: string; align: "left" | "right"; withStripe: boolean }[]
    >([])

    const handleStart = () => {
        setIsPageOne(!isPageOne)
    }

    const handleChatSend = (chatMessage: string) => {
        console.log(chatMessage)
        if (!chatMessage.trim()) return
        addTextBlock(chatMessage, "right", false)
        setTimeout(() => {
            addTextBlock("Automatische Antwort", "left", true)
        }, 5000)
    }


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
                }}
            >
                <Typography variant="h6" >
                    Welcher Lerninhalt soll abgefragt werden?
                </Typography>

                <QuizTopicSelect widget={widget} onChange={handleTopicSelected}></QuizTopicSelect>

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

            {/*   ------------- Page 2 -------------------------------------    */}
            <Box
                style={{ display: isPageOne ? "none" : "flex" }}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    width: "70%",
                    height: "95vh", // Volle Seitenhöhe
                    boxSizing: "border-box", // padding zählt zur Höhe
                }}>
                <QuizTopicSelect widget={widget} onChange={handleTopicSelected}></QuizTopicSelect>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {messages.map((msg, index) => (
                        <ChatTextBlock
                            key={index}
                            text={msg.text}
                            align={msg.align}
                            withStripe={msg.withStripe}
                        />
                    ))}
                </Box>

                {/*  --- ChatField and Interaction Menu ---    */}
                <Box sx={{ display: "flex", gap: 2, flexDirection: "column", width: "100%" }}>
                    <Box sx={{ display: "flex", flexDirection: "row-reverse", gap: 2 }}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#0000ff",
                                color: "white",
                                borderRadius: "12px",
                                textTransform: "none",
                                px: 3,
                                "&:hover": {
                                    backgroundColor: "#0033cc",
                                },
                            }}
                        >
                            Nächste Frage
                        </Button>
                        <IconButton
                            sx={{
                                border: "1px solid #0000ff",
                                borderRadius: "12px",
                                color: "#0000ff",
                            }}
                        >
                            <FastForwardIcon />
                        </IconButton>
                    </Box>
                    <ChatField widget={widget} onData={handleChatSend}></ChatField>
                </Box>
            </Box>
        </Box>
    )
}

export const configQuizModusPage = {
    id: 'QuizModusPage'
}