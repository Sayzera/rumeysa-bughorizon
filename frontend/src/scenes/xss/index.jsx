import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper, Alert, Grid, List, ListItem, ListItemText, ListItemIcon, Divider } from "@mui/material";
import { useVulnerability } from "../../context/VulnerabilityContext";
import { Security, Code, Warning, CheckCircle } from '@mui/icons-material';
import { useTestCount } from "../../context/TestCountContext";

const XSSPage = () => {
  const { vulnerabilities } = useVulnerability();
  const { incrementTestCount } = useTestCount();
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const handleTest = () => {
    incrementTestCount('xss');
    if (vulnerabilities.xss) {
      // XSS açığı aktif ise, input'u doğrudan render et
      setResult(input);
    } else {
      // XSS açığı kapalı ise, input'u sanitize et
      const sanitized = input
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
      setResult(sanitized);
    }
  };

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
            >
              Test Et
            </Button>
            {result !== null && (
              <Box mt={2}>
                <Alert severity={vulnerabilities.xss ? "error" : "success"}>
                  {vulnerabilities.xss
                    ? "XSS açığı aktif! Kötü niyetli kod çalıştırılabilir."
                    : "XSS açığı kapalı. Input güvenli bir şekilde işlendi."}
                </Alert>
                <Box
                  mt={2}
                  p={2}
                  border={1}
                  borderColor="grey.300"
                  borderRadius={1}
                >
                  <Typography variant="body1">Sonuç:</Typography>
                  <div dangerouslySetInnerHTML={{ __html: result }} />
                </Box>
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
                  primary="Temel XSS Testi"
                  secondary="<script>alert('XSS')</script>"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
                <ListItemText
                  primary="IMG Tag Testi"
                  secondary='<img src="x" onerror="alert(1)">'
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
                <ListItemText
                  primary="SVG Testi"
                  secondary='<svg onload="alert(1)"></svg>'
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
                <ListItemText
                  primary="Event Handler Testi"
                  secondary='<a href="#" onclick="alert(1)">Click me</a>'
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default XSSPage; 