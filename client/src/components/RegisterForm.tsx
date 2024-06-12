"use client";
import React, { ChangeEvent } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Collapse,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { register } from "@/lib/actions"; // Make sure to implement the register function
import CloseIcon from "@mui/icons-material/Close";

interface Form {
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
}

const validateForm = (form: Form) => {
  const errors = {
    email: false,
    password: false,
    confirmPassword: false,
  };

  if (form.email.trim() === "") {
    errors.email = true;
  }

  if (form.password.trim() === "") {
    errors.password = true;
  }

  if (
    form.confirmPassword.trim() === "" ||
    form.password !== form.confirmPassword
  ) {
    errors.confirmPassword = true;
  }

  return errors;
};

export default function RegisterForm() {
  const [form, setForm] = React.useState<Form>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = React.useState<FormErrors>({
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [openEmailError, setOpenEmailError] = React.useState<boolean>(false);
  const [openPasswordError, setOpenPasswordError] =
    React.useState<boolean>(false);
  const [openConfirmPasswordError, setOpenConfirmPasswordError] =
    React.useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = validateForm(form);
    setErrors(errors);

    if (!errors.email && !errors.password && !errors.confirmPassword) {
      const isRegistered = await register(form);

      console.log(isRegistered);

      if (isRegistered?.error === "Email already in use") {
        setOpenEmailError(true);
      }
    }
  };

  return (
    <>
      {errors.email && (
        <Box sx={{ width: "100%", pt: 2 }}>
          <Collapse in={openEmailError}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenEmailError(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
              severity="error"
            >
              <AlertTitle>Error</AlertTitle>
              Email requerido o ya en uso
            </Alert>
          </Collapse>
        </Box>
      )}
      {errors.password && (
        <Box sx={{ width: "100%", pt: 2 }}>
          <Collapse in={openPasswordError}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenPasswordError(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
              severity="error"
            >
              <AlertTitle>Error</AlertTitle>
              Contraseña requerida
            </Alert>
          </Collapse>
        </Box>
      )}
      {errors.confirmPassword && (
        <Box sx={{ width: "100%", pt: 2 }}>
          <Collapse in={openConfirmPasswordError}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenConfirmPasswordError(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
              severity="error"
            >
              <AlertTitle>Error</AlertTitle>
              Las contraseñas no coinciden
            </Alert>
          </Collapse>
        </Box>
      )}
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Registrate en la plataforma
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Dirección de Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="new-password"
            value={form.password}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirmar Contraseña"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Registrarse
          </Button>
        </Box>
      </Box>
    </>
  );
}
