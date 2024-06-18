"use client";
import React from "react";
import { Paper, IconButton } from "@mui/material";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import useSWR, { mutate } from "swr";
import { API_URL } from "@/constants/constants";
import fetcher from "@/lib/fetcher";

export type PlushieProp = {
  type: string;
  props: string[];
  color: string[];
  _id: string;
  showDeleteButton?: boolean;
};

export default function Plushie({
  type,
  props,
  color,
  _id,
  showDeleteButton,
}: PlushieProp) {
  const sliceProps = props.slice(0, 4);
  const sliceColor = color.slice(0, 3);
  const coloredProps = `${sliceProps}_${sliceColor}`;

  const handleDelete = async () => {
    const options = {
      method: "DELETE",
      credentials: "include" as RequestCredentials,
    };
    await fetch(`${API_URL}/plushies/${_id}`, options);
    mutate(`${API_URL}/users/me/plushies`, true);
  };

  return (
    <Paper elevation={1} square sx={{ position: "relative" }}>
      <Image width={100} height={100} alt={type} src={`/heads/${type}.png`} />
      <Image
        width={100}
        height={100}
        alt={`${props} ${color}`}
        src={`/props/${coloredProps}.png`}
      />
      {showDeleteButton && (
        <IconButton
          onClick={handleDelete}
          sx={{ position: "absolute", top: 0, right: 0 }}
        >
          <DeleteIcon />
        </IconButton>
      )}
    </Paper>
  );
}
