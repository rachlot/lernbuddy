import { Button as MuiButton, Icon } from "@mui/material";
import { useDataProvider, useNotify, useRefresh } from "ra-core";
import { useNavigate } from "react-router-dom";
import { Widget } from "../../model/widget";
import { expression, print, text, icon, title } from "../../api/Const";
import { useExpressionContext } from "../../hooks/useExpressionContext";
import { action } from "../../api/Action";
import { util } from "../../api/Util";
import { useDjTranslate } from "../../hooks/useDjTranslate";
import { ReactNode, useState } from "react";
import authProvider from "../../login/AuthProvider";

type CustomButtonProps = {
  onClick: () => void;
  children: ReactNode;
};

export const ContainedButton = ({ children, onClick }: CustomButtonProps ) => {
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const refresh = useRefresh();
  const navigate = useNavigate();
  const context = useExpressionContext();
  const translate = useDjTranslate();

  const [disabled, setDisabled] = useState(false);


  return (
    <MuiButton
      variant="contained"
      color="primary"
      disabled={disabled}
      onClick={onClick}
      sx={{ textTransform: "uppercase", fontWeight: 500, borderRadius: "12px", minHeight: '40px',
        width: 'fit-content' }}
    >
      {children}
    </MuiButton>
  );
};
