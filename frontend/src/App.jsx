import React, { createContext, useState, useMemo } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Navbar, SideBar } from "./scenes";
import { VulnerabilityProvider } from './context/VulnerabilityContext';
import { TestCountProvider } from './context/TestCountContext';
import AppRouter from "./Router";
import { BrowserRouter } from 'react-router-dom';
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

export const ToggledContext = createContext(null);
export const ThemeModeContext = createContext(null);

function App() {
  const [theme, colorMode] = useMode();
  const [toggled, setToggled] = useState(false);
  const [mode, setMode] = useState('light');
  const values = { toggled, setToggled };
  const themeModeValues = { mode, setMode };

  const themeMemo = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <BrowserRouter>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeModeContext.Provider value={themeModeValues}>
          <ThemeProvider theme={themeMemo}>
            <CssBaseline />
            <VulnerabilityProvider>
              <TestCountProvider>
                <ToggledContext.Provider value={values}>
                  <Box sx={{ display: "flex", height: "100vh", maxWidth: "100%" }}>
                    <SideBar />
                    <Box
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        maxWidth: "100%",
                      }}
                    >
                      <Navbar />
                      <Box sx={{ overflowY: "auto", flex: 1, maxWidth: "100%" }}>
                        <AppRouter />
                      </Box>
                    </Box>
                  </Box>
                </ToggledContext.Provider>
              </TestCountProvider>
            </VulnerabilityProvider>
          </ThemeProvider>
        </ThemeModeContext.Provider>
      </ColorModeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
