import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  useTheme,
} from "@mui/material";
import {
  Security,
  CheckCircle,
  Warning,
} from "@mui/icons-material";
import { tokens } from "../../theme";
import { useVulnerability } from "../../context/VulnerabilityContext";
import { useTestCount } from "../../context/TestCountContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { vulnerabilities } = useVulnerability();
  const { testCounts } = useTestCount();

  const chartData = [
    { name: 'XSS', tests: testCounts.xss },
    { name: 'SQL Injection', tests: testCounts.sqlInjection },
    { name: 'CSRF', tests: testCounts.csrf },
    { name: 'Broken Auth', tests: testCounts.brokenAuth },
    { name: 'Security Misconfig', tests: testCounts.securityMisconfig },
    { name: 'SSRF', tests: testCounts.ssrf },
    { name: 'CSP', tests: testCounts.csp },
    { name: 'Logging', tests: testCounts.loggingDeficiencies }
  ];

  return (
    <Box m="20px">
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Güvenlik Açığı Test İstatistikleri
            </Typography>
            <Box sx={{ height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="tests" fill="#8884d8" name="Test Sayısı" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Güvenlik Açıkları Durumu
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  {vulnerabilities.xss ? <Warning color="error" /> : <CheckCircle color="success" />}
                </ListItemIcon>
                <ListItemText 
                  primary="XSS" 
                  secondary={`Test Sayısı: ${testCounts.xss}`}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  {vulnerabilities.sqlInjection ? <Warning color="error" /> : <CheckCircle color="success" />}
                </ListItemIcon>
                <ListItemText 
                  primary="SQL Injection" 
                  secondary={`Test Sayısı: ${testCounts.sqlInjection}`}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  {vulnerabilities.csrf ? <Warning color="error" /> : <CheckCircle color="success" />}
                </ListItemIcon>
                <ListItemText 
                  primary="CSRF" 
                  secondary={`Test Sayısı: ${testCounts.csrf}`}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  {vulnerabilities.brokenAuth ? <Warning color="error" /> : <CheckCircle color="success" />}
                </ListItemIcon>
                <ListItemText 
                  primary="Broken Authentication" 
                  secondary={`Test Sayısı: ${testCounts.brokenAuth}`}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  {vulnerabilities.securityMisconfig ? <Warning color="error" /> : <CheckCircle color="success" />}
                </ListItemIcon>
                <ListItemText 
                  primary="Security Misconfiguration" 
                  secondary={`Test Sayısı: ${testCounts.securityMisconfig}`}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  {vulnerabilities.ssrf ? <Warning color="error" /> : <CheckCircle color="success" />}
                </ListItemIcon>
                <ListItemText 
                  primary="SSRF" 
                  secondary={`Test Sayısı: ${testCounts.ssrf}`}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  {vulnerabilities.csp ? <Warning color="error" /> : <CheckCircle color="success" />}
                </ListItemIcon>
                <ListItemText 
                  primary="CSP" 
                  secondary={`Test Sayısı: ${testCounts.csp}`}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  {vulnerabilities.loggingDeficiencies ? <Warning color="error" /> : <CheckCircle color="success" />}
                </ListItemIcon>
                <ListItemText 
                  primary="Logging Deficiencies" 
                  secondary={`Test Sayısı: ${testCounts.loggingDeficiencies}`}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
