import type { NextComponentType, NextPageContext } from "next";
import { useData } from "../../contexts/DataContext";
import { create } from "ipfs-http-client";

import { Props } from "../../@types/Modal.props";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

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
  Input,
  Text,
  useToast,
  Image,
} from "@chakra-ui/react";
import { getBase64 } from "../../utils/helpers/getBase64";

const UploadAudioModal: NextComponentType<NextPageContext, {}, Props> = ({
  isOpen,
  onOpen,
  onClose,
}) => {
  const toast = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [byteData, setByteData] = useState<any>();

  const [isLoading, setLoading] = useState<boolean>(false);
  const { contract, account, updateAudios } = useData();
  const client = create({ url: "https://ipfs.infura.io:5001/api/v0" });
  const [description, setDescription] = useState<string>("");

  const onDrop = useCallback((acceptedFiles: any) => {
    const imageData = acceptedFiles[0];

    getBase64(imageData).then((data) => {
      console.log(data);
      setByteData(data);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

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
            {byteData ? (
              <>
                <Box
                  h="32"
                  w="80%"
                  p="1"
                  rounded="lg"
                  cursor="pointer"
                  display="grid"
                  placeItems="center"
                  textAlign="center"
                >
                  <Image
                    src={byteData}
                    height="100%"
                    width="100%"
                    alt="cover"
                    rounded="lg"
                  />
                </Box>
              </>
            ) : (
              <Box
                h="32"
                w="80%"
                p="1"
                border="solid 2px"
                borderColor="gray.200"
                rounded="lg"
                cursor="pointer"
                display="grid"
                placeItems="center"
                textAlign="center"
              >
                <Text
                  fontWeight="medium"
                  textColor="gray.600"
                  fontFamily="redHat"
                >
                  no image chosen
                </Text>
              </Box>
            )}
            <Box
              h="32"
              w="80%"
              px="12"
              py="8"
              border="dashed 2px"
              borderColor="gray.200"
              rounded="lg"
              _hover={{ bgColor: "gray.50" }}
              transition="all"
              transitionDuration="100ms"
              cursor="pointer"
              display="grid"
              placeItems="center"
              textAlign="center"
              {...getRootProps()}
            >
              <input {...getInputProps()} type="file" accept="image/*" />
              <Text
                fontWeight="medium"
                textColor="gray.600"
                fontFamily="redHat"
              >
                drag n drop song cover here <br />
                or click to choose <br />
                (optional) (ratio: 2.5:1)
              </Text>
            </Box>
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
