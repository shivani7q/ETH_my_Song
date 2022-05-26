import type { NextComponentType, NextPageContext } from "next";
import { useData } from "../../contexts/DataContext";
import { create } from "ipfs-http-client";

import { Props } from "../../@types/Modal.props";
import { useState, useCallback } from "react";
import { ImageInput } from ".."

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
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

  const [isLoading, setLoading] = useState<boolean>(false);
  const { contract, account, updateAudios } = useData();
  const client = create({ url: "https://ipfs.infura.io:5001/api/v0" });
  const [description, setDescription] = useState<string>("");

  const uploadAudio = async () => {
    setLoading(true);
    const added = await client.add(file as File);
    contract.methods
      .uploadAudio(added.path, description)
      .send({ from: account })
      .then(async () => {
        await updateAudios();
        setFile(null);
        setDescription("");

        onClose();
      })
      .catch(() => {
        toast({
          title: "Couldn't upload Audio",
          description: "Oops! Looks like we have an error here",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      });
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent display="flex" justifyContent="center" fontFamily="sen">
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
            <ImageInput />
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value as string)}
              variant="filled"
              placeholder="enter a description"
            />
            <Button
              colorScheme="purple"
              _focus={{}}
              onClick={uploadAudio}
              isLoading={isLoading}
            >
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
