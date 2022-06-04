// @ts-nocheck

import type { NextComponentType, NextPageContext } from "next";

import { Props } from "../../@types/Modal.props";
import React, { useState, useCallback } from "react";
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
import { useRecoilValue } from "recoil";
import { byteDataAtom } from "../../utils/helpers/atoms";
import { getBase64 } from "../../utils/helpers/getBase64";
import { useContract } from "@thirdweb-dev/react";
import { contractAddress } from "../../lib/constants";

const UploadAudioModal: NextComponentType<NextPageContext, {}, Props> = ({
  isOpen,
  onOpen,
  onClose,
}) => {
  const toast = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");

  console.log(file);

  const byteData = useRecoilValue(byteDataAtom);

  const Web3Api = useMoralisWeb3Api();

  const { contract } = useContract(contractAddress);


  const onUpload = async () => {
    if (file !== null) {
      const base64 = await getBase64(file as File);

      const options = {
        abi: [
          {
            path: file?.name as string,
            content: await base64,
          },
          {
            path: "image.png",
            content: byteData,
          },
        ],
      };
      const data = await Web3Api.storage.uploadFolder(options);

      console.log(data);

      const res = await contract?.call(
        "uploadAudio",
        data[0].path,
        "uwu",
        data[1].path
      );
      console.log(res);
    }
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
              variant="filled"
              placeholder="enter a description"
              onChange={(e) => setDescription(e.target.value as string)}
            />
            <Button colorScheme="purple" _focus={{}} onClick={onUpload}>
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
