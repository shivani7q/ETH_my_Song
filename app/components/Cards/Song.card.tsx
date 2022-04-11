import type { NextComponentType } from "next";

import TipArtist from "../Modals/TipArtist.modal";
import {
  Box,
  Text,
  Button,
  Tooltip,
  useDisclosure,
  Image,
} from "@chakra-ui/react";

const SongCard: NextComponentType = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <TipArtist isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
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
              h="8"
              py="1"
              px="4"
              display="flex"
              flexDir="row"
              alignItems="center"
              gap="1"
              fontSize="sm"
              rounded="full"
              variant="outline"
              alignSelf="bottom"
              marginLeft="auto"
              _focus={{}}
              _active={{}}
              onClick={onOpen}
            >
              <Image
                src="/assests/polygon-icon.svg"
                height="6"
                width="6"
                alt="polygon icon"
              />
              5 MATIC
            </Button>
          </Tooltip>
        </Box>
      </Box>
    </>
  );
};

export default SongCard;
