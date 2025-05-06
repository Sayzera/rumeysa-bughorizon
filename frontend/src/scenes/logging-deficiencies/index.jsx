import { Check, Close, Code } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useContextZafiyetler } from "../../context/ZafiyetlerContext";

function LoggingDeficienciesScreen() {
  const [logMessage, setLogMessage] = useState();
  const { zafiyetler } = useContextZafiyetler();
  const [log, setLog] = useState();
  const [logs, setLogs] = useState([]);

  const isLoggingDeficiencies = zafiyetler.loggingDeficiencies;

  const onSubmitHandleLog = () => {
    const serializedLog = {
      message: logMessage,
      ...(isLoggingDeficiencies
        ? {
            userId: "Bilgi Bulunamadı",
            userIp: "Bilgi Bulunamadı",
            userAgent: "Bilgi Bulunamadı",
          }
        : {
            timestamp: new Date().toISOString(),
            userId: "12345",
            userIp: "193.168.1.1",
            userAgent:
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
          }),
    };

    setLog(serializedLog);

    const logItem = [serializedLog, ...logs];
    setLogs(logItem, "logItem");
  };

  console.log(logs);

  return (
    <Box m="20px">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Log
            </Typography>
            <TextField
              className="mt-5!"
              fullWidth
              multiline
              rows={4}
              label="Log Mesajı"
              value={logMessage}
              onChange={(e) => setLogMessage(e.target.value)}
              placeholder="Log mesajını buraya girin..."
            />
            <Button
              variant="contained"
              fullWidth
              className="mt-5!"
              onClick={onSubmitHandleLog}
            >
              Log Kaydet
            </Button>

            <Box mt={2}>
              <Alert severity={!isLoggingDeficiencies ? "success" : "error"}>
                {!isLoggingDeficiencies
                  ? "Log detayları güvenli bir şekilde kaydediliyor."
                  : "Log detayları güvenli bir şekilde kaydedilemiyor."}
              </Alert>
            </Box>

            {log && (
              <Box
                mt={4}
                p={2}
                border={1}
                borderColor={"grey.300"}
                borderRadius={1}
              >
                <Typography variant="body1">Log Detayları</Typography>
                <pre
                  style={{
                    textWrap: "wrap",
                    marginTop: "20px",
                  }}
                >
                  {JSON.stringify(log)}
                </pre>
              </Box>
            )}
            {logs && logs.length > 0 && (
              <>
                <Typography variant="body1" className="mt-5!">
                  Log Mesajları
                </Typography>
                <List className="max-h-[300px] overflow-auto">
                  {logs?.map((item, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        ...(item?.userIp === "Bilgi Bulunamadı"
                          ? {
                              borderBottom: "1px dashed red",
                            }
                          : {
                              borderBottom: "1px dashed green",
                            }),
                      }}
                    >
                      <ListItemIcon>
                        {
                          item?.userAgent === 'Bilgi Bulunamadı' ? (
                            <Close className="text-red-500" />
                          ) : (
                            <Check className="text-green-500!" />

                          )
                        }
                       
                      </ListItemIcon>
                      <ListItemText
                        primary={JSON.stringify(item)}
                        secondary="Kredi kartı, Kullanıcı hareketleri gibi hassas bilgilerin loglanması."
                      />
                    </ListItem>
                  ))}
                </List>
              </>
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
                  primary="Hassas Bilgi Loglama"
                  secondary="Kredi kartı, Kullanıcı hareketleri gibi hassas bilgilerin loglanması."
                />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
                <ListItemText
                  primary="Log Temizleme"
                  secondary="Logların düzenli temizlenmemesi"
                />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
                <ListItemText
                  primary="Yetersiz Log Detayı"
                  secondary="Önemli olayların yetersiz detayla loglanması"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LoggingDeficienciesScreen;
