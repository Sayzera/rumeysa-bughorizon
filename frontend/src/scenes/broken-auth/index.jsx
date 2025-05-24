import { CheckCircle, Security, Warning, Lock, ErrorOutline } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useContextZafiyetler } from "../../context/ZafiyetlerContext";
import { useVulnerability } from '../../context/VulnerabilityContext';

function BrokenAuthScreen() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState("");

  // zafiyetin açık olup olmama durumu
  const { zafiyetler, toggleZafiyet } = useContextZafiyetler();

  const [loginAttemps, setLoginAttemps] = useState(0);
  const [lastAttemptTime, setLastAttemptTime] = useState(null);
  const [isLocked, setIsLocked] = useState(false);


  const [yanlisSifreGirmeZamanAraligi, setYanlisSifreGirmeZamanAraligi] = useState(
    5000
  ) // 5 saniye

  const [basarisizSifreSayisi, setBasarisizSifreSayisi] = useState(3)

  const mocUsers = [
    {
      username: "admin",
      password: "admin123",
    },
    {
      username: "user",
      password: "password123",
    },
  ];

  const { incrementVulnerabilityCount } = useVulnerability();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(zafiyetler, "zafiyetler");

    incrementVulnerabilityCount('brokenAuth');

    // zafiyet açıksa kontrol eder
    if (zafiyetler.brokenAuth) {
      // Brute force koruması
      const now = Date.now();
      setMessage("");

      if (lastAttemptTime && now - lastAttemptTime < yanlisSifreGirmeZamanAraligi) {
        setMessage("Çok hızlı giriş denemesi yapıyorsunuz. Lütfen bekleyin.");
        return;
      }

      setLastAttemptTime(now);

      setLoginAttemps((prev) => prev + 1);

      // 3 kez başarısız denemeden sonra hesabı kitle
      if (loginAttemps >= basarisizSifreSayisi) {
        setIsLocked(true);
        setMessage(
          `Hesabınız ${basarisizSifreSayisi} kez yanlış şifre denemesi nedeniyle kilitlendi. Lütfen ${yanlisSifreGirmeZamanAraligi / 1000} saniye bekleyin.`
        );

        //  30 * 60 * 1000
        setTimeout(() => {
          setIsLocked(false);
          setLoginAttemps(0);
          setMessage("Hesap kilidi kaldırıldı. Tekrar deneyebilirsiniz.");
        },
          yanlisSifreGirmeZamanAraligi
        ); // 30 dakika sonra kilidi aç

        return;
      }

      // Şifre karmalıklığı kontrolü
      /**
 * En az 8 karakter uzunluğunda olmalı.
    En az bir büyük harf içermeli.
    En az bir küçük harf içermeli.
    En az bir rakam içermeli.
    En az bir özel karakter içermeli (örneğin: !@#$%^&*).
 */
      const passordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (!passordRegex.test(password)) {
        setMessage(
          "Şifre en az 8 karakter uzunluğunda olmalı ve büyük harf, küçük harf, rakam ve özel karakter içermelidir."
        );
        return;
      }
    }

    if (username === "admin" && password === "admin123") {
      setMessage("Giriş başarılı!");
      setIsLoggedIn(true);
    } else {
      setMessage("Kullanıcı adı veya şifre yanlış.");
    }
  };

  const handleLogout = () => {

    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setMessage("");
    document.cookie = 'session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

  }
  return (
    <Box m={20}>
      <Typography variant="h4" mb="20px">
        Bozuk Kimlik Doğrulama Test Sayfası
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="body1" paragraph>
              Bu sayfa, güvenli olmayan kimlik doğrulama uygulamalarını test
              etmek için tasarlanmıştır. Switch açıkken, sistem güvenlik
              önlemleri olmadan kimlik doğrulama yapar. Switch kapalıyken,
              güvenli kimlik doğrulama yöntemleri kullanılır.
            </Typography>
          </Paper>
          {!isLoggedIn ? (
            <Box component={"form"} onSubmit={handleSubmit} sx={{ mt: 3 }}>
              {
                <Typography variant="body2" sx={{ mt: 2 }}>
                  {!zafiyetler.brokenAuth
                    ? "⚠️ Kimlik Doğrulama Koruması KAPALI - Saldırılara açık"
                    : "✅ Kimlik Doğrulama Koruması AÇIK - Saldırılara karşı güvenli"}
                </Typography>
              }
              <TextField
                fullWidth
                label="Kullanıcı Adı"
                margin="normal"
                autoComplete="username"
                onChange={(e) => setUsername(e.target.value)}
              />

              <TextField
                fullWidth
                label="Şifre"
                type="password"
                margin="normal"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                fullWidth
                type="submit"
                color="primary"
                sx={{ mt: 2 }}
                variant="contained"
              >
                Giriş Yap
              </Button>

              {message && (
                <Alert
                  severity={message.includes("başarılı") ? "success" : "error"}
                  sx={{ mt: 2 }}
                >
                  {message}
                </Alert>
              )}

              {zafiyetler.brokenAuth && (
                <Alert security="warning" sx={{ mt: 2 }}>
                  Brute force saldırıları veya kimlik bilgisi doldurma
                  denemeleri yapabilirsiniz!
                </Alert>
              )}
            </Box>
          ) : (
            <Box>
              <Alert severity={"success"} sx={{ mt: 2 }}>
                {message}
              </Alert>

              <Typography variant="h6" mt={2}>
                Hoş geldiniz, {username}!
              </Typography>

              <Button variant="outlined" sx={{ mt: 2 }}
                onClick={() => {
                  handleLogout();
                }}
              >
                Çıkış Yap
              </Button>
            </Box>
          )}
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

              <ListItem>
                <ListItemIcon>
                <Lock color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Şifre Karmaşıklığı Kontrolü"
                  secondary="En az 8 karakter uzunluğunda olmalı.
                            En az bir büyük harf içermeli.
                            En az bir küçük harf içermeli.
                            En az bir rakam içermeli.
                            En az bir özel karakter içermeli (örneğin: !@#$%^&*)."
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                <ErrorOutline color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Başarısız Giriş Denemesi Kontrolü"
                  secondary="Kullanıcının kaç yanlış şifre denemesi yapabileceğini ve sistemin kaç dakika kilitli kalacağını giriniz."

                />
              </ListItem>
              <ListItem>
                <Box mt={2} ml={5} sx={{ width: '60%' }}>
                  <TextField
                    label="Yanlış Giriş Süresi (ms)"
                    type="number"
                    value={yanlisSifreGirmeZamanAraligi}
                    onChange={(e) => setYanlisSifreGirmeZamanAraligi(Number(e.target.value))}
                    size="small"
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Maks. Hatalı Giriş"
                    type="number"
                    value={basarisizSifreSayisi}
                    onChange={(e) => setBasarisizSifreSayisi(Number(e.target.value))}
                    size="small"
                    fullWidth
                  />
                </Box>
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
}

export default BrokenAuthScreen;
