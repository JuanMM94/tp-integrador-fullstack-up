"use client";

import React from "react";

import Box from "@mui/material/Box";

type Props = {
  children: React.ReactNode;
};

const BackgroundVideo: React.FC<Props> = ({ children }) => (
  <Box>
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",  
        height: "100%",
        // This is to merge with background
        maskImage: `radial-gradient(
          80% 50.00% at 50% 50.00%,
          #FFFFFF 0%,
          rgba(255, 255, 255, 0.001) 100%
        )`,
        zIndex: -1,
      }}
      component="video"
      autoPlay
      muted
      loop
      playsInline
    >
      <Box component="source" src="/dots.mp4" type="video/mp4" />
    </Box>
    {children}
  </Box>
);

export default BackgroundVideo;
