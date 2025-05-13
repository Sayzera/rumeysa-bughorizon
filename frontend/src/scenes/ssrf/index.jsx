import {
  Alert,
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useContextZafiyetler } from "../../context/ZafiyetlerContext";
import axios from "axios";
import { Code } from "@mui/icons-material";

const cloudMetaDataServices = {
  jsonplaceholder: "https://jsonplaceholder.typicode.com/posts",
  fakestoreapi: "https://fakestoreapi.com/products",
  dummyjson: "https://dummyjson.com/users",
};
function SsrfScreen() {
  const [selectedService, setSelectedService] = useState();
  const [url, setUrl] = useState();
  const { zafiyetler } = useContextZafiyetler();
  const [result, setResult] = useState(null);

  const isSSRF = zafiyetler.ssrf;

  const handleServiceSelect = (event) => {
    const service = event.target.value;

    setUrl(cloudMetaDataServices[service]);
  };

  const handleRequest = async () => {
    try {
      const { data } = await axios.post(
        import.meta.env.VITE_BASE_URL + "/api/ssrf/ssrfCheck",
        {
          isSSRF: isSSRF,
          url: url,
        }
      );

      setResult(data);
    } catch (error) {
      setResult(error.response.data);
    }
  };
  return (
    <Box m="20px">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" sx={3}>
              SSRF Test Alanı
            </Typography>

            <FormControl
              fullWidth
              sx={{
                mb: 2,
                mt: 4,
              }}
            >
              <InputLabel>Bir sevis seçiniz</InputLabel>
              <Select
                value={selectedService}
                onChange={handleServiceSelect}
                variant="standard"
              >
                <MenuItem value="jsonplaceholder">
                  JSONPLACEHOLDER metadata
                </MenuItem>
                <MenuItem value="fakestoreapi">FAKESTOREAPI metadata</MenuItem>
                <MenuItem value="dummyjson">DUMMYJSON metadata</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="URL"
              variant="outlined"
              value={url}
              onChange={(e) => setUrl(e.currentTarget.value)}
            />

            <Button
              sx={{
                mt: 2,
              }}
              variant="contained"
              color="primary"
              onClick={handleRequest}
              fullWidth
            >
              İstek Gönder
            </Button>
            {result != null && (
              <Box mt={2}>
                {result && (
                  <Box mt={2} p={2} borderColor={"grey.300"} borderRadius={1}>
                    <Typography variant="body1">Yanıt</Typography>
                    <pre
                      style={{
                        maxWidth: "100%",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {JSON.stringify(result, null, 1)}
                    </pre>
                  </Box>
                )}
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
                  primary="JSONPLACEHOLDER Metadata Test"
                  secondary="https://jsonplaceholder.typicode.com/posts"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
                <ListItemText
                  primary="Fakesstoreapi Metadata Test"
                  secondary="https://fakestoreapi.com/products"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
                <ListItemText
                  primary="dummyjson Metadata Test"
                  secondary="https://dummyjson.com/users"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
                <ListItemText
                  primary="Safe Mode Test"
                  secondary="Metadata servislerine erişim engellenir"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SsrfScreen;
