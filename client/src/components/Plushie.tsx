"use client";
import React from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import { PlushieProp } from "@/app/page";

export default function Plushie({ type, props, color }: PlushieProp) {
  const sliceProps = props.slice(0, 4);
  const sliceColor = color.slice(0, 3);
  const coloredProps = `${sliceProps}_${sliceColor}`;

  return (
    <Box>
      <Image width={100} height={100} alt={type} src={`/heads/${type}.png`} />
      <Image
        width={100}
        height={100}
        alt={`${props} ${color}`}
        src={`/props/${coloredProps}.png`}
      />
    </Box>
  );
}
