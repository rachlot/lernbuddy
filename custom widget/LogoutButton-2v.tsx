import { Button as MuiButton, Icon } from "@mui/material";
import { useDataProvider, useNotify, useRefresh } from "ra-core";
import { useNavigate } from "react-router-dom";
import { Widget } from "../model/widget";
import { expression, print, text, icon, title } from "../api/Const";
import { useExpressionContext } from "../hooks/useExpressionContext";
import { action } from "../api/Action";
import { util } from "../api/Util";
import { useDjTranslate } from "../hooks/useDjTranslate";
import { useState } from "react";
import authProvider from "../login/AuthProvider";

export const LogoutButton = ({ widget }: { widget: Widget }) => {
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const refresh = useRefresh();
  const navigate = useNavigate();
  const context = useExpressionContext();
  const translate = useDjTranslate();

  const [disabled, setDisabled] = useState(false);

  const handleClick = async () => {
    console.log("logging out session"); 
    authProvider.logout();
    // Get rid of OpenID callback parameters in URL:
    window.location.href = window.location.origin;
  };

  return (
    <MuiButton
      variant="contained"
      color="primary"
      disabled={disabled}
      onClick={handleClick}
      startIcon={widget.icon ? <Icon>{widget.icon}</Icon> : undefined}
      sx={{ textTransform: "uppercase", fontWeight: 500 }}
    >
      {translate(widget.text || "Button")}
    </MuiButton>
  );
};

export const config = {
  id: "logout-button",
  title: "Logout Button",
  description: "Minimal logout button that runs an action",
  version: 1,
  icon: <Icon>smart_button</Icon>,
  controls: {
    type: "autoform",
    schema: {
      properties: {
        title: title,
        text: text
      }
    }
  }
};
