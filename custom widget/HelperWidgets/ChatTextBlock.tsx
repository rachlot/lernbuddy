import { Box, Typography } from "@mui/material"

export const ChatTextBlock = ({
  text,
  align = "left",
  withStripe = false,
}: {
  text: string
  align?: "left" | "right"
  withStripe?: boolean
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        mt: 2,
        paddingLeft: align === "left" ? 0 : "50%",
        paddingRight: align === "right" ? 0 : "50%",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: "flex",
          borderLeft: withStripe ? "3px solid #B7E4C7" : "none",
          backgroundColor: "#f9f9f9",
          padding: "16px",
          maxWidth: "90%",
        }}
      >
        <Typography sx={{ whiteSpace: "pre-line" }}>{text}</Typography>
      </Box>
    </Box>
  )
}