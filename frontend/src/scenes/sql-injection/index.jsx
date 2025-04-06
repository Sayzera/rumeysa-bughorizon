import React, { useState, useContext } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Alert,
} from "@mui/material";
import { Security, CheckCircle, Warning } from "@mui/icons-material";
import { useVulnerability } from "../../context/VulnerabilityContext";
import { useTestCount } from "../../context/TestCountContext";

const SqlInjectionPage = () => {
  const { isVulnerable, toggleVulnerability } = useVulnerability("sqlInjection");
  const { incrementTestCount } = useTestCount();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);

  // SQL injection saldırılarını engellemek için HTML trim fonksiyonu
  const sanitizeInput = (input) => {
    // HTML etiketlerini temizle
    const sanitized = input.replace(/<[^>]*>/g, '');
    // SQL injection karakterlerini temizle
    return sanitized.replace(/['";\\]/g, '');
  };

  const handleQuery = () => {
    incrementTestCount('sqlInjection');
    const sanitizedQuery = sanitizeInput(query);
    
    if (isVulnerable) {
      // Güvenlik açığı aktifken, temizlenmemiş sorguyu kullan
      setResult({
        success: true,
        message: `Sorgu başarıyla çalıştırıldı: ${query}`,
        data: [
          { id: 1, name: "Kullanıcı 1", email: "user1@example.com" },
          { id: 2, name: "Kullanıcı 2", email: "user2@example.com" },
        ],
      });
    } else {
      // Güvenlik açığı kapalıyken, temizlenmiş sorguyu kullan
      setResult({
        success: true,
        message: `Güvenli sorgu çalıştırıldı: ${sanitizedQuery}`,
        data: [
          { id: 1, name: "Kullanıcı 1", email: "user1@example.com" },
        ],
      });
    }
  };

  return (
    <Box m="20px">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              SQL Injection Test
            </Typography>
            <Box mb={3}>
              <TextField
                fullWidth
                label="SQL Sorgusu"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="SELECT * FROM users WHERE name = '...'"
                multiline
                rows={4}
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleQuery}
              sx={{ mb: 2 }}
            >
              Sorguyu Çalıştır
            </Button>
            <Button
              variant="outlined"
              color={isVulnerable ? "error" : "success"}
              onClick={() => toggleVulnerability()}
            >
              {isVulnerable ? "Güvenlik Açığını Kapat" : "Güvenlik Açığını Aç"}
            </Button>
            {result && (
              <Box mt={3}>
                <Alert severity={result.success ? "success" : "error"}>
                  {result.message}
                </Alert>
                {result.data && (
                  <Box mt={2}>
                    <Typography variant="h6">Sonuçlar:</Typography>
                    <List>
                      {result.data.map((item) => (
                        <ListItem key={item.id}>
                          <ListItemText
                            primary={item.name}
                            secondary={item.email}
                          />
                        </ListItem>
                      ))}
                    </List>
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
                  <Security />
                </ListItemIcon>
                <ListItemText
                  primary="Temel SQL Injection"
                  secondary="SELECT * FROM users WHERE name = 'admin' OR '1'='1'"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Security />
                </ListItemIcon>
                <ListItemText
                  primary="Union-Based Injection"
                  secondary="SELECT * FROM users WHERE id = 1 UNION SELECT 1,2,3--"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Security />
                </ListItemIcon>
                <ListItemText
                  primary="Time-Based Injection"
                  secondary="SELECT * FROM users WHERE id = 1 AND SLEEP(5)--"
                />
              </ListItem>
            </List>
            <Box mt={3}>
              <Typography variant="h6" gutterBottom>
                Güvenlik Önlemleri
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="HTML ve SQL Injection Karakterlerinin Temizlenmesi"
                    secondary="Kullanıcı girdilerindeki HTML etiketleri ve SQL injection karakterleri temizlenir"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Parametreli Sorgular"
                    secondary="SQL sorgularında parametre kullanımı zorunludur"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Input Validasyonu"
                    secondary="Kullanıcı girdileri sıkı bir şekilde kontrol edilir"
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

export default SqlInjectionPage; 