import React from "react";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  Box,
  Typography,
  AppBar,
  Toolbar,
  Avatar,
} from "@mui/material";
import { loggedInUser } from "./data/mock";
import Dashboard from "./pages/Dashboard";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Lista de Estudo Colaborativa
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ mr: 2 }}>{loggedInUser.name}</Typography>
              <Avatar alt={loggedInUser.name} src={loggedInUser.avatar} />
            </Box>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, backgroundColor: "#f4f6f8" }}
        >
          <Dashboard />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
