import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper, Alert, Grid, List, ListItem, ListItemText, ListItemIcon, Divider } from "@mui/material";
import { useVulnerability } from "../../context/VulnerabilityContext";
import { Security, Lock, Warning, CheckCircle } from '@mui/icons-material';
import { useTestCount } from "../../context/TestCountContext";

const BrokenAuthPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const { vulnerabilities, toggleVulnerability } = useVulnerability();
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lastAttemptTime, setLastAttemptTime] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const { incrementTestCount } = useTestCount();
  const [result, setResult] = useState(null);

  // Örnek kullanıcı veritabanı
  const mockUsers = [
    { username: 'admin', password: 'admin123' },
    { username: 'user', password: 'password123' }
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    


    incrementTestCount('brokenAuth');
    if (!vulnerabilities.brokenAuth) {
      // Güvenlik açığı aktifken
      if (username === "admin" && password === "admin123") {
        setResult({
          success: true,
          message: "Giriş başarılı! (Güvenlik açığı aktif)"
        });
      } else {
        setResult({
          success: false,
          message: "Kullanıcı adı veya şifre hatalı!"
        });
      }
    } else {
          // Hesap kilitleme kontrolü
    if (isLocked) {
      setMessage("Hesabınız geçici olarak kilitlendi. Lütfen daha sonra tekrar deneyin.");
      return;
    }

    // Brute force koruması
    const now = Date.now();
    if (lastAttemptTime && now - lastAttemptTime < 5000) { // 5 saniye bekleme süresi
      setMessage("Çok hızlı giriş denemesi yapıyorsunuz. Lütfen bekleyin.");
      return;
    }

    setLastAttemptTime(now);
    setLoginAttempts(prev => prev + 1);

    // 3 başarısız denemeden sonra hesabı kilitle
    if (loginAttempts >= 3) {
      setIsLocked(true);
      setMessage("Çok fazla başarısız giriş denemesi. Hesabınız 30 dakika boyunca kilitlendi.");
      setTimeout(() => {
        setIsLocked(false);
        setLoginAttempts(0);
        setMessage("Hesap kilidi kaldırıldı. Tekrar deneyebilirsiniz.");
      }, 30 * 60 * 1000); // 30 dakika
      return;
    }


      // Güvenlik önlemleri aktifken
      // Şifre karmaşıklığı kontrolü
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        setMessage("Şifre en az 8 karakter uzunluğunda olmalı ve büyük harf, küçük harf, rakam ve özel karakter içermelidir.");
        return;
      }

      // Kullanıcı adı kontrolü
      if (username.length < 3) {
        setMessage("Kullanıcı adı en az 3 karakter olmalıdır.");
        return;
      }

      // Simüle edilmiş güvenli giriş
      try {
        // Burada gerçek bir API çağrısı yapılabilir
        setMessage("Güvenli giriş işlemi başlatıldı...");
        // 2FA kontrolü eklenebilir
        // Oturum yönetimi eklenebilir
      } catch (error) {
        setMessage("Giriş işlemi sırasında bir hata oluştu.");
      }
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setMessage('');
    document.cookie = 'session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };

  return (
    <Box m="20px">
      <Typography variant="h4" mb="20px">
        Bozuk Kimlik Doğrulama Test Sayfası
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="body1" paragraph>
              Bu sayfa, güvenli olmayan kimlik doğrulama uygulamalarını test etmek için tasarlanmıştır. 
              Switch açıkken, sistem güvenlik önlemleri olmadan kimlik doğrulama yapar. 
              Switch kapalıyken, güvenli kimlik doğrulama yöntemleri kullanılır.
            </Typography>

            {!isLoggedIn ? (
              <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
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
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Giriş Yap
                </Button>
              </Box>
            ) : (
              <Box>
                <Typography variant="h6">Hoş geldiniz, {username}!</Typography>
                <Button onClick={handleLogout} variant="outlined" sx={{ mt: 2 }}>
                  Çıkış Yap
                </Button>
              </Box>
            )}

            {message && (
              <Alert severity={message.includes('başarılı') ? 'success' : 'error'} sx={{ mt: 2 }}>
                {message}
              </Alert>
            )}

            <Typography variant="body2" color="text.secondary" mt={2}>
              {vulnerabilities.brokenAuth
                ? '⚠️ Kimlik Doğrulama Koruması KAPALI - Saldırılara açık'
                : '✅ Kimlik Doğrulama Koruması AÇIK - Saldırılara karşı güvenli'}
            </Typography>

            {vulnerabilities.brokenAuth && (
              <Alert severity="warning" sx={{ mt: 2 }}>
                Brute force saldırıları veya kimlik bilgisi doldurma denemeleri yapabilirsiniz!
              </Alert>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Test Senaryoları
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Security color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Brute Force Saldırısı"
                  secondary="Yanlış şifrelerle tekrar tekrar giriş yapmayı deneyin. Örnek: admin kullanıcı adıyla farklı şifreler deneyin."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Lock color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Zayıf Şifre Politikası"
                  secondary="Çok kısa veya basit şifrelerle kayıt olmayı deneyin. Örnek: 1234, password gibi zayıf şifreler."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Warning color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Oturum Yönetimi"
                  secondary="Başarılı giriş yaptıktan sonra çıkış yapın ve tarayıcının geri tuşuna basın. Oturum hala açık kalıyor mu?"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Güvenli Mod Testi"
                  secondary="Switch'i kapatın ve aynı testleri tekrarlayın. Sistem artık güvenlik önlemleriyle çalışmalı."
                />
              </ListItem>
            </List>

            <Box mt={3}>
              <Typography variant="h6">Örnek Kimlik Bilgileri</Typography>
              <Typography variant="body2" color="text.secondary">
                Kullanıcı Adı: admin
                <br />
                Şifre: admin123
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BrokenAuthPage; 