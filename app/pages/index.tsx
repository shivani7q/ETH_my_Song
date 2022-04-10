import type { NextPage } from "next";

import { Hero, Search } from "../components";
import { Box, Text } from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <>
      <Hero />
      <Search />
      <Box my="24" mx="20">
        <Text fontFamily="syncopate"></Text>
      </Box>
    </>
  );
};

export default Home;
