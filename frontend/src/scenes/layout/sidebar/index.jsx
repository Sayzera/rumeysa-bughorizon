/* eslint-disable react/prop-types */
import { Avatar, Box, IconButton, Typography, useTheme, Switch } from "@mui/material";
import { useContext, useState } from "react";
import { tokens } from "../../../theme";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import {
  BarChartOutlined,
  CalendarTodayOutlined,
  ContactsOutlined,
  DashboardOutlined,
  DonutLargeOutlined,
  HelpOutlineOutlined,
  MapOutlined,
  MenuOutlined,
  PeopleAltOutlined,
  PersonOutlined,
  ReceiptOutlined,
  TimelineOutlined,
  WavesOutlined,
} from "@mui/icons-material";
import avatar from "../../../assets/images/avatar.png";
import logo from "../../../assets/images/logo.png";
import Item from "./Item";
import { ToggledContext } from "../../../App";
import { MdLocalPolice } from "react-icons/md";
import { AiOutlineConsoleSql } from "react-icons/ai";
import { CiCircleAlert } from "react-icons/ci";
import { TbSettingsX } from "react-icons/tb";
import { SiHackaday } from "react-icons/si";
import { LuFileWarning } from "react-icons/lu";
import { MdOutlineSecurity } from "react-icons/md";
import { LuShieldAlert } from "react-icons/lu";
import { GiSkullCrack } from "react-icons/gi";
import { useVulnerability } from '../../../context/VulnerabilityContext';

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { toggled, setToggled } = useContext(ToggledContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { vulnerabilities, toggleVulnerability } = useVulnerability();

  return (
    <Sidebar
      backgroundColor={colors.primary[400]}
      rootStyles={{
        border: 0,
        height: "100%",
      }}
      collapsed={collapsed}
      onBackdropClick={() => setToggled(false)}
      toggled={toggled}
      breakPoint="md"
    >
      <Menu
        menuItemStyles={{
          button: { ":hover": { background: "transparent" } },
        }}
      >
        <MenuItem
          rootStyles={{
            margin: "10px 0 20px 0",
            color: colors.gray[100],
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                alignItems="center"
                gap="12px"
                sx={{ transition: ".3s ease" }}
              >
                <img
                  style={{ width: "30px", height: "30px", borderRadius: "8px" }}
                  src={logo}
                  alt="Argon"
                />
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  textTransform="capitalize"
                  color={colors.greenAccent[500]}
                >
                  Bug Horizon
                </Typography>
              </Box>
            )}
            <IconButton onClick={() => setCollapsed(!collapsed)}>
              <MenuOutlined />
            </IconButton>
          </Box>
        </MenuItem>
      </Menu>
      {!collapsed && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            mb: "25px",
          }}
        >
          <Avatar
            alt="avatar"
            src={avatar}
            sx={{ width: "100px", height: "100px" }}
          />
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h3" fontWeight="bold" color={colors.gray[100]}>
              Rümeysa
            </Typography>
            <Typography
              variant="h6"
              fontWeight="500"
              color={colors.greenAccent[500]}
            >
             Bug Horizon
            </Typography>
          </Box>
        </Box>
      )}

      <Box mb={5} pl={collapsed ? undefined : "5%"}>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          <Item
            title="Dashboard"
            path="/"
            colors={colors}
            icon={<DashboardOutlined />}
          />
        </Menu>
        <Typography
          variant="h6"
          color={colors.gray[300]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {!collapsed ? "Data" : " "}
        </Typography>{" "}
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          <Item
            title="Broken Authentication"
            path="/broken-auth"
            colors={colors}
            icon={<MdLocalPolice className="size-6" />}
            action={
              <Switch
                checked={vulnerabilities.brokenAuth}
                onChange={() => toggleVulnerability('brokenAuth')}
                color="primary"
              />
            }
          />
          <Item
            title="SQL Injection (SQLi)"
            path="/sql-injection"
            colors={colors}
            icon={<AiOutlineConsoleSql className="size-6" />}
            action={
              <Switch
                checked={vulnerabilities.sqlInjection}
                onChange={() => toggleVulnerability('sqlInjection')}
                color="primary"
              />
            }
          />
          <Item
            title="XSS"
            path="/xss"
            colors={colors}
            icon={<CiCircleAlert className="size-6" />}
            action={
              <Switch
                checked={vulnerabilities.xss}
                onChange={() => toggleVulnerability('xss')}
                color="primary"
              />
            }
          />
          <Item
            title="Security Misconfiguration"
            path="/security-misconfig"
            colors={colors}
            icon={<TbSettingsX className="size-6" />}
            action={
              <Switch
                checked={vulnerabilities.securityMisconfig}
                onChange={() => toggleVulnerability('securityMisconfig')}
                color="primary"
              />
            }
          />

          <Item
            title="CSRF"
            path="/csrf"
            colors={colors}
            icon={<SiHackaday className="size-6" />}
            action={
              <Switch
                checked={vulnerabilities.csrf}
                onChange={() => toggleVulnerability('csrf')}
                color="primary"
              />
            }
          />


          <Item
            title="Logging Deficiencies"
            path="/logging"
            colors={colors}
            icon={<LuFileWarning className="size-6" />}
            action={
              <Switch
                checked={vulnerabilities.loggingDeficiencies}
                onChange={() => toggleVulnerability('loggingDeficiencies')}
                color="primary"
              />
            }
          />


          <Item
            title="SSRF"
            path="/ssrf"
            colors={colors}
            icon={<MdOutlineSecurity className="size-6" />}
            action={
              <Switch
                checked={vulnerabilities.ssrf}
                onChange={() => toggleVulnerability('ssrf')}
                color="primary"
              />
            }
          />

          <Item
            title="CSP"
            path="/csp"
            colors={colors}
            icon={<LuShieldAlert className="size-6" />}
            action={
              <Switch
                checked={vulnerabilities.csp}
                onChange={() => toggleVulnerability('csp')}
                color="primary"
              />
            }
          />


        </Menu>
        {/* <Typography
          variant="h6"
          color={colors.gray[300]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {!collapsed ? "Pages" : " "}
        </Typography> */}
        {/* <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          <Item
            title="Profile Form"
            path="/form"
            colors={colors}
            icon={<PersonOutlined />}
          />
          <Item
            title="Calendar"
            path="/calendar"
            colors={colors}
            icon={<CalendarTodayOutlined />}
          />
          <Item
            title="FAQ Page"
            path="/faq"
            colors={colors}
            icon={<HelpOutlineOutlined />}
          />
        </Menu>
        <Typography
          variant="h6"
          color={colors.gray[300]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {!collapsed ? "Charts" : " "}
        </Typography>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          <Item
            title="Bar Chart"
            path="/bar"
            colors={colors}
            icon={<BarChartOutlined />}
          />
          <Item
            title="Pie Chart"
            path="/pie"
            colors={colors}
            icon={<DonutLargeOutlined />}
          />
          <Item
            title="Line Chart"
            path="/line"
            colors={colors}
            icon={<TimelineOutlined />}
          />
          <Item
            title="Geography Chart"
            path="/geography"
            colors={colors}
            icon={<MapOutlined />}
          />
          <Item
            title="Stream Chart"
            path="/stream"
            colors={colors}
            icon={<WavesOutlined />}
          />
        </Menu> */}
      </Box>
    </Sidebar>
  );
};

export default SideBar;
