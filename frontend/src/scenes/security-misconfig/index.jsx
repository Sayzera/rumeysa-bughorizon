import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Alert } from '@mui/material';
import { useVulnerability } from '../../context/VulnerabilityContext';

const SecurityMisconfigPage = () => {
  const [config, setConfig] = useState('');
  const [result, setResult] = useState('');
  const { vulnerabilities } = useVulnerability();

  const handleAccessConfig = () => {
    if (vulnerabilities.securityMisconfig) {
      // Güvenlik yapılandırma zafiyeti açık - hassas yapılandırmalara erişilebilir
      try {
        // Gerçek uygulamada burada sunucu tarafında yapılandırma dosyalarına erişilir
        setResult(`Yapılandırma başarıyla erişildi: ${config}`);
      } catch (error) {
        setResult(`Hata: ${error.message}`);
      }
    } else {
      // Güvenlik yapılandırma zafiyeti kapalı - hassas yapılandırmalar korunuyor
      setResult('Güvenlik koruması aktif - Hassas yapılandırmalara erişim engellendi!');
    }
  };

  return (
    <Box m="20px">
      <Typography variant="h4" mb="20px">
        Güvenlik Yapılandırma Hataları Test Sayfası
      </Typography>
      <Paper sx={{ p: 3, maxWidth: 800 }}>
        <Typography variant="body1" paragraph>
          Bu sayfa, güvenlik yapılandırma hatalarını test etmek için tasarlanmıştır. 
          Switch açıkken, sistem hassas yapılandırma dosyalarına erişime izin verir. 
          Switch kapalıyken, güvenlik koruması aktif olur ve hassas yapılandırmalara erişim engellenir.
        </Typography>

        <TextField
          fullWidth
          label="Yapılandırma Dosyası"
          value={config}
          onChange={(e) => setConfig(e.target.value)}
          margin="normal"
          placeholder="/etc/passwd veya .env"
          helperText="Hassas yapılandırma dosyalarına erişmeyi deneyin"
        />
        <Button 
          variant="contained" 
          onClick={handleAccessConfig}
          sx={{ mt: 2 }}
        >
          Eriş
        </Button>

        {result && (
          <Alert severity={result.includes('engellendi') ? 'success' : 'warning'} sx={{ mt: 2 }}>
            {result}
          </Alert>
        )}

        <Typography variant="body2" color="text.secondary" mt={2}>
          {vulnerabilities.securityMisconfig
            ? '⚠️ Güvenlik Koruması KAPALI - Hassas yapılandırmalara erişilebilir'
            : '✅ Güvenlik Koruması AÇIK - Hassas yapılandırmalar korunuyor'}
        </Typography>

        {vulnerabilities.securityMisconfig && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            Hassas yapılandırma dosyalarına erişim denemeleri yapabilirsiniz!
          </Alert>
        )}

        <Box mt={3}>
          <Typography variant="h6">Güvenli Yapılandırma İpuçları:</Typography>
          <Typography variant="body2" paragraph>
            1. Hassas yapılandırma dosyalarını güvenli bir şekilde saklayın
          </Typography>
          <Typography variant="body2" paragraph>
            2. Gereksiz servisleri ve özellikleri devre dışı bırakın
          </Typography>
          <Typography variant="body2" paragraph>
            3. Varsayılan kimlik bilgilerini değiştirin
          </Typography>
          <Typography variant="body2" paragraph>
            4. Düzenli güvenlik denetimleri yapın
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default SecurityMisconfigPage; 