import type { NextComponentType } from "next";

import { Box, Button } from "@chakra-ui/react";

const Header: NextComponentType = () => {
  return (
    <>
      <Box
        display="flex"
        flexDir="row"
        fontFamily="redHat"
        marginLeft="auto"
        gap="4"
      >
        <Button
          h="9"
          colorScheme="cyan"
          px="6"
          py="2"
          rounded="full"
          fontWeight="bold"
          textColor="white"
          _active={{}}
        >
          upload song
        </Button>

        <Button
          h="9"
          colorScheme="cyan"
          px="6"
          py="2"
          rounded="full"
          fontWeight="bold"
          textColor="white"
          _active={{}}
        >
          connect wallet
        </Button>
      </Box>
    </>
  );
};

export default Header;
