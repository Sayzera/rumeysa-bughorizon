import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper, Alert, Grid, List, ListItem, ListItemText, ListItemIcon, Divider } from "@mui/material";
import { useVulnerability } from "../../context/VulnerabilityContext";
import { Security, Code, Warning, CheckCircle } from '@mui/icons-material';

const XSSPage = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { vulnerabilities, toggleVulnerability } = useVulnerability();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (vulnerabilities.xss) {
      // Güvenlik açığı aktifken - HTML/JavaScript enjeksiyonuna açık
      setOutput(input);
    } else {
      // Güvenlik önlemleri aktifken - HTML/JavaScript enjeksiyonu engellenir
      setOutput(input.replace(/[&<>"']/g, (match) => {
        const escape = {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;'
        };
        return escape[match];
      }));
    }
  };

  return (
    <Box m="20px">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              XSS (Cross-Site Scripting) Test
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Metin Girin"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                margin="normal"
                multiline
                rows={4}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Gönder
              </Button>
            </Box>
            {output && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6">Çıktı:</Typography>
                <Paper sx={{ p: 2, mt: 1, minHeight: '100px' }}>
                  <div dangerouslySetInnerHTML={{ __html: output }} />
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
                  primary="Stored XSS Testi" 
                  secondary="Kalıcı XSS saldırısı için: <script>alert('XSS')</script> veya <img src='x' onerror='alert(1)'> gibi kodlar deneyin"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Code color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Reflected XSS Testi" 
                  secondary="Yansıtılan XSS için: ?q=<script>alert('XSS')</script> gibi URL parametreleri deneyin"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Warning color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="DOM XSS Testi" 
                  secondary="DOM tabanlı XSS için: #<script>alert('XSS')</script> gibi fragment identifier'lar deneyin"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Güvenli Mod Testi" 
                  secondary="Switch'i kapatın ve aynı testleri tekrarlayın. Kod enjeksiyonu engellenmelidir"
                />
              </ListItem>
            </List>

            <Box mt={3}>
              <Typography variant="h6">Güvenlik Önlemleri</Typography>
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Input Doğrulama" 
                    secondary="Tüm kullanıcı girdileri doğrulanmalı ve temizlenmelidir"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Output Encoding" 
                    secondary="HTML, JavaScript ve URL encoding kullanılmalıdır"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Content Security Policy" 
                    secondary="CSP header'ları ile script çalıştırma kısıtlanmalıdır"
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

export default XSSPage; 