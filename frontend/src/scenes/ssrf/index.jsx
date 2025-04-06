import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper, Alert, Grid, List, ListItem, ListItemText, ListItemIcon, Divider, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useVulnerability } from "../../context/VulnerabilityContext";
import { Security, Code, Warning, CheckCircle } from '@mui/icons-material';
import { useTestCount } from "../../context/TestCountContext";

const SSRFPage = () => {
  const { vulnerabilities } = useVulnerability();
  const { incrementTestCount } = useTestCount();
  const [url, setUrl] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [result, setResult] = useState(null);

  const cloudMetadataServices = {
    aws: "http://169.254.169.254/latest/meta-data/",
    gcp: "http://metadata.google.internal/computeMetadata/v1/",
    azure: "http://169.254.169.254/metadata/instance?api-version=2021-02-01"
  };

  const handleServiceSelect = (event) => {
    const service = event.target.value;
    setSelectedService(service);
    setUrl(cloudMetadataServices[service]);
  };

  const handleRequest = () => {
    incrementTestCount('ssrf');
    if (vulnerabilities.ssrf) {
      // SSRF açığı aktif ise, isteği doğrudan gönder
      setResult({
        success: true,
        message: "İstek başarıyla gönderildi",
        response: {
          status: 200,
          data: "Metadata bilgileri başarıyla alındı"
        }
      });
    } else {
      // SSRF açığı kapalı ise, isteği engelle
      setResult({
        success: false,
        message: "Error: Access to cloud metadata services is blocked"
      });
    }
  };

  return (
    <Box m="20px">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              SSRF Test Alanı
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Cloud Service Seçin</InputLabel>
              <Select
                value={selectedService}
                onChange={handleServiceSelect}
                label="Cloud Service Seçin"
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
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleRequest}
              fullWidth
            >
              İstek Gönder
            </Button>
            {result !== null && (
              <Box mt={2}>
                <Alert severity={result.success ? "success" : "error"}>
                  {result.message}
                </Alert>
                {result.response && (
                  <Box mt={2} p={2} border={1} borderColor="grey.300" borderRadius={1}>
                    <Typography variant="body1">Yanıt:</Typography>
                    <pre>{JSON.stringify(result.response, null, 2)}</pre>
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
                  primary="AWS Metadata Test"
                  secondary="http://169.254.169.254/latest/meta-data/"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
                <ListItemText
                  primary="GCP Metadata Test"
                  secondary="http://metadata.google.internal/computeMetadata/v1/"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
                <ListItemText
                  primary="Azure Metadata Test"
                  secondary="http://169.254.169.254/metadata/instance?api-version=2021-02-01"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
                <ListItemText
                  primary="Safe Mode Test"
                  secondary="Metadata servislerine erişim engellenir"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SSRFPage; 