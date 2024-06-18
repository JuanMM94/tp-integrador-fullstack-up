"use client";
import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { API_URL } from "@/constants/constants";
import { useRouter } from "next/navigation";

const options = {
  type: ["perro", "conejo", "oso", "mapache", "gato"],
  props: ["camiseta y pelota de futbol", "guitarra electrica", "notebook"],
  color: ["rosa", "amarillo", "verde"],
};

export default function Page() {
  const [type, setType] = React.useState(options.type[0]);
  const [props, setProps] = React.useState(options.props[0]);
  const [color, setColor] = React.useState(options.color[0]);

  const [open, setOpen] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState(
    "El peluche ha sido creado con éxito"
  );

  const router = useRouter();

  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  const handlePropsChange = (event: SelectChangeEvent) => {
    setProps(event.target.value as string);
  };

  const handleColorChange = (event: SelectChangeEvent) => {
    setColor(event.target.value as string);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include" as RequestCredentials,
      body: JSON.stringify({
        type,
        props,
        color,
      }),
    };

    try {
      const res = await fetch(`${API_URL}/plushies`, options);

      if (res.ok) {
        setOpen(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    router.push("/profile");
  };

  return (
    <Box sx={{ mt: 10 }}>
      <Typography mb={10}>Creá tu propio peluche</Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        <FormControl fullWidth>
          <InputLabel id="type-label">Tipo</InputLabel>
          <Select
            labelId="type-label"
            id="type"
            value={type}
            label="Tipo"
            onChange={handleTypeChange}
          >
            {options.type.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="props-label">Accesorio</InputLabel>
          <Select
            labelId="props-label"
            id="props"
            value={props}
            label="Accesorio"
            onChange={handlePropsChange}
          >
            {options.props.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="color-label">Color</InputLabel>
          <Select
            labelId="color-label"
            id="color"
            value={color}
            label="Color"
            onChange={handleColorChange}
          >
            {options.color.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained">
          Crear
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {modalMessage.includes("éxito") ? "Success" : "Error"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{modalMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
