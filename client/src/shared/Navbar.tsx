"use client";

import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "./contexts/AuthContext";

export default function Navbar() {
  const { user } = useAuth();

  console.log(user)

  return (
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" flexGrow={1} alignItems="center">
          <Link href="/">
            <Image src="/icon.webp" alt="Logo" width={40} height={40} />
          </Link>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, marginLeft: 2 }}
          >
            Creador de Peluches
          </Typography>
        </Box>
        {false ? (
          <>
            <Link href="/profile">
              <Button sx={{ color: "white" }}>Perfil</Button>
            </Link>
            <Link href="/logout">
              <Button sx={{ color: "white" }}>Salir</Button>
            </Link>
          </>
        ) : (
          <>
            <Link href="/login">
              <Button sx={{ color: "white" }}>Ingresar</Button>
            </Link>
            <Link href="/register">
              <Button sx={{ color: "white" }}>Registrarse</Button>
            </Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
