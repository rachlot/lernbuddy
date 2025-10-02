import { Select, MenuItem } from "@mui/material"
import { Widget } from "../../model/widget"
import { text, title } from "../../api/Const"
import { useState } from "react"
import { useLevel } from "../../context/LevelContext"; 

export const LevelTopicSelect = ({ widget, onChange }: { widget: Widget; onChange: (data: number) => void }) => {

    const {level, setLevel} = useLevel();

    const levels = [
        { label: "Medizinstudent:in", value: 1 },
        { label: "Assistenzarzt/ -ärztin", value: 2 },
    ]

    const handleSelect = (value: number) => {
        setLevel(value);
        onChange(value);
    }

    return (
        <Select
            value={level}
            onChange={(e) => handleSelect(Number(e.target.value))}
            fullWidth
            variant="outlined"
            sx={{backgroundColor: 'white', borderRadius: "12px"}}
        >
            {levels.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                    {item.label}
                </MenuItem>
            ))}
        </Select>
    )
}