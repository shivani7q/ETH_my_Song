import type { NextComponentType, NextPageContext } from "next";

import { Props } from "../../@types/Modal.props";
import { useState } from "react";

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
  VisuallyHidden,
  Input,
  useToast,
} from "@chakra-ui/react";

const UploadAudioModal: NextComponentType<NextPageContext, {}, Props> = ({
  isOpen,
  onOpen,
  onClose,
}) => {
  const toast = useToast();
  const [file, setFile] = useState<File | null>(null);
  console.log(file);

  const upload = () => {};
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          display="flex"
          justifyContent="center"
          h="48"
          fontFamily="sen"
        >
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
            <Input
              type="file"
              accept="audio/*"
              border="none"
              _focus={{}}
              onChange={(e: any) => setFile(e.target.files[0])}
            />

            <Button colorScheme="purple" _focus={{}} onClick={upload}>
              upload
            </Button>
          </ModalBody>
          <ModalCloseButton _focus={{}} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default UploadAudioModal;
