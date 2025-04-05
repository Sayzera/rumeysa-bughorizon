import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Alert, List, ListItem, ListItemText } from '@mui/material';
import { useVulnerability } from '../../context/VulnerabilityContext';

const LoggingPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [logs, setLogs] = useState([]);
  const { vulnerabilities } = useVulnerability();

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (vulnerabilities.loggingDeficiencies) {
      // Logging zafiyeti açık - hassas bilgiler loglanıyor
      const logEntry = {
        timestamp: new Date().toISOString(),
        event: 'giriş_denemesi',
        username,
        password,
        success: username === 'admin' && password === 'admin123'
      };
      setLogs(prev => [...prev, logEntry]);
    } else {
      // Logging zafiyeti kapalı - güvenli loglama
      const logEntry = {
        timestamp: new Date().toISOString(),
        event: 'giriş_denemesi',
        username,
        success: username === 'admin' && password === 'admin123'
      };
      setLogs(prev => [...prev, logEntry]);
    }
  };

  return (
    <Box m="20px">
      <Typography variant="h4" mb="20px">
        Loglama Zafiyetleri Test Sayfası
      </Typography>
      <Paper sx={{ p: 3, maxWidth: 800 }}>
        <Typography variant="body1" paragraph>
          Bu sayfa, güvenli olmayan loglama uygulamalarını test etmek için tasarlanmıştır. 
          Switch açıkken, sistem hassas bilgileri (şifreler dahil) loglara kaydeder. 
          Switch kapalıyken, sadece güvenli bilgiler loglanır.
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Kullanıcı Adı"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            autoComplete="username"
          />
          <TextField
            fullWidth
            label="Şifre"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            autoComplete="current-password"
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Giriş Yap
          </Button>
        </form>

        <Box mt={3}>
          <Typography variant="h6">Log Kayıtları:</Typography>
          <List>
            {logs.map((log, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${new Date(log.timestamp).toLocaleString()} - ${log.event}`}
                  secondary={
                    vulnerabilities.loggingDeficiencies
                      ? `Kullanıcı Adı: ${log.username}, Şifre: ${log.password}, Başarılı: ${log.success ? 'Evet' : 'Hayır'}`
                      : `Kullanıcı Adı: ${log.username}, Başarılı: ${log.success ? 'Evet' : 'Hayır'}`
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Typography variant="body2" color="text.secondary" mt={2}>
          {vulnerabilities.loggingDeficiencies
            ? '⚠️ Loglama Koruması KAPALI - Hassas veriler loglanıyor'
            : '✅ Loglama Koruması AÇIK - Hassas veriler korunuyor'}
        </Typography>

        {vulnerabilities.loggingDeficiencies && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            Farklı kimlik bilgileriyle giriş yapmayı deneyin ve logları kontrol edin!
          </Alert>
        )}

        <Box mt={3}>
          <Typography variant="h6">Güvenli Loglama İpuçları:</Typography>
          <Typography variant="body2" paragraph>
            1. Hassas bilgileri (şifreler, kredi kartı numaraları vb.) asla loglamayın
          </Typography>
          <Typography variant="body2" paragraph>
            2. Logları düzenli olarak temizleyin ve güvenli bir şekilde saklayın
          </Typography>
          <Typography variant="body2" paragraph>
            3. Loglara erişimi sınırlandırın ve izleyin
          </Typography>
          <Typography variant="body2" paragraph>
            4. Logları şifreleyin ve bütünlüklerini koruyun
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoggingPage; 