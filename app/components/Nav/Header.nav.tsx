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
          bgColor="#D3F7FC"
          px="6"
          py="2"
          rounded="full"
          fontWeight="bold"
          textColor="#374151"
          _focus={{}}
          _hover={{}}
          _active={{}}
        >
          Upload Song
        </Button>

        <Button
          bgColor="#D3F7FC"
          px="6"
          py="2"
          rounded="full"
          fontWeight="bold"
          textColor="#374151"
          _focus={{}}
          _hover={{}}
          _active={{}}
        >
          Connect Wallet
        </Button>
      </Box>
    </>
  );
};

export default Header;
