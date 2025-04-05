import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper, Alert, Grid, List, ListItem, ListItemText, ListItemIcon, Divider, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useVulnerability } from "../../context/VulnerabilityContext";
import { Security, Code, Warning, CheckCircle, Cloud } from '@mui/icons-material';

const SSRFPage = () => {
  const [url, setUrl] = useState("");
  const [response, setResponse] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const { vulnerabilities, toggleVulnerability } = useVulnerability();

  const cloudMetadataServices = {
    aws: "http://169.254.169.254/latest/meta-data/",
    gcp: "http://metadata.google.internal/computeMetadata/v1/",
    azure: "http://169.254.169.254/metadata/instance?api-version=2021-02-01"
  };

  const handleRequest = (e) => {
    e.preventDefault();
    if (vulnerabilities.ssrf) {
      // SSRF açık - URL kontrolü yok
      setResponse(`İstek başarılı: ${url}`);
    } else {
      // SSRF kapalı - URL kontrolü var
      if (url.startsWith("http://localhost") || url.startsWith("http://127.0.0.1")) {
        setResponse("Hata: İç ağ kaynaklarına erişim engellendi");
      } else if (Object.values(cloudMetadataServices).includes(url)) {
        setResponse("Hata: Bulut metadata servislerine erişim engellendi");
      } else {
        setResponse("URL kontrolü başarılı - İstek güvenli");
      }
    }
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setUrl(cloudMetadataServices[service]);
  };

  return (
    <Box m="20px">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              SSRF Test
            </Typography>
            <Box component="form" onSubmit={handleRequest} sx={{ mt: 2 }}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Bulut Servisi Seçin</InputLabel>
                <Select
                  value={selectedService}
                  onChange={(e) => handleServiceSelect(e.target.value)}
                  label="Bulut Servisi Seçin"
                >
                  <MenuItem value="aws">AWS Metadata</MenuItem>
                  <MenuItem value="gcp">GCP Metadata</MenuItem>
                  <MenuItem value="azure">Azure Metadata</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                margin="normal"
                placeholder="http://example.com"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                İstek Gönder
              </Button>
            </Box>
            {response && (
              <Alert severity={response.includes("Hata") ? "error" : "success"} sx={{ mt: 2 }}>
                {response}
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
                  <Cloud color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="AWS Metadata Testi" 
                  secondary="http://169.254.169.254/latest/meta-data/ ile AWS metadata servisine erişmeyi deneyin"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Cloud color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="GCP Metadata Testi" 
                  secondary="http://metadata.google.internal/computeMetadata/v1/ ile GCP metadata servisine erişmeyi deneyin"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Cloud color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Azure Metadata Testi" 
                  secondary="http://169.254.169.254/metadata/instance?api-version=2021-02-01 ile Azure metadata servisine erişmeyi deneyin"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Warning color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Localhost Erişimi" 
                  secondary="http://localhost veya http://127.0.0.1 ile iç ağ kaynaklarına erişmeyi deneyin"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Güvenli Mod Testi" 
                  secondary="Switch'i kapatın ve aynı testleri tekrarlayın. SSRF engellenmelidir"
                />
              </ListItem>
            </List>

            <Box mt={3}>
              <Typography variant="h6">Güvenlik Önlemleri</Typography>
              <List>
                <ListItem>
                  <ListItemText 
                    primary="URL Doğrulama" 
                    secondary="URL'lerin izin verilen domain'lerden geldiğini kontrol edin"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="IP Kısıtlaması" 
                    secondary="İç ağ IP'lerine ve metadata servislerine erişimi engelleyin"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Protocol Kısıtlaması" 
                    secondary="Sadece HTTP/HTTPS protokollerine izin verin"
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

export default SSRFPage; 