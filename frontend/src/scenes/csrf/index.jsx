import { Code } from "@mui/icons-material";
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
import React, { useEffect, useState } from "react";
import { useContextZafiyetler } from "../../context/ZafiyetlerContext";
import { endpoints } from "../../constant/endpoints";
import axios from "axios";

function CsrfScreen() {
  const [amount, setEmount] = useState();
  const [recipient, setRecipient] = useState();

  const { zafiyetler, csrfToken } = useContextZafiyetler();
  const [message, setMessage] = useState();
  const isModeOnCSRF = zafiyetler.csrf;

  const testCSRF = async () => {
    try {
      const { data } = await axios.post(
        import.meta.env.VITE_BASE_URL + (isModeOnCSRF ?  endpoints.testCSRFSecure : endpoints.testCSRFNotSecure),
        {},
        {
          headers: {
            "x-csrf-token": csrfToken,
          },
          withCredentials: true,
        }
      );

      if (data?.message) {
        setMessage(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box m="20px">
      <Grid container spacing={3}>
        <Grid item sx={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Para Transferi Testi
            </Typography>
            <TextField
              sx={{
                mt: 2,
              }}
              fullWidth
              type="number"
              label="Miktar"
              value={amount}
              onChange={(e) => {
                const val = e.target.value;
                setEmount(val);
              }}
            />

            <TextField
              sx={{
                mt: 2,
              }}
              fullWidth
              label="Alıcı Hesap"
              value={recipient}
              onChange={(e) => {
                const val = e.target.value;
                setRecipient(val);
              }}
            />

            <Button
              variant="contained"
              fullWidth
              color="primary"
              sx={{
                mt: 2,
              }}
              onClick={() => {
                testCSRF();
              }}
            >
              Transfer Et
            </Button>

            <Box mt={2}>
              <Alert severity={isModeOnCSRF ? "success" : "error"}>
                CSRF koruması {isModeOnCSRF ? "Aktif" : "Pasif"} durumdadır
              </Alert>
            </Box>

              {
                message && (
                  <Box mt={2}>
                  <Alert severity={"success"}>{message}</Alert>
                </Box>
                )
              }
          
          </Paper>
        </Grid>

        <Grid item sx={12} md={6}>
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
                  primary="Form-based CSRF"
                  secondary="<form action='http://target.com/transfer' method='POST'>...</form>"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
                <ListItemText
                  primary="JSON-based CSRF"
                  secondary="fetch('http://target.com/api/transfer', {method: 'POST'...})"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
                <ListItemText
                  primary="Lax,httpOnly Cookie Test"
                  secondary="document.cookie  ve siteler arası çerez gönderimi engellendi  "
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
                <ListItemText
                  primary="CSRF Token Test"
                  secondary={` {
                    headers: {
                      "x-csrf-token": csrfToken,
                    },
                    withCredentials: true,
                  }`}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CsrfScreen;
