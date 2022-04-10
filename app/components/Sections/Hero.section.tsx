import type { NextComponentType } from "next";

import Header from "../Nav/Header.nav";

import { Box, Text } from "@chakra-ui/react";

const Hero: NextComponentType = () => {
  return (
    <>
      <Box
        bgGradient="linear(to-r, #EF32D9 0%, #89FFFD 100%)"
        px="10"
        h="64"
        w="full"
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        textColor="white"
      >
        <Text fontFamily="syncopate" fontSize="5xl" fontWeight="700">
          ETH MY SONG
        </Text>

        <Text fontFamily="sen" fontSize="xl" fontWeight="700">
          Upload songs, support your fav artists
        </Text>
      </Box>
    </>
  );
};

export default Hero;
