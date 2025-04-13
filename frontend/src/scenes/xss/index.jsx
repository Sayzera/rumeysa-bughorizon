import React, { useRef, useState } from "react";
import { useContextZafiyetler } from "../../context/ZafiyetlerContext";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { BugReport, Code, ExpandMore, Lock } from "@mui/icons-material";

function XssScreen() {
  const [input, setInput] = useState({
    val: ''
  });
  const [testHistory, setTestHistory] = useState([]);
  const [result, setResult] = useState(null);
  const { zafiyetler } = useContextZafiyetler();
  const [activeTab, setActiveTab] = useState(0);

  console.log(zafiyetler, "zafiyetler");


  const refTextField = useRef();

  const handleTest = () => {
    const timestamp = new Date().toLocaleTimeString();
    let testResult;

    if (!zafiyetler?.xss) {
      // xss açığı aktif

      testResult = {
        input,
        output: input.val,
        timestamp,
        zafiyet: "aktif",
        riskLevel: "Yüksek",
        type: detecXssType(input.val),
      };
    } else {
      // xss açığı aktif değildir
      const sanitized = sanitizeInput(input.val);

      testResult = {
        input,
        output: sanitized,
        timestamp,
        zafiyet: "Kapalı",
        riskLevel: "Düşük",
        type: "Güvenli",
      };
    }

    setResult(testResult);
    setTestHistory((prev) => [testResult, ...prev].slice(0, 5));
  };

  function sanitizeInput(input) {
    return input
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quout;")
      .replace(/'/g, "&#039;")
      .replace(/javascript:/gi, "")
      .replace(/on\w+=/gi, "");
  }

  const detecXssType = (input) => {
    if (input.includes("<script>")) return "Script Tag";
    if (input.includes("onerror")) return "Event Handler";
    if (input.includes("javascript:")) return "JavaScript URL";
    if (input.includes("<svg")) return "SVG";
    if (input.includes("<iframe")) return "İframe";

    return "Diğer";
  };

  const testScenarios = [
    {
      title: "Temel XSS",
      examples: [
        "<script>alert(XSS)</script>",
        "<script>alert(document.cookie)</script>",
      ],
    },
    {
      title: "Event Handler",
      examples: ["<img src=x onerror=alert(1) >", "<svg onload=alert(1)>"],
    },
    {
      title: "Javascript URL",
      examples: [
        "<a href=javascript:alert(1)>Click me</a>",
        "<iframe src=javascript:alert(1)>",
      ],
    },
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
              sx={{
                marginTop: "20px",
              }}
              ref={refTextField}
              multiline
              rows={4}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              label="Test için metin giriniz"
              value={input.val || ""} 
              autoFocus
              onChange={(e) => setInput({
                val: e.target.value
              })}

            />

            <Button
              variant="contained"
              fullWidth
              onClick={handleTest}
              sx={{ mb: 2, mt: 2 }}
            >
              Test Et
            </Button>
            {
              result && (
                <Box mt={2}>
                  <Alert severity={
                    zafiyetler.xss ? 'success' : 'error'
                  }>
                    {
                      zafiyetler.xss
                       ? 'XSS açığı kapalı. input güvenli bir şekilde işlendi' 
                       : 'XSS açığı aktif. Kötü niyetli kod çalıştırılabilir'

                    }
                  </Alert>


                    <Box mt={2} p={2} border={1} borderColor={'grey.300'} borderRadius={1}>
                      <Typography variant='subtitle1'>Test Detayları:</Typography>
                      <Typography variant='body2'>Zaman: {result.timestamp}</Typography>
                      <Typography variant='body2'>Tip: {result.type}</Typography>
                      <Typography variant='body2'>Risk Seviyesi: {result.riskLevel}</Typography>
                      <Divider sx={{my:1}} />
                      <Typography variant="body1">Sonuç: </Typography>
                      <div dangerouslySetInnerHTML={{__html: result.output}}></div>
                    </Box>

                </Box>
              )
            }
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => {
                setActiveTab(newValue);
              }}
            >
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
                        {
                          scenario.examples.map((example, i) => (
                            <ListItem key={i}  onClick={() => {
                              setInput({
                                val: example
                              })
                              
                            }}>

                              <ListItemIcon>
                                <Code />
                              </ListItemIcon>

                              <ListItemText primary={example} className="cursor-pointer" />

                            </ListItem>
                          ))
                        }
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

            {
              activeTab ===2 && (
                <Box mt={2}>
                  <List>
                    {
                      testHistory.map((test, index) => {
                        
                        return (
                          <ListItem key={index}>
                           <ListItemIcon>
                           <BugReport color={zafiyetler.xss ? 'success' : 'error'} />
                           </ListItemIcon>

                           <ListItemText 
                            primary={test.input.val}
                            secondary={
                              <>
                                <Typography variant="body2">{test.timestamp}</Typography>
                                <Chip 
                                  size="small"
                                  label={test.type}
                                  color={zafiyetler.xss ? 'success' : 'error'}
                                />
                              </>
                            }
                           />

                          </ListItem>
                        )
                      })
                    }
                  </List>
                </Box>
              )
            }
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default XssScreen;
