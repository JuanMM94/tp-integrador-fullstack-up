"use client";
import React from "react";
import { Paper } from "@mui/material";
import Image from "next/image";
import { PlushieProp } from "@/app/page";

export default function Plushie({ type, props, color }: PlushieProp) {
  const sliceProps = props.slice(0, 4);
  const sliceColor = color.slice(0, 3);
  const coloredProps = `${sliceProps}_${sliceColor}`;

  return (
    <Paper elevation={1} square>
      <Image width={100} height={100} alt={type} src={`/heads/${type}.png`} />
      <Image
        width={100}
        height={100}
        alt={`${props} ${color}`}
        src={`/props/${coloredProps}.png`}
      />
    </Paper>
  );
}
