import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper, Alert, Grid, List, ListItem, ListItemText, ListItemIcon, Divider } from "@mui/material";
import { useVulnerability } from "../../context/VulnerabilityContext";
import { Security, Code, Warning, CheckCircle } from '@mui/icons-material';
import { useTestCount } from "../../context/TestCountContext";

const CSRFPage = () => {
  const { vulnerabilities } = useVulnerability();
  const { incrementTestCount } = useTestCount();
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [result, setResult] = useState(null);

  const handleTransfer = () => {
    incrementTestCount('csrf');
    if (vulnerabilities.csrf) {
      // CSRF açığı aktif ise, doğrudan işlem yap
      setResult({
        success: true,
        message: `$${amount} başarıyla ${recipient} hesabına transfer edildi.`
      });
    } else {
      // CSRF açığı kapalı ise, CSRF token kontrolü yap
      setResult({
        success: false,
        message: "CSRF token doğrulanamadı. İşlem reddedildi."
      });
    }
  };

  return (
    <Box m="20px">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Para Transferi Testi
            </Typography>
            <TextField
              fullWidth
              type="number"
              label="Miktar"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Alıcı Hesap"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleTransfer}
              fullWidth
            >
              Transfer Et
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
                  primary="Form-based CSRF"
                  secondary="<form action='http://target.com/transfer' method='POST'>...</form>"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
                <ListItemText
                  primary="JSON-based CSRF"
                  secondary="fetch('http://target.com/api/transfer', {method: 'POST'...})"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
                <ListItemText
                  primary="SameSite Cookie Test"
                  secondary="document.cookie = 'session=123; SameSite=None'"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
                <ListItemText
                  primary="CSRF Token Test"
                  secondary="<input type='hidden' name='csrf_token' value='...'>"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CSRFPage; 