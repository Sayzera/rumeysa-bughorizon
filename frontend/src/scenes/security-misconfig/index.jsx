import React, { useState } from "react";
import { useContextZafiyetler } from "../../context/ZafiyetlerContext";
import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Code } from "@mui/icons-material";
import axios from "axios";
import { endpoints } from "../../constant/endpoints";

function SecurityMisconfigScreen() {
  const [config, setConfig] = useState();
  const { zafiyetler } = useContextZafiyetler();
  const [checkMissconfigrationResponse, setCheckMissconfigrationResponse] =
    useState();

  const createNewMissconfigration = async () => {
    const { data } = await axios.post(
      import.meta.env.VITE_BASE_URL + endpoints.missconfigrationCheck,
      {
        isSecurityMissconfigration: zafiyetler.securityMisconfig,
        newConfigrationName: config,
      }
    );

    setCheckMissconfigrationResponse(data);
  };

  return (
    <Box m="20px">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
            }}
          >
            <Typography variant="h5" gutterBottom>
              Güvenlik Yapılandırması Testi
            </Typography>

            <TextField
              fullWidth
              label="Yapılandırma Bilgisi"
              value={config}
              onChange={(e) => setConfig(e.target.value)}
              sx={{
                mb: 2,
                mt: 2,
              }}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={createNewMissconfigration}
              fullWidth
            >
              Kontrol Et
            </Button>
          

          <Box mt={2}>
            <Alert
              severity={!zafiyetler?.securityMisconfig ? 'success' : 'error'}
              >
                  {
                    zafiyetler?.securityMisconfig ? 'Security missconfigration açığı test edilebilir': 'Security missconfigration açığı kapalıdır güvenli bir şekilde kullanılabilir'
                  }
            </Alert>

          </Box>

            {checkMissconfigrationResponse && (
              <Box mt={2}>
                <Alert
                  severity={
                    checkMissconfigrationResponse.success == 200
                      ? "success"
                      : "error"
                  }
                >
                  {checkMissconfigrationResponse.message}
                </Alert>

                {
                  checkMissconfigrationResponse.success == 200 && checkMissconfigrationResponse.data && (
                    <Box mt={2} border={1} borderColor={'grey.300'} borderRadius={1}>
                      <Typography variant="body1"> Yapılandırma Detayları </Typography>

                      <pre>
                        {
                          JSON.stringify(checkMissconfigrationResponse.data, null, 2)
                        }
                      </pre>
                      </Box>
                  )
                }
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
                  prefix="Hassas Yapılandırma Bilgileri"
                  secondary="Veritabanı bağlantı bilgileri, ap anahtarları vb"
                />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
                <ListItemText
                  primary="Debug Modu Kontrolü"
                  secondary="Production ortamında debug modunun kapalı olması"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
                <ListItemText
                  primary="Hassas Bilgiler"
                  secondary="Database URL, APIKEY, PORT"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
                <ListItemText
                  primary="Güvenli Mod Testi"
                  secondary="Hassas bilgilerin gizlenmesi ve erişimin engellenmesi"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SecurityMisconfigScreen;
