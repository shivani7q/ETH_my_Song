import type { NextComponentType, NextPageContext } from "next";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

import type { Props } from "../../@types/TipArtist.props";

const TipArtist: NextComponentType<NextPageContext, {}, Props> = ({
  isOpen,
  onClose,
  onOpen,
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton _focus={{}} />
          <ModalBody>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
            commodi quas perferendis amet quidem, corporis quam, repellendus
            explicabo laudantium facilis, quisquam magni dolorem rem?
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose} mr={3} _focus={{}}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TipArtist;
