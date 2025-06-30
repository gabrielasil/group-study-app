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
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#43a047",
    },
    background: {
      default: "#f4f6f8",
    },
    text: {
      primary: "#212121",
      secondary: "#616161",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: "none",
          backgroundColor: "#1976d2",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
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
          sx={{ flexGrow: 1, p: 3, backgroundColor: "background.default" }}
        >
          <Dashboard />
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
