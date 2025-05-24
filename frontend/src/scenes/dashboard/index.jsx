import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  Grid,
  Paper,
} from "@mui/material";
import { Header } from "../../components";
import { DownloadOutlined, RefreshOutlined } from "@mui/icons-material";
import { tokens } from "../../theme";
import { useVulnerability } from '../../context/VulnerabilityContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMdDevices = useMediaQuery("(min-width: 724px)");
  const isXsDevices = useMediaQuery("(max-width: 436px)");
  const { vulnerabilityCounts, resetVulnerabilityCounts } = useVulnerability();

  // Create vulnerability data array
  const vulnerabilityData = [
    { name: 'XSS', count: vulnerabilityCounts.xss },
    { name: 'SQL Injection', count: vulnerabilityCounts.sqlInjection },
    { name: 'Broken Auth', count: vulnerabilityCounts.brokenAuth },
    { name: 'Security Misconfig', count: vulnerabilityCounts.securityMisconfig },
    { name: 'CSRF', count: vulnerabilityCounts.csrf },
    { name: 'Logging Deficiencies', count: vulnerabilityCounts.loggingDeficiencies },
    { name: 'SSRF', count: vulnerabilityCounts.ssrf },
    { name: 'CSP', count: vulnerabilityCounts.csp }
  ];

  // Calculate total vulnerabilities
  const totalVulnerabilities = vulnerabilityData.reduce((sum, item) => sum + item.count, 0);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb="20px">
        <Header title="VULNERABILITY DASHBOARD" subtitle="Vulnerability Usage Statistics" />
        <Box display="flex" gap={2}>
          {!isXsDevices && (
            <>
              <Button
                variant="contained"
                sx={{
                  bgcolor: colors.blueAccent[700],
                  color: "#fcfcfc",
                  fontSize: isMdDevices ? "14px" : "10px",
                  fontWeight: "bold",
                  p: "10px 20px",
                  transition: ".3s ease",
                  ":hover": {
                    bgcolor: colors.blueAccent[800],
                  },
                }}
                startIcon={<DownloadOutlined />}
              >
                DOWNLOAD REPORTS
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{
                  fontSize: isMdDevices ? "14px" : "10px",
                  fontWeight: "bold",
                  p: "10px 20px",
                  transition: ".3s ease",
                }}
                startIcon={<RefreshOutlined />}
                onClick={resetVulnerabilityCounts}
              >
                RESET COUNTERS
              </Button>
            </>
          )}
        </Box>
      </Box>

      {/* Total Vulnerabilities Card */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h3" fontWeight="600" color={colors.greenAccent[500]}>
          Total Vulnerabilities Triggered: {totalVulnerabilities}
        </Typography>
      </Paper>

      {/* Main Bar Chart */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" fontWeight="600" mb="15px">
          Vulnerability Usage Overview
        </Typography>
        <Box height="400px">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={vulnerabilityData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill={colors.greenAccent[500]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Paper>

      {/* Individual Vulnerability Charts */}
      <Grid container spacing={3}>
        {vulnerabilityData.map((vulnerability) => (
          <Grid item xs={12} md={6} key={vulnerability.name}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" fontWeight="600" mb="15px">
                {vulnerability.name}
              </Typography>
              <Box height="300px">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[vulnerability]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      dataKey="count" 
                      fill={colors.greenAccent[500]}
                      name="Times Triggered"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
              <Typography variant="h4" align="center" color={colors.greenAccent[500]} mt={2}>
                {vulnerability.count}
              </Typography>
              <Typography variant="body2" align="center" color={colors.primary[100]}>
                Times Triggered
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
