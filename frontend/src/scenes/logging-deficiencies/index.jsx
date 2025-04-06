import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Alert,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";
import {
  Security,
  Code,
  Warning,
  CheckCircle,
} from "@mui/icons-material";
import { useVulnerability } from "../../context/VulnerabilityContext";
import { useTestCount } from "../../context/TestCountContext";

const LoggingDeficienciesPage = () => {
  const { vulnerabilities } = useVulnerability();
  const { incrementTestCount } = useTestCount();
  const [logMessage, setLogMessage] = useState("");
  const [result, setResult] = useState(null);

  const handleLog = () => {
    incrementTestCount('loggingDeficiencies');
    if (vulnerabilities.loggingDeficiencies) {
      // Logging açığı aktif ise, hassas bilgileri logla
      setResult({
        success: true,
        message: "Log kaydedildi",
        log: {
          timestamp: new Date().toISOString(),
          message: logMessage,
          user: "admin",
          ip: "192.168.1.1",
          sessionId: "abc123",
          sensitiveData: "credit_card=1234-5678-9012-3456"
        }
      });
    } else {
      // Logging açığı kapalı ise, hassas bilgileri temizle
      setResult({
        success: true,
        message: "Log kaydedildi (hassas bilgiler temizlendi)",
        log: {
          timestamp: new Date().toISOString(),
          message: logMessage,
          user: "admin",
          ip: "192.168.1.1",
          sessionId: "***",
          sensitiveData: "***"
        }
      });
    }
  };

  return (
    <Box m="20px">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Log Testi
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Log Mesajı"
              value={logMessage}
              onChange={(e) => setLogMessage(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleLog}
              fullWidth
            >
              Log Kaydet
            </Button>
            {result !== null && (
              <Box mt={2}>
                <Alert severity={result.success ? "success" : "error"}>
                  {result.message}
                </Alert>
                {result.log && (
                  <Box mt={2} p={2} border={1} borderColor="grey.300" borderRadius={1}>
                    <Typography variant="body1">Log Detayları:</Typography>
                    <pre>{JSON.stringify(result.log, null, 2)}</pre>
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
                  primary="Hassas Bilgi Loglama"
                  secondary="Kredi kartı, şifre gibi hassas bilgilerin loglanması"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
                <ListItemText
                  primary="Yetersiz Log Detayı"
                  secondary="Önemli olayların yetersiz detayla loglanması"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
                <ListItemText
                  primary="Log Temizleme"
                  secondary="Logların düzenli temizlenmemesi"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
                <ListItemText
                  primary="Safe Mode Test"
                  secondary="Hassas bilgilerin loglardan temizlendiğini kontrol edin"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoggingDeficienciesPage; 