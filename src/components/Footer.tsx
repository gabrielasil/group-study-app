import React from "react";
import { Box, Typography, Container, Link } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: "auto",
        backgroundColor: "#1976d2",
        color: "white",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" align="center">
          {"Copyright © "}
          <Link color="inherit" href="#">
            Lista de Estudo Colaborativa
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
