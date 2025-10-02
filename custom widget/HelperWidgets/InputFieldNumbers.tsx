import { InputBase, Paper, Box } from "@mui/material";
import { Widget } from "../../model/widget";
import { text, title } from "../../api/Const";
import { useState, useEffect } from "react";
import { useDailyGoal } from "../../context/DailyGoalContext"; 

export const InputFieldNumbers = ({
    widget,
    onData,
    defaultValue = 10,
}: {
    widget: Widget;
    onData: (data: number) => void;
    defaultValue?: number;
}) => {
    const { dailyGoal, setDailyGoal } = useDailyGoal();

    const [value, setValue] = useState<string>(dailyGoal.toString());

    useEffect(() => {
        const timeout = setTimeout(() => {
            const parsed = parseInt(value);
            const numberValue = isNaN(parsed) ? defaultValue : parsed;
            onData(numberValue);
            setDailyGoal(numberValue);
        }, 500);

        return () => clearTimeout(timeout);
    }, [value, onData, defaultValue]);

    // Wenn Feld leer wird, soll 10 erscheinen
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue === "" ? defaultValue.toString() : newValue);
    };

    return (
        <Box sx={{ width: "100%", height: "8%", minHeight: "60px" }}>
            <Paper
                component="form"
                onSubmit={(e) => e.preventDefault()}
                sx={{
                    height: "100%",
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
                    type="number"
                    inputProps={{min: 0}}
                    sx={{
                        ml: 1,
                        flex: 1,
                        px: 2,
                        py: 1.5,
                    }}
                    placeholder="Gib eine Zahl ein..."
                    value={value}
                    onChange={handleChange}
                />
            </Paper>
        </Box>
    );
};

/*import { InputBase, Paper, Box } from "@mui/material";
import { Widget } from "../../model/widget";
import { text, title } from "../../api/Const";
import { useState, useEffect } from "react";

export const InputFieldNumbers = ({
    widget,
    onData,
    defaultValue = 10,
}: {
    widget: Widget;
    onData: (data: number) => void;
    defaultValue?: number;
}) => {
    const [value, setValue] = useState<string>(defaultValue.toString());

    // Debounce Effekt
    useEffect(() => {
        const timeout = setTimeout(() => {
            const parsed = parseInt(value);
            const numberValue = isNaN(parsed) ? defaultValue : parsed;
            onData(numberValue);
        }, 500); // 500ms debounce

        return () => clearTimeout(timeout);
    }, [value, onData, defaultValue]);

    return (
        <Box sx={{ width: "100%", height: "8%", minHeight: "60px" }}>
            <Paper
                component="form"
                onSubmit={(e) => e.preventDefault()}
                sx={{
                    height: "100%",
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
                    type="number"
                    sx={{
                        ml: 1,
                        flex: 1,
                        px: 2,
                        py: 1.5,
                    }}
                    placeholder="Gib eine Zahl ein..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </Paper>
        </Box>
    );
};

/*import { IconButton, InputBase, Paper, Box } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import { Widget } from "../../model/widget"
import { text, title } from "../../api/Const"
import { useState } from "react"

export const InputFieldNumbers = ({ widget, onData }: { widget: Widget; onData: (data: string) => void }) => {
    const [value, setValue] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setValue(input);
        onData(input.trim() === "" ? "10" : input); 
      }

            return (
                    <Box sx={{ width:"100%", height: "8%", minHeight:"60px" }}>
                        <Paper
                            component="form"
                            onSubmit={(e) => {
                                e.preventDefault();
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
                                onChange={handleChange}
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
}*/