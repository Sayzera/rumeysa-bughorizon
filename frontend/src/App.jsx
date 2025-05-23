import React, { createContext, useState } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Navbar, SideBar } from "./scenes";
import { Outlet, useLocation } from "react-router-dom";
import { VulnerabilityProvider } from './context/VulnerabilityContext';

export const ToggledContext = createContext(null);

function App() {
  const [theme, colorMode] = useMode();
  const [toggled, setToggled] = useState(false);
  const values = { toggled, setToggled };
  const location = useLocation();

  const isRegisterOrLogin = location.pathname === "/register" || location.pathname === "/login";
  
  return (
    <VulnerabilityProvider>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ToggledContext.Provider value={values}>
            {
              isRegisterOrLogin ? (
                <Outlet />
              ) : (
                <Box sx={{ display: "flex", height: "100vh", maxWidth: "100%" }}>
                  <div className="!w-[500px]">
                    <SideBar />
                  </div>
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
                      <Outlet />
                    </Box>
                  </Box>
                </Box>
              )
            }
          </ToggledContext.Provider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </VulnerabilityProvider>
  );
}

export default App;
