"use client";
import { API_URL } from "@/constants/constants";
import fetcher from "@/lib/fetcher";
import { useAuth } from "@/shared/contexts/AuthContext";
import Plushie from "@/shared/Plushie";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import Link from "next/link";
import useSWR from "swr";

export default function Page() {
  const options = {
    method: "GET",
    credentials: "include",
  };

  const { data, isLoading } = useSWR(
    [`${API_URL}/users/me/plushies`, options],
    ([url, options]) => fetcher(url, options)
  );

  const { user } = useAuth();

  return (
    <Container sx={{ mt: 8 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
      >
        <Typography variant="h6">Tus datos</Typography>
        {!isLoading && (
          <>
            <Typography variant="body2">Email: {user?.email}</Typography>
            <Typography variant="body2">Nombre: {user?.name}</Typography>
          </>
        )}
        <Typography variant="h6">Tus peluches</Typography>
        {isLoading ? (
          <CircularProgress />
        ) : data?.length === 0 ? (
          <Typography>
            Parece que no tenés peluches! Creá uno{" "}
            <Box component={Link} href="/profile/create">
              acá
            </Box>
            .
          </Typography>
        ) : (
          data?.map((plushie: any) => (
            <Plushie key={plushie._id} {...plushie} />
          ))
        )}
      </Box>
    </Container>
  );
}
