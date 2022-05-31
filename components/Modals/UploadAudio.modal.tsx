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
import { useContract } from "@thirdweb-dev/react";

const UploadAudioModal: NextComponentType<NextPageContext, {}, Props> = ({
  isOpen,
  onOpen,
  onClose,
}) => {
  const toast = useToast();
  const [file, setFile] = useState<File | null>(null);

  const [account, setAccount] = useRecoilState(accountAtom);

  const [isLoading, setLoading] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");

  const [byteData, setByteData] = useRecoilState(byteDataAtom);

  const Web3Api = useMoralisWeb3Api();

  const { contract } = useContract(
    "0x88Cd28FeC5008D7384103E3f672E988E4744FE57"
  );

  const onUpload = async () => {
    console.log("uploaded")
    const res = await contract?.call("uploadAudio", "imgHash", "desc", "coverImage");
    console.log(res)
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
            <Input type="file" accept="audio/*" border="none" _focus={{}} />
            <ImageInput />
            <Input
              value={description}
              variant="filled"
              placeholder="enter a description"
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
