import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper, Alert, Grid, List, ListItem, ListItemText, ListItemIcon, Divider } from "@mui/material";
import { useVulnerability } from "../../context/VulnerabilityContext";
import { Security, Code, Warning, CheckCircle } from '@mui/icons-material';

const CSRFPage = () => {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const { vulnerabilities, toggleVulnerability } = useVulnerability();

  const handleTransfer = (e) => {
    e.preventDefault();
    if (vulnerabilities.csrf) {
      // CSRF açık - token kontrolü yok
      setMessage(`Para transferi başarılı: ${amount} TL -> ${recipient}`);
    } else {
      // CSRF kapalı - token kontrolü var
      setMessage("CSRF token kontrolü başarılı - İşlem güvenli");
    }
  };

  return (
    <Box m="20px">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              CSRF Test
            </Typography>
            <Box component="form" onSubmit={handleTransfer} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Alıcı"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Miktar (TL)"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                margin="normal"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Transfer Et
              </Button>
            </Box>
            {message && (
              <Alert severity={message.includes("başarılı") ? "success" : "info"} sx={{ mt: 2 }}>
                {message}
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
                  primary="Form-based CSRF" 
                  secondary="Form tabanlı CSRF saldırıları için hidden form alanları kullanın"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Code color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="JSON-based CSRF" 
                  secondary="JSON tabanlı CSRF saldırıları için Content-Type header'ını değiştirin"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Warning color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="SameSite Cookie Testi" 
                  secondary="SameSite cookie ayarlarını kontrol edin"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Güvenli Mod Testi" 
                  secondary="Switch'i kapatın ve aynı testleri tekrarlayın. CSRF engellenmelidir"
                />
              </ListItem>
            </List>

            <Box mt={3}>
              <Typography variant="h6">Güvenlik Önlemleri</Typography>
              <List>
                <ListItem>
                  <ListItemText 
                    primary="CSRF Token" 
                    secondary="Her form için benzersiz CSRF token'ları kullanılmalıdır"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="SameSite Cookies" 
                    secondary="Cookie'ler için SameSite=Strict veya Lax ayarları kullanılmalıdır"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Double Submit Cookie" 
                    secondary="Double submit cookie pattern kullanılmalıdır"
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

export default CSRFPage; 