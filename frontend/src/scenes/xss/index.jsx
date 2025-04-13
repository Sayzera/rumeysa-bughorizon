import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Tabs,
  Tab,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useVulnerability } from "../../context/VulnerabilityContext";
import { Security, Code, Warning, CheckCircle, ExpandMore, BugReport, Lock, Info } from '@mui/icons-material';
import { useTestCount } from "../../context/TestCountContext";

const XSSPage = () => {
  const { vulnerabilities } = useVulnerability();
  const { incrementTestCount } = useTestCount();
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [testHistory, setTestHistory] = useState([]);

  const handleTest = () => {
    incrementTestCount('xss');
    const timestamp = new Date().toLocaleTimeString();
    let testResult;

    if (vulnerabilities.xss) {
      // XSS açığı aktif ise, input'u doğrudan render et
      testResult = {
        input,
        output: input,
        timestamp,
        vulnerability: "Aktif",
        riskLevel: "Yüksek",
        type: detectXssType(input)
      };
    } else {
      // XSS açığı kapalı ise, input'u sanitize et
      const sanitized = sanitizeInput(input);
      testResult = {
        input,
        output: sanitized,
        timestamp,
        vulnerability: "Kapalı",
        riskLevel: "Düşük",
        type: "Güvenli"
      };
    }

    setResult(testResult);
    setTestHistory(prev => [testResult, ...prev].slice(0, 5));
  };

  const detectXssType = (input) => {
    if (input.includes("<script>")) return "Script Tag";
    if (input.includes("onerror=")) return "Event Handler";
    if (input.includes("javascript:")) return "JavaScript URL";
    if (input.includes("<svg")) return "SVG";
    if (input.includes("<iframe")) return "Iframe";
    return "Diğer";
  };

  const sanitizeInput = (input) => {
    return input
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/javascript:/gi, "")
      .replace(/on\w+=/gi, "");
  };

  const testScenarios = [
    {
      title: "Temel XSS",
      examples: [
        "<script>alert('XSS')</script>",
        "<script>alert(document.cookie)</script>"
      ]
    },
    {
      title: "Event Handler",
      examples: [
        "<img src=x onerror=alert(1)>",
        "<svg onload=alert(1)>"
      ]
    },
    {
      title: "JavaScript URL",
      examples: [
        "<a href=javascript:alert(1)>Click me</a>",
        "<iframe src=javascript:alert(1)>"
      ]
    }
  ];

  return (
    <Box m="20px">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              XSS Test Alanı
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              label="Test için metin girin"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleTest}
              fullWidth
              sx={{ mb: 2 }}
            >
              Test Et
            </Button>
            {result && (
              <Box mt={2}>
                <Alert severity={vulnerabilities.xss ? "error" : "success"}>
                  {vulnerabilities.xss
                    ? "XSS açığı aktif! Kötü niyetli kod çalıştırılabilir."
                    : "XSS açığı kapalı. Input güvenli bir şekilde işlendi."}
                </Alert>
                <Box mt={2} p={2} border={1} borderColor="grey.300" borderRadius={1}>
                  <Typography variant="subtitle1">Test Detayları:</Typography>
                  <Typography variant="body2">Zaman: {result.timestamp}</Typography>
                  <Typography variant="body2">Tip: {result.type}</Typography>
                  <Typography variant="body2">Risk Seviyesi: {result.riskLevel}</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body1">Sonuç:</Typography>
                  <div dangerouslySetInnerHTML={{ __html: result.output }} />
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
              <Tab label="Test Senaryoları" />
              <Tab label="Güvenlik Önlemleri" />
              <Tab label="Test Geçmişi" />
            </Tabs>
            {activeTab === 0 && (
              <Box mt={2}>
                {testScenarios.map((scenario, index) => (
                  <Accordion key={index}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography>{scenario.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List>
                        {scenario.examples.map((example, i) => (
                          <ListItem key={i} button onClick={() => setInput(example)}>
                            <ListItemIcon>
                              <Code />
                            </ListItemIcon>
                            <ListItemText primary={example} />
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            )}
            {activeTab === 1 && (
              <Box mt={2}>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Lock />
                    </ListItemIcon>
                    <ListItemText
                      primary="Input Validasyonu"
                      secondary="Kullanıcı girdileri sıkı bir şekilde kontrol edilir"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Lock />
                    </ListItemIcon>
                    <ListItemText
                      primary="Output Encoding"
                      secondary="HTML, JavaScript ve URL encoding uygulanır"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Lock />
                    </ListItemIcon>
                    <ListItemText
                      primary="Content Security Policy"
                      secondary="CSP header'ı ile script çalıştırma kısıtlanır"
                    />
                  </ListItem>
                </List>
              </Box>
            )}
            {activeTab === 2 && (
              <Box mt={2}>
                <List>
                  {testHistory.map((test, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <BugReport color={test.vulnerability === "Aktif" ? "error" : "success"} />
                      </ListItemIcon>
                      <ListItemText
                        primary={test.input}
                        secondary={
                          <>
                            <Typography variant="body2">{test.timestamp}</Typography>
                            <Chip
                              size="small"
                              label={test.type}
                              color={test.vulnerability === "Aktif" ? "error" : "success"}
                            />
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default XSSPage; 