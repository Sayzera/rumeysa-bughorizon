import React, { useContext } from "react";
import {
  Box,
  IconButton,
  useTheme,
  Typography,
  Button,
} from "@mui/material";
import {
  DarkMode,
  LightMode,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { ToggledContext } from "../../App";
import { ThemeModeContext } from "../../App";

const Navbar = () => {
  const theme = useTheme();
  const { setToggled } = useContext(ToggledContext);
  const { mode, setMode } = useContext(ThemeModeContext);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      sx={{
        backgroundColor: theme.palette.background.default,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box display="flex" alignItems="center">
        <IconButton onClick={() => setToggled((prev) => !prev)}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h4" sx={{ ml: 2 }}>
          Bug Horizon
        </Typography>
      </Box>

      <Box display="flex" alignItems="center">
        <IconButton onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
          {mode === 'dark' ? <LightMode /> : <DarkMode />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Navbar; 