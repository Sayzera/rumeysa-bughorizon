import React, { useContext } from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  Security,
  BugReport,
  SettingsOutlined,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { ToggledContext } from "../../App";
import { ThemeModeContext } from "../../App";

const SideBar = () => {
  const theme = useTheme();
  const { toggled, setToggled } = useContext(ToggledContext);
  const { mode } = useContext(ThemeModeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      text: "Dashboard",
      icon: <HomeOutlined />,
      path: "/",
    },
    {
      text: "XSS",
      icon: <Security />,
      path: "/xss",
    },
    {
      text: "SQL Injection",
      icon: <Security />,
      path: "/sql-injection",
    },
    {
      text: "CSRF",
      icon: <Security />,
      path: "/csrf",
    },
    {
      text: "Broken Auth",
      icon: <Security />,
      path: "/broken-auth",
    },
    {
      text: "Security Misconfig",
      icon: <Security />,
      path: "/security-misconfig",
    },
    {
      text: "SSRF",
      icon: <Security />,
      path: "/ssrf",
    },
    {
      text: "CSP",
      icon: <Security />,
      path: "/csp",
    },
    {
      text: "Logging Deficiencies",
      icon: <Security />,
      path: "/logging-deficiencies",
    },
    {
      text: "Settings",
      icon: <SettingsOutlined />,
      path: "/settings",
    },
  ];

  return (
    <Box component="nav">
      {toggled && (
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            width: 250,
            "& .MuiDrawer-paper": {
              width: 250,
              boxSizing: "border-box",
              backgroundColor: theme.palette.background.default,
              borderRight: `1px solid ${theme.palette.divider}`,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center">
                  <BugReport sx={{ fontSize: "2rem", color: theme.palette.primary.main }} />
                  <Typography variant="h4" sx={{ ml: 1 }}>
                    Bug Horizon
                  </Typography>
                </Box>
                <IconButton onClick={() => setToggled(!toggled)}>
                  <ChevronLeft />
                </IconButton>
              </Box>
            </Box>
            <List>
              {navItems.map(({ text, icon, path }) => {
                const isActive = location.pathname === path;
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(path);
                      }}
                      sx={{
                        backgroundColor: isActive ? theme.palette.primary.main : "transparent",
                        color: isActive ? theme.palette.primary.contrastText : theme.palette.text.primary,
                        "&:hover": {
                          backgroundColor: isActive
                            ? theme.palette.primary.dark
                            : theme.palette.action.hover,
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color: isActive ? theme.palette.primary.contrastText : theme.palette.text.primary,
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {isActive && <ChevronRightOutlined sx={{ ml: "auto" }} />}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default SideBar; 