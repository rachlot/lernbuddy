import { Widget } from "../model/widget"
import { text, title } from "../api/Const"
import { useState, useEffect } from "react"
import { Box, Button, IconButton, MenuItem, Select, Typography } from "@mui/material"
import FastForwardIcon from "@mui/icons-material/FastForward"



export const AskLernbuddyStyle = ({ widget }: { widget: Widget}) => {
    
    useEffect(() => {
        const observer = new MutationObserver(() => {    

            const allButtonsOnPage: HTMLCollectionOf<HTMLButtonElement> = document.getElementsByClassName("ButtonBox") as HTMLCollectionOf<HTMLButtonElement>
            const targetText = "Erkläre genauer"; 
            const correctButtondiv = Array.from(allButtonsOnPage).find(button => 
                button.innerText.toLowerCase().includes(targetText.toLowerCase())
             );
            const buttonElement = correctButtondiv?.querySelector("button")

            if (buttonElement) {
            buttonElement.style.color = "black"
            buttonElement.style.backgroundColor = "#fafafb"
            buttonElement.style.border = "2px solid #3d7dbc"
            buttonElement.style.textTransform = "none"

            console.log("mission complete")
    
            observer.disconnect(); // stop watching once found
          }
        });
    
        observer.observe(document.body, {
          childList: true,
          subtree: true,
        });
    
        return () => observer.disconnect(); // cleanup
      }, []);

    return
}

export const config = {
    id: 'AskLernbuddy-style'
}