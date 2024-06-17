"use client";
import { logout } from "@/lib/actions";
import { Box, Typography } from "@mui/material";
import useSWR from "swr";

export default function Page() {
  const { data, isLoading } = useSWR("logout", logout);

  return (
    <Box sx={{ m: 8 }}>
      {!isLoading && (
        <Typography variant="h6">
          Gracias por usar el creador de peluches. Volvé cuando quieras!
        </Typography>
      )}
    </Box>
  );
}
