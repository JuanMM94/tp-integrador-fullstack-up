import { Box, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Box
      sx={{
        height: "100%",
      }}
    >
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        404 | Página no encontrada
      </Typography>
    </Box>
  );
}
