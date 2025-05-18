import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useContextZafiyetler } from "../../context/ZafiyetlerContext";
import { Code } from "@mui/icons-material";

const scriptExamples = {
  alert: "<script>alert('XSS Test')</script>",
  console: "<script>console.log('Test Log')</script>",
  external: "<script src='https://example.com/malicious.js'></script>",
  event: "<img src='x' onerror='alert(1)'>",
  eval: "eval('alert(1)')",
};

function CspScreen() {
  const [selectedExample, setSelectedExample] = useState();
  const [script, setScript] = useState();
  const { zafiyetler } = useContextZafiyetler();
  const [result, setResult] = useState();
  const isCspActive = zafiyetler.csp;

  const handleExampleSelect = (event) => {
    const example = event.target.value;
    setSelectedExample(example);
    setScript(scriptExamples[example]);
  };

  const metaContentType = {
    safe: `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self';`,
    unsafe: `default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self'`,
  };
  useEffect(() => {
    const metaTag = document.createElement("meta");
    metaTag.httpEquiv = "Content-Security-Policy";
    metaTag.content = isCspActive
      ? metaContentType["safe"]
      : metaContentType["unsafe"];

    const existingMeta = document.querySelector(
      'meta[http-equiv="Content-Security-Policy"]'
    );

    if (existingMeta) {
      existingMeta?.remove();
    }

    document.head.appendChild(metaTag);

    return () => {
      const meta = document.querySelector(
        'meta[http-equiv="Content-Security-Policy"]'
      );
      if (meta) {
        meta.remove();
      }
    };
  }, [isCspActive]);

  const handleExecute = () => {
    if (!isCspActive) {
      try {
        eval(script.replace(/<script>|<\/script>/g, ""));

        setResult({
          success: true,
          message: "Script başarıyla çalıştırıldı",
        });
      } catch (error) {
        setResult({
          success: false,
          message: `Hata ${error.messge}`,
        });

        console.log(error, "error");
      }
    } else {
      setResult({
        success: false,
        message: "CSP politikası nedeniyle script engellendi",
      });
    }

    setTimeout(() => {
        window.location.reload()
    }, 5000);
  };

  return (
    <Box m="20px">
      <Grid container spacing={3}>
        <Grid item sx={12} md={6} >
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              CSP Test Alanı
            </Typography>

            <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
              <InputLabel>Script Örneği Seçin</InputLabel>
              <Select
                variant="standard"
                value={selectedExample || ""}
                onChange={handleExampleSelect}
              >
                <MenuItem value="alert">Alert Script</MenuItem>
                <MenuItem value="console">Console Log</MenuItem>
                <MenuItem value="external">External Script</MenuItem>
                <MenuItem value="eval">Eval Script</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              multiline
              variant="standard"
              rows={4}
              value={script}
              onChange={(e) => setScript(e.target.value)}
            />
            <Button
              sx={{ mt: 2 }}
              variant="contained"
              fullWidth
              color="primary"
              onClick={handleExecute}
            >
              Çalıştır
            </Button>
            {result && (
              <Box mt={2}>
                <Alert severity={result?.success ? "success" : "error"}>
                  {result?.message}
                </Alert>
              </Box>
            )}
          </Paper>
        </Grid>
        <Grid item sx={12} md={6} >
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
                  primary="Inline Script Test"
                  secondary="<script>alert('XSS')</script>"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
                <ListItemText
                  primary="External Script Test"
                  secondary="<script src='http://evil.com/script.js'></script>"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
                <ListItemText
                  primary="Event Handler Test"
                  secondary="<img src='x' onerror='alert(1)'>"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
                <ListItemText
                  primary="Safe Mode Test"
                  secondary="CSP header'ları ile script çalıştırma engellenir"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CspScreen;
