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
import React, { useState } from "react";
import { useContextZafiyetler } from "../../context/ZafiyetlerContext";
import { CheckCircle, RepeatRounded, Security } from "@mui/icons-material";

function SqlInjectionScreen() {

  const mockData = [
    {
        id: 1,
        name: 'Kullanıcı 1',
        email: 'user1@example.com'
    },
    {
        id:2,
        name: 'Kullanıcı 1',
        email: 'user1@example.com'
    },
    {
        id: 3,
        name: 'Kullanıcı 1',
        email: 'user1@example.com'
    }
  ]

  const [sqlInjectionVal, setSqlInjectionVal] = useState();
  const { zafiyetler } = useContextZafiyetler();
  const [showSqlInjectionVal, setShowSqlInjectionVal] = useState();
  const [user, setUser] = useState();
  const isSqlInjection = zafiyetler.sqlInjection


  const sanitizeInput = (input) => {
    const sanitized = input.replace(/<[^>]*>/g, '' )
    return sanitized?.replace(/['";\\]/g, '')
  }

  const handleSubmit = () => {
        if(isSqlInjection) {
            setUser(mockData)
            
            setShowSqlInjectionVal(sqlInjectionVal)
        } else {
            setShowSqlInjectionVal(sanitizeInput(sqlInjectionVal))
            setUser((prev) => 
             prev?.splice(0,1)
            )
        }
     
  }


  console.log(showSqlInjectionVal, 'user')

  return (
    <Box m="20px">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Sql Injection Test
            </Typography>
            <Box mb={3} mt={3}>
              <TextField
                fullWidth
                label="SQL Sorgusu"
                placeholder='SELECT * FROM users where name = "admin"'
                multiline
                rows={4}
                onChange={(e) => {
                  setSqlInjectionVal(e.target.value);
                }}
              />
            </Box>

            <Button
              variant="contained"
              fullWidth
              sx={{
                mb: 2,
              }}
              onClick={handleSubmit}
            >
              Sorguyu Çalıştır
            </Button>

            <Alert severity={!isSqlInjection ? "success" : "error"}>
              {isSqlInjection
                ? "SQL Injection Zafiyeti Var"
                : "SQL Injection Zafiyeti Yok"}
            </Alert>

        { 
            showSqlInjectionVal && (
                <Box mt={2}>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <RepeatRounded color="primary" />
                        </ListItemIcon>
                        <div
                            primary="SQL Sorgusu"
                            dangerouslySetInnerHTML={{__html: showSqlInjectionVal}}
                        />
                    </ListItem>
                </List>

            </Box>
            )
        }
  
            
            <List>
                {
                    user?.length > 0 && 

                    user?.map((item) => (
                        <ListItem key={item.id}>
                            <ListItemText 
                             primary={item.name}
                             secondary={item.email}
                            />
                        </ListItem>
                    ))
                }
            </List>
      

          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Test Senaryoları
            </Typography>

            <List>
              <ListItem>
                <ListItemIcon>
                  <Security />
                </ListItemIcon>
                <ListItemText
                  primary="Temel SQL Injection"
                  secondary="SELECT * FROM users WHERE name = 'admin' OR '1'='1'"
                />
              </ListItem>
              <Divider />

              <ListItem>
                <ListItemIcon>
                  <Security />
                </ListItemIcon>
                <ListItemText
                  primary="Temel SQL Injection"
                  secondary="SELECT * FROM users WHERE name = 'admin' OR '1'='1'"
                />
              </ListItem>
              <Divider />

              <ListItem>
                <ListItemIcon>
                  <Security />
                </ListItemIcon>
                <ListItemText
                  primary="Union-Based Injection"
                  secondary="SELECT * FROM users WHERE id = 1 UNION SELECT 1,2,3--"
                />
              </ListItem>
              <Divider />

              
              <ListItem>
                <ListItemIcon>
                  <Security />
                </ListItemIcon>
                <ListItemText
                  primary="Script Injection"
                  secondary="<a style='color:red'>buraya tıkla<a/> "
                />
              </ListItem>
              <Divider />

              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="HTML ve SQL Injection Karakterlerinin Temizlenmesi"
                  secondary="Kullanıcı girdilerindeki HTML etiketleri ve SQL injection karakterleri temizlenir"
                />
              </ListItem>
              <Divider />

              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Parametreli Sorgular"
                  secondary="SQL sorgularında parametre kullanımı zorunludur"
                />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Input Validasyonu"
                  secondary="Kullanıcı girdileri sıkı bir şekilde kontrol edilir"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SqlInjectionScreen;
