import type { NextPage } from "next";

import { Hero, Search, SongCard } from "../components";
import { Box, Text, Flex } from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <>
      <Hero />
      <Search />
      <Box my="24" mx="20" display="flex" flexDir="column" gap="8">
        <Text
          fontFamily="syncopate"
          fontSize="3xl"
          fontWeight="700"
          textColor="#4B5563"
        >
          FEATURED SONGS
        </Text>

        <Flex dir="row" gap="8" alignItems="center">
          <SongCard />
        </Flex>
      </Box>
    </>
  );
};

export default Home;
