"use client";
import { API_URL } from "@/constants/constants";
import fetcher from "@/lib/fetcher";
import { Box } from "@mui/material";
import useSWR from "swr";

export default function Page() {
  const options = {
    method: "GET",
    credentials: "include",
  };

  const { data, isLoading } = useSWR(
    [`${API_URL}/users/me/plushies`, options],
    ([url, options]) => fetcher(url, options)
  );

  return <Box></Box>;
}
