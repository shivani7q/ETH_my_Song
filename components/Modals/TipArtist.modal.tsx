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
  useToast,
} from "@chakra-ui/react";

import type { Props } from "../../@types/Modal.props";
import { useState } from "react";
import { useContract } from "@thirdweb-dev/react";
import { contractAddress } from "../../lib/constants";

const TipArtist: NextComponentType<NextPageContext, {}, Props> = ({
  isOpen,
  onClose,
  onOpen,
  id,
}) => {
  const [value, setvalue] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const toast = useToast();

  const { contract } = useContract(contractAddress);

  const handleTip = async () => {
      setLoading(true);
      const result = await contract?.call("tipAudioOwner", id);
      if (result) {
        toast({
          title: "Success",
          description: "Tip sent",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        onClose();
      } else {
        toast({
          title: "Error",
          description: "Tip failed",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
      setLoading(false);
  };

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
                  <Image
                    src="/assests/polygon.svg"
                    height="6"
                    width="6"
                    alt="polygon"
                  />
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
              onClick={handleTip}
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
