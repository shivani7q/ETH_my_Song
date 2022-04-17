import type { NextComponentType, NextPageContext } from "next";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Image,
} from "@chakra-ui/react";

import type { Props } from "../../@types/Modal.props";
import { useState } from "react";

const TipArtist: NextComponentType<NextPageContext, {}, Props> = ({
  isOpen,
  onClose,
  onOpen,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setvalue] = useState<number>();

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
            <Image src="/assests/polygon.svg" height="35" width="35" />
            <Input
              type="number"
              w="64"
              placeholder="amount of MATIC"
              fontWeight="700"
              textColor="gray.700"
              fontFamily="sen"
              value={value}
              onChange={(e) => setvalue(e.target.valueAsNumber)}
            />

            <Button
              colorScheme="purple"
              fontFamily="redHat"
              fontWeight="500"
              mb="4"
              _focus={{}}
              isLoading={loading}
              onClick={() => setLoading(true)}
              isDisabled={!value && true}
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
