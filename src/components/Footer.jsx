import { Box, Typography, Container } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: "darkgoldenrod",
        borderTop: 1,
        borderColor: "divider",
        textAlign: "center",
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body2" color="textPrimary">
          © {new Date().getFullYear()} Cost Tracker
        </Typography>
      </Container>
    </Box>
  );
}