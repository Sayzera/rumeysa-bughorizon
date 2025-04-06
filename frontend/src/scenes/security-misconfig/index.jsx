import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper, Alert, Grid, List, ListItem, ListItemText, ListItemIcon, Divider } from "@mui/material";
import { useVulnerability } from "../../context/VulnerabilityContext";
import { Security, Code, Warning, CheckCircle, Settings } from '@mui/icons-material';
import { useTestCount } from "../../context/TestCountContext";

const SecurityMisconfigPage = () => {
  const { vulnerabilities } = useVulnerability();
  const { incrementTestCount } = useTestCount();
  const [config, setConfig] = useState("");
  const [result, setResult] = useState(null);

  const handleCheck = () => {
    incrementTestCount('securityMisconfig');
    if (vulnerabilities.securityMisconfig) {
      // Güvenlik yapılandırması açığı aktif ise, hassas bilgileri göster
      setResult({
        success: true,
        message: "Hassas yapılandırma bilgileri görüntülendi",
        data: {
          dbConnection: "mongodb://admin:password@localhost:27017",
          apiKey: "sk_test_1234567890abcdef",
          debugMode: true,
          securityHeaders: {
            csp: "default-src 'self'",
            xFrameOptions: "DENY",
            xContentTypeOptions: "nosniff"
          }
        }
      });
    } else {
      // Güvenlik yapılandırması açığı kapalı ise, bilgileri gizle
      setResult({
        success: false,
        message: "Hassas yapılandırma bilgileri gizlendi"
      });
    }
  };

  return (
    <Box m="20px">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Güvenlik Yapılandırması Testi
            </Typography>
            <TextField
              fullWidth
              label="Yapılandırma Bilgisi"
              value={config}
              onChange={(e) => setConfig(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleCheck}
              fullWidth
            >
              Kontrol Et
            </Button>
            {result !== null && (
              <Box mt={2}>
                <Alert severity={result.success ? "error" : "success"}>
                  {result.message}
                </Alert>
                {result.success && result.data && (
                  <Box mt={2} p={2} border={1} borderColor="grey.300" borderRadius={1}>
                    <Typography variant="body1">Yapılandırma Detayları:</Typography>
                    <pre>{JSON.stringify(result.data, null, 2)}</pre>
                  </Box>
                )}
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
                  primary="Hassas Yapılandırma Bilgileri"
                  secondary="Veritabanı bağlantı bilgileri, API anahtarları vb."
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
                <ListItemText
                  primary="Debug Modu Kontrolü"
                  secondary="Production ortamında debug modunun kapalı olması"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
                <ListItemText
                  primary="Güvenlik Başlıkları"
                  secondary="CSP, X-Frame-Options, X-Content-Type-Options"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
                <ListItemText
                  primary="Güvenli Mod Testi"
                  secondary="Hassas bilgilerin gizlenmesi ve erişimin engellenmesi"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SecurityMisconfigPage; 