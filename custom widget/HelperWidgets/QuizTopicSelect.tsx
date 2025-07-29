import { Select, MenuItem } from "@mui/material"
import { Widget } from "../../model/widget"
import { text, title } from "../../api/Const"
import { useState } from "react"

export const QuizTopicSelect = ({ widget, onChange }: { widget: Widget; onChange: (data: string) => void }) => {

    const [quizTopic, setTopic] = useState("Kinderanästhesie")

    const lerninhalte = [
        "Anäthesieverfahren",
        "Atemwegsmanagement",
        "Geburtshilfe Management und Management der peripartalen Blutungen",
        "Human Factors in der Medizin",
        "Kinderanästhesie",
        "Pharmakologie",
        "Polytrauma Präklinik",
        "Präoperatives Management und Risikofaktoren",
        "Regionalanäthesie",
        "Schmerztherapie",
        "Sepsis und ARDS",
        "AGN Studienskript und 5. Auflage"
    ]

    const handleSelect = (value: string) => {
        onChange(value)
    }

    return (
        <Select
            value={quizTopic}
            onChange={(e) => {
                setTopic(e.target.value)
                handleSelect(e.target.value)
            }}
            fullWidth
            variant="outlined"
            sx={{backgroundColor: 'white', borderRadius: "12px"}}
        >
            {lerninhalte.map((item) => (
                <MenuItem key={item} value={item}>
                    {item}
                </MenuItem>
            ))}
        </Select>
    )
}