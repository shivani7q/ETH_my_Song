import type { NextComponentType, NextPageContext } from "next";

import TipArtist from "../Modals/TipArtist.modal";
import {
  Box,
  Text,
  Button,
  Tooltip,
  useDisclosure,
  Image,
  Center,
} from "@chakra-ui/react";

import ReactAudioPlayer from "react-audio-player";

interface Props {
  address: string;
  hash?: string;
  owner?: string;
  id?: string;
  description: string;
}

const SongCard: NextComponentType<NextPageContext, {}, Props> = ({
  hash,
  owner,
  address,
  description,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <TipArtist isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Box w="sm" h="72" rounded="lg" bgColor="white" shadow="xl">
        <Box
          w="full"
          h="28"
          bgColor="#04070C"
          rounded="lg"
          borderBottomRadius="0"
        ></Box>

        <Box
          px="4"
          py="1"
          fontFamily="redHat"
          fontWeight="700"
          fontSize="xl"
          display="flex"
          flexDir="column"
          gap="3"
        >
          <Text textColor="gray.600" fontWeight="500" fontSize="md">
            {address.slice(0, 4) + "..." + address.slice(-4)}
          </Text>
          <Text textColor="gray.700" fontWeight="600" fontSize="md" >
            {description}
          </Text>
          <Center>
            <ReactAudioPlayer
              controls
              src={`https://ipfs.infura.io/ipfs/${hash}`}
            />
          </Center>
          <Tooltip label="Total Tips" placement="top">
            <Button
              h="8"
              bottom="0"
              display="flex"
              flexDir="row"
              alignItems="center"
              gap="1"
              fontSize="sm"
              rounded="full"
              variant="outline"
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
