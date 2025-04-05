import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper, Alert, Grid, List, ListItem, ListItemText, ListItemIcon, Divider } from "@mui/material";
import { useVulnerability } from "../../context/VulnerabilityContext";
import { Security, Code, Warning, CheckCircle } from '@mui/icons-material';

const SQLInjectionPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const { vulnerabilities, toggleVulnerability } = useVulnerability();

  const handleSearch = (e) => {
    e.preventDefault();
    if (vulnerabilities.sqlInjection) {
      // SQL Injection açık - güvensiz sorgu
      const mockQuery = `SELECT * FROM users WHERE username = '${searchTerm}'`;
      setResults([`SQL Sorgusu: ${mockQuery}`, "Kullanıcı bulundu: admin"]);
    } else {
      // SQL Injection kapalı - güvenli sorgu
      const safeQuery = `SELECT * FROM users WHERE username = ?`;
      setResults([`SQL Sorgusu: ${safeQuery}`, "Parametre: " + searchTerm]);
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
            <Box component="form" onSubmit={handleSearch} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Kullanıcı Adı Ara"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                margin="normal"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Ara
              </Button>
            </Box>
            {results.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6">Sonuçlar:</Typography>
                <Paper sx={{ p: 2, mt: 1 }}>
                  {results.map((result, index) => (
                    <Typography key={index} sx={{ mb: 1 }}>
                      {result}
                    </Typography>
                  ))}
                </Paper>
              </Box>
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
                  primary="Temel SQL Injection" 
                  secondary="' OR '1'='1 gibi basit SQL injection denemeleri yapın"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Code color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="UNION-based SQL Injection" 
                  secondary="' UNION SELECT * FROM users -- gibi UNION tabanlı sorgular deneyin"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Warning color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Time-based SQL Injection" 
                  secondary="' OR SLEEP(5) -- gibi zaman tabanlı sorgular deneyin"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Güvenli Mod Testi" 
                  secondary="Switch'i kapatın ve aynı testleri tekrarlayın. SQL injection engellenmelidir"
                />
              </ListItem>
            </List>

            <Box mt={3}>
              <Typography variant="h6">Güvenlik Önlemleri</Typography>
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Parametreli Sorgular" 
                    secondary="Prepared statements ve parametreli sorgular kullanılmalıdır"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Input Doğrulama" 
                    secondary="Kullanıcı girdileri doğrulanmalı ve temizlenmelidir"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="ORM Kullanımı" 
                    secondary="Object-Relational Mapping (ORM) kütüphaneleri tercih edilmelidir"
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

export default SQLInjectionPage; 