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
import Plushie from "@/components/Plushie";
import RankingCard from "@/components/RankingCard";

export interface PlushieProp {
  _id: string;
  _creator: string;
  color: string;
  type: string;
  props: string;
}

export default function Page() {
  const [pageIndex, setPageIndex] = React.useState(1);

  const { data, isLoading } = useSWR(
    `${API_URL}/plushies?page=${pageIndex}&limit=15`,
    fetcher
  );

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageIndex(value);
  };

  console.log(data);

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
              justifyContent: "space-around",
            }}
          >
            {data.plushies.map((plushie: PlushieProp) => (
              <Plushie key={plushie._id} {...plushie} />
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
