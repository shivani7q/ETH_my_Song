import type { NextComponentType } from "next";

import { Box, Text, Button, Tooltip } from "@chakra-ui/react";

const SongCard: NextComponentType = () => {
  return (
    <>
      <Box w="72" h="80" rounded="lg" bgColor="white" shadow="xl">
        <Box
          w="full"
          h="48"
          bgColor="#04070C"
          rounded="lg"
          borderBottomRadius="0"
        ></Box>

        <Box
          px="4"
          py="3"
          fontFamily="sen"
          fontWeight="700"
          fontSize="xl"
          display="flex"
          flexDir="column"
        >
          <Text textColor="gray.600">enchanted</Text>
          <Text fontWeight="600" fontSize="md" textColor="gray.500" my="-1">
            taylor swift
          </Text>

          <Tooltip label="Total Tips" placement="top">
            <Button
              py="1"
              px="6"
              fontSize="sm"
              rounded="full"
              variant="outline"
              alignSelf="bottom"
              marginLeft="auto"
              _focus={{}}
              _active={{}}
            >
              5 MATIC
            </Button>
          </Tooltip>
        </Box>
      </Box>
    </>
  );
};

export default SongCard;
