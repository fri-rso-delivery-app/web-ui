import { useContext } from "react";

import { IconButton, useTheme } from "@mui/material";

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { ColorModeContext } from "../../util/theme";


export default function DarkModeSwitch() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <IconButton onClick={colorMode.toggleColorMode} color="inherit">
      {theme.palette.mode === 'dark' ? <LightModeIcon/> : <DarkModeIcon/>}
    </IconButton>
  );
}
