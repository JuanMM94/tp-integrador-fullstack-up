import { API_URL } from "@/constants/constants";
import fetcher from "@/lib/fetcher";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import useSWR from "swr";
import Plushie, { PlushieProp } from "./Plushie";

export default function RankingCard() {
  const { data, isLoading } = useSWR(`${API_URL}/plushies/ranking`, fetcher);

  const slicedData = data?.slice(0, 3);

  return (
    <Paper
      elevation={12}
      sx={{
        width: "100%",
        my: 5,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" mb={5}>
        Ranking de peluches
      </Typography>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          gap: { sm: 3, md: 7 },
          minHeight: 200,
        }}
      >
        {data &&
          slicedData.map((plushie: PlushieProp & { count: number }) => (
            <Box key={`${plushie.color}_${plushie.props}_${plushie.type}`}>
              <Plushie {...plushie} />
              <Typography variant="body1" component="span">
                Cantidad: {plushie.count}
              </Typography>
            </Box>
          ))}

        {isLoading && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Paper>
  );
}
