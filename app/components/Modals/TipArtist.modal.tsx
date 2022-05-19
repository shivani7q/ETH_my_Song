declare let window: any
import type { NextComponentType, NextPageContext } from "next";
import { useData } from "../../contexts/DataContext";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Image,
  InputGroup,
  InputLeftElement,
  Flex,
} from "@chakra-ui/react";

import type { Props } from "../../@types/Modal.props";
import { useState } from "react";

const TipArtist: NextComponentType<NextPageContext, {}, Props> = ({
  isOpen,
  onClose,
  onOpen,
  id
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { tipAudioOwner, updateAudios } = useData();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontFamily="sen" textAlign="center">
            Tip Artist
          </ModalHeader>
          <ModalCloseButton _focus={{}} />

          <ModalBody
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDir="column"
            gap="4"
          >
            <Button
              colorScheme="purple"
              fontFamily="sen"
              fontWeight="400"
              mb="4"
              _focus={{}}
              isLoading={loading}
              onClick={async () => {
                let tipAmount = window.web3.utils.toWei("0.1", "Ether");
                await tipAudioOwner(id, tipAmount);
                await updateAudios();
              }}
            >
              checkout
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TipArtist;
