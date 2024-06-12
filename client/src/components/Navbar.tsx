import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
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
        <Link href="/login">
          <Button sx={{ color: "white" }}>Ingresar</Button>
        </Link>
        <Link href="/register">
          <Button sx={{ color: "white" }}>Registrarse</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
