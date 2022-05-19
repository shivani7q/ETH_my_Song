declare let window: any;
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
  id,
}) => {
  const [value, setvalue] = useState<string>();
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
            <Flex justifyContent="center">
              <InputGroup>
                <InputLeftElement>
                  <Image src="/assests/polygon.svg" height="6" width="6" />
                </InputLeftElement>
                <Input
                  type="number"
                  w="64"
                  placeholder="amount of MATIC"
                  fontWeight="700"
                  textColor="gray.600"
                  focusBorderColor="purple.500"
                  fontFamily="sen"
                  value={value}
                  onChange={(e) => setvalue(e.target.value)}
                />
              </InputGroup>
            </Flex>
            <Button
              colorScheme="purple"
              fontFamily="sen"
              fontWeight="400"
              mb="4"
              _focus={{}}
              isLoading={loading}
              onClick={async () => {
                setLoading(true);
                let tipAmount = window.web3.utils.toWei(value!, "Ether");
                try {
                  await tipAudioOwner(id, tipAmount);
                  await updateAudios();
                  onClose()
                } catch (err) {
                  console.log(err);
                }
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
