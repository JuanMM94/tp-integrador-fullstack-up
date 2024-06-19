"use client";
import React from "react";
import {
  Box,
  CircularProgress,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { API_URL } from "@/constants/constants";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import Plushie, { PlushieProp } from "@/shared/Plushie";
import RankingCard from "@/shared/RankingCard";

export default function Page() {
  const [pageIndex, setPageIndex] = React.useState(1);

  const { data, isLoading } = useSWR(
    `${API_URL}/plushies?page=${pageIndex}&limit=30`,
    fetcher
  );

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageIndex(value);
  };

  return (
    <main>
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <RankingCard />
        <Typography variant="h2">Peluches creados por los usuarios</Typography>
        {isLoading && (
          <Box my={30}>
            <CircularProgress />
          </Box>
        )}
        {data && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 4,
              my: 4,
              justifyContent: {
                xs: "center",
                sm: "space-evenly",
                md: "flex-start",
              },
            }}
          >
            {data.plushies.map((plushie: PlushieProp) => (
              <Plushie
                key={plushie._id}
                {...plushie}
                showDeleteButton={false}
              />
            ))}
          </Box>
        )}

        <Pagination
          sx={{ display: "flex", justifyContent: "center" }}
          count={isLoading ? 5 : data.totalPages}
          onChange={handleChange}
          disabled={isLoading ? true : false}
        />
      </Stack>
    </main>
  );
}
