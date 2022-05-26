import type { NextPage } from "next";

import { Hero, Search, SongCard } from "../components";
import { Box, Text, Spinner, Grid } from "@chakra-ui/react";

import { useData } from "../contexts/DataContext";

const Home: NextPage = () => {
  const { loading, Audios } = useData();

  return (
    <Box
      minH="100vh"
      minW="full"
      overflowX="hidden"
      display="flex"
      flexDir="column"
    >
      <Box>
        <Hero />
        <Search />
      </Box>

      <Box
        my="24"
        mx="20"
        display="flex"
        flexDir="column"
        justifyContent={loading ? "center" : ""}
        alignItems={loading ? "center" : ""}
        gap="8"
      >
        {loading && <Spinner size="xl" color="blue.500" thickness="3px" />}

        {Audios && (
          <>
            <Text
              fontFamily="syncopate"
              fontSize="3xl"
              fontWeight="700"
              textColor="#4B5563"
            >
              FEATURED SONGS
            </Text>
            <Grid
              gap="8"
              templateColumns="repeat(3, 1fr)"
              justifyContent="center"
            >
              {Audios.map((audio) => (
                <SongCard
                  key={audio.index}
                  hash={audio.hash}
                  address={audio.author}
                  description={audio.description}
                  totalTips={audio.tipAmount}
                  id={audio.id}
                  owner={audio.author}
                />
              ))}
            </Grid>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Home;
