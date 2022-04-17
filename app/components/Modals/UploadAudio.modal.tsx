import type { NextComponentType, NextPageContext } from "next";

import { Props } from "../../@types/Modal.props";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";

const UploadAudioModal: NextComponentType<NextPageContext, {}, Props> = ({
  isOpen,
  onOpen,
  onClose,
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent display="flex" justifyContent="center" h="96" fontFamily="sen">
          <ModalHeader fontFamily="sen" textAlign="center">
            Upload Audio to IPFS
          </ModalHeader>
          <ModalBody
            display="flex"
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            gap="3"
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              px="8"
              py="16"
              m="4"
              w="full"
              rounded="lg"
              border="dashed 2px"
              bgColor="gray.100"
              borderColor="gray.400"
            >
              <Text
                fontSize="xl"
                textColor="gray.600"
                fontWeight="500"
                textAlign="center"
              >
                Drag n Drop Audio File here <br />
                or click to upload
              </Text>
            </Box>
            <Button colorScheme="purple">
              Upload
            </Button>
          </ModalBody>
          <ModalCloseButton _focus={{}} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default UploadAudioModal;
