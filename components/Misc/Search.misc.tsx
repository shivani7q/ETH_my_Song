import type { NextComponentType } from "next";

import { Input, Box, Button } from "@chakra-ui/react";

const Search: NextComponentType = () => {
  return (
    <>
      <Box w="full" display="flex" justifyContent="center">
        <Box
          bgColor="white"
          h="12"
          rounded="full"
          w="xl"
          display="flex"
          flexDir="row"
          alignItems="center"
          justifyContent="space-between"
          my="-6"
          shadow="xl"
          fontFamily="sen"
        >
          <Input
            placeholder="Search songs, artists n albums"
            fontSize="lg"
            w="full"
            h="full"
            textColor="gray.600"
            rounded="full"
            px="8"
            fontWeight="700"
            bgColor="white"
            border={{}}
            _focus={{}}
            _hover={{}}
          />

          <Button
            bgGradient="linear(to-r, #FBED96 0%, #ABECD6 100%)"
            textColor="gray.600"
            rounded="full"
            h="full"
            fontSize="lg"
            px="8"
            borderTopLeftRadius="full"
            borderBottomLeftRadius="0"
            _focus={{}}
            _hover={{}}
            _active={{}}
          >
            Search
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Search;
