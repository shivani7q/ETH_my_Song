import type { NextPage } from "next";

import { Hero, Search, SongCard } from "../components";
import { Box, Text, Flex, Spinner, Grid } from "@chakra-ui/react";

import { useData } from "../contexts/DataContext";

const Home: NextPage = () => {
  const { loading, Audios } = useData();

  console.log(Audios);

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

      <Box my="24" mx="20" display="flex" flexDir="column" gap="8">
        <Text
          fontFamily="syncopate"
          fontSize="3xl"
          fontWeight="700"
          textColor="#4B5563"
        >
          FEATURED SONGS
        </Text>
        <Grid gap="8" templateColumns="repeat(3, 1fr)" justifyContent="center">
          {Audios.map((audio) => (
            <SongCard hash={audio.hash} address={audio.author} description={audio.description} />
          ))}
        </Grid>
        <Flex dir="row" gap="8" alignItems="center"></Flex>
      </Box>
    </Box>
  );
};

export default Home;
