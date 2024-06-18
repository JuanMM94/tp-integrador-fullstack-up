"use client";
import { API_URL } from "@/constants/constants";
import fetcher from "@/lib/fetcher";
import Plushie from "@/shared/Plushie";
import { AddCircle } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import Link from "next/link";
import useSWR from "swr";

export default function Page() {
  const options = {
    method: "GET",
    credentials: "include",
  };

  const { data: plushies, isLoading } = useSWR(
    [`${API_URL}/users/me/plushies`, options],
    ([url, options]) => fetcher(url, options),
    { refreshInterval: 100 }
  );

  const { data: user } = useSWR(
    [`${API_URL}/users/me`, options],
    ([url, options]) => fetcher(url, options)
  );

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
        ) : plushies?.length === 0 ? (
          <Typography>
            Parece que no tenés peluches! Creá uno{" "}
            <Box component={Link} href="/profile/create">
              acá
            </Box>
            .
          </Typography>
        ) : (
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              justifyContent: {
                xs: "center",
                sm: "space-evenly",
                md: "space-between",
              },
            }}
          >
            <Box sx={{ mb: 2 }}>
              <IconButton component={Link} href="/profile/create">
                <AddCircle />
              </IconButton>
            </Box>
            {plushies.map((plushie: any) => (
              <Plushie key={plushie._id} {...plushie} showDeleteButton={true} />
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
}
