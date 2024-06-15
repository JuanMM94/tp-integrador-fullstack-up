"use client"

import React from "react";
import { API_URL, JWT_SECRET } from "@/constants/constants";
import fetcher from "@/lib/fetcher";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import { jwtVerify } from "jose";
import { useParams } from "next/navigation";
import useSWR from "swr";

export default function Page() {
  const params = useParams();
  const [jwtError, setJwtError] = React.useState<boolean>(false);
  const jwt = params.token;

  const { data, isLoading } = useSWR(
    `${API_URL}/auth/confirmation/${jwt}`,
    fetcher
  );


  const handleResendClick = async () => {
  
    if (jwt && typeof jwt === "string") {
      try {
        const secretKey = new TextEncoder().encode(JWT_SECRET);
        const { payload } = await jwtVerify(jwt, secretKey);
        console.log(payload);
      } catch (error) {
        console.log(error);
        setJwtError(true);
      }
    }
  };

  React.useEffect(() => {
    setJwtError(false);
  }, []);

  return (
    <Box
      sx={{
        mt: 30,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {data?.message === "User has been verified" && (
        <Typography variant="h6">Tu usuario ha sido verificado.</Typography>
      )}
      {data?.error === "Invalid or expired token" && !jwtError && (
        <>
          <Typography variant="h6">
            El token es inválido o está expirado. Probá pidiendo otro clickeando
            el botón.
          </Typography>
          <Button
            variant="contained"
            onClick={handleResendClick}
            sx={{ maxWidth: 200 }}
          >
            Reenviar token
          </Button>
        </>
      )}
      {data?.error === "User is already verified" && (
        <Typography variant="h6">Tu usuario ya está verificado.</Typography>
      )}
      {jwtError && (
        <Typography variant="h6">
          Tu token es inválido, por favor contactate con soporte@peluches.com
        </Typography>
      )}
      {isLoading && (
        <Box my={10}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}
