import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper, Alert, Grid, List, ListItem, ListItemText, ListItemIcon, Divider, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useVulnerability } from "../../context/VulnerabilityContext";
import { Security, Code, Warning, CheckCircle } from '@mui/icons-material';
import { useTestCount } from "../../context/TestCountContext";

const CSPPage = () => {
  const { vulnerabilities } = useVulnerability();
  const { incrementTestCount } = useTestCount();
  const [script, setScript] = useState("");
  const [selectedExample, setSelectedExample] = useState("");
  const [result, setResult] = useState(null);

  const scriptExamples = {
    alert: "<script>alert('XSS Test')</script>",
    console: "<script>console.log('Test Log')</script>",
    external: "<script src='https://example.com/malicious.js'></script>",
    event: "<img src='x' onerror='alert(1)'>",
    eval: "eval('alert(1)')"
  };

  const handleExampleSelect = (event) => {
    const example = event.target.value;
    setSelectedExample(example);
    setScript(scriptExamples[example]);
  };

  const handleExecute = () => {
    incrementTestCount('csp');
    if (vulnerabilities.csp) {
      // CSP açığı aktif ise, script'i çalıştır
      try {
        eval(script.replace(/<script>|<\/script>/g, ''));
        setResult({
          success: true,
          message: "Script başarıyla çalıştırıldı"
        });
      } catch (error) {
        setResult({
          success: false,
          message: `Hata: ${error.message}`
        });
      }
    } else {
      // CSP açığı kapalı ise, script'i engelle
      setResult({
        success: false,
        message: "CSP politikası nedeniyle script engellendi"
      });
    }
  };

  return (
    <Box m="20px">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              CSP Test Alanı
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Script Örneği Seçin</InputLabel>
              <Select
                value={selectedExample}
                onChange={handleExampleSelect}
                label="Script Örneği Seçin"
              >
                <MenuItem value="alert">Alert Script</MenuItem>
                <MenuItem value="console">Console Log</MenuItem>
                <MenuItem value="external">External Script</MenuItem>
                <MenuItem value="event">Event Handler</MenuItem>
                <MenuItem value="eval">Eval Script</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="JavaScript Kodu"
              value={script}
              onChange={(e) => setScript(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleExecute}
              fullWidth
            >
              Çalıştır
            </Button>
            {result !== null && (
              <Box mt={2}>
                <Alert severity={result.success ? "success" : "error"}>
                  {result.message}
                </Alert>
              </Box>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Test Senaryoları
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
                <ListItemText
                  primary="Inline Script Test"
                  secondary="<script>alert('XSS')</script>"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
                <ListItemText
                  primary="External Script Test"
                  secondary="<script src='http://evil.com/script.js'></script>"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
                <ListItemText
                  primary="Event Handler Test"
                  secondary="<img src='x' onerror='alert(1)'>"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
                <ListItemText
                  primary="Safe Mode Test"
                  secondary="CSP header'ları ile script çalıştırma engellenir"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CSPPage; 