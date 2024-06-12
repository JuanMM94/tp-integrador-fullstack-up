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
import { login } from "@/lib/actions";
import CloseIcon from "@mui/icons-material/Close";

interface Form {
  email: string;
  password: string;
}

interface FormErrors {
  email: boolean;
  password: boolean;
}

const validateForm = (form: Form) => {
  const errors = {
    email: false,
    password: false,
  };

  if (form.email.trim() === "") {
    errors.email = true;
  }

  if (form.password.trim() === "") {
    errors.password = true;
  }

  return errors;
};

export default function LoginForm() {
  const [form, setForm] = React.useState<Form>({ email: "", password: "" });
  const [errors, setErrors] = React.useState<FormErrors>({
    email: false,
    password: false,
  });
  const [openEmailError, setOpenEmailError] = React.useState<boolean>(false);
  const [openPasswordErrror, setOpenPasswordError] =
    React.useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = validateForm(form);
    setErrors(errors);

    if (!errors.email && !errors.password) {
      const isLogin = await login(form);

      console.log(isLogin);

      if (isLogin?.error === "Incorrect email") {
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
              Email requerido
            </Alert>
          </Collapse>
        </Box>
      )}
      {errors.password && (
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
              Contraseña requerida
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
          Ingresá a la plataforma
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
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </>
  );
}
