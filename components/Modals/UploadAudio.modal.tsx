import type { NextComponentType, NextPageContext } from "next";
import { useData } from "../../contexts/DataContext";

import { Props } from "../../@types/Modal.props";
import { useState, useCallback } from "react";
import { ImageInput } from "..";

import { useMoralisWeb3Api } from "react-moralis";

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
import { useRecoilState } from "recoil";
import { accountAtom, byteDataAtom } from "../../utils/helpers/atoms";
import { getBase64 } from "../../utils/helpers/getBase64";

const UploadAudioModal: NextComponentType<NextPageContext, {}, Props> = ({
  isOpen,
  onOpen,
  onClose,
}) => {
  const toast = useToast();
  const [file, setFile] = useState<File | null>(null);

  const [account, setAccount] = useRecoilState(accountAtom);

  const [isLoading, setLoading] = useState<boolean>(false);
  const { contract, updateAudios } = useData();
  const [description, setDescription] = useState<string>("");

  const [byteData, setByteData] = useRecoilState(byteDataAtom);

  const Web3Api = useMoralisWeb3Api();

  const uploadAudio = async () => {
    const base64 = await getBase64(file as File);

    const options = {
      abi: [
        {
          path: file?.name as string,
          content: base64,
        },
      ],
    };

    const path = await Web3Api.storage.uploadFolder(options);
    console.log(path);

    await contract.methods
      .uploadAudio(path[0].path!, description)
      .send({ from: account })
      .then(async () => {
        await updateAudios();
        setFile(null);
        setDescription("");

        onClose();
      })
      .catch((error: any) => {
        console.log(error);
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
      {/* <Modal isOpen={isOpen} onClose={onClose} isCentered>
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
            <Button colorScheme="purple" _focus={{}} onClick={uploadAudio}>
              upload
            </Button>
          </ModalBody>
          <ModalCloseButton _focus={{}} />
        </ModalContent>
      </Modal> */}
    </>
  );
};

export default UploadAudioModal;
