import type { NextComponentType } from "next";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/router";

import { web3Modal } from "../../utils/providers/web3Modal";
import { providers } from "ethers";

import { accountAtom } from "../../utils/helpers/atoms";
import { useRecoilState } from "recoil";

import {
  Box,
  Button,
  Image,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";

import { UploadAudioModal } from "..";

const Header: NextComponentType = () => {
  const [account, setAccount] = useRecoilState(accountAtom)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const [connected, setConnected] = useState<boolean>(false)

  const onConnect = async () => {
    try {
      const provider = await web3Modal.connect();
      const web3Provider = new providers.Web3Provider(provider);

      const signer = web3Provider.getSigner();
      const address = await signer.getAddress();

      let chainID = await signer.getChainId();

      if (chainID != 80001) {
        alert("Please switch to matic testnet");
      } else {
        setAccount(address);
        setConnected(true)
      }
    } catch (e) {
      console.log(e);
    }
  };

  let web3: any;

  return (
    <>
      <UploadAudioModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Box
        display="flex"
        flexDir="row"
        fontFamily="redHat"
        alignItems="center"
        marginLeft="auto"
        gap="4"
        position="fixed"
        top="0"
        right="0"
        mt="6"
        mr="4"
      >
        <Button
          h="9"
          colorScheme="cyan"
          px="6"
          py="2"
          rounded="full"
          fontWeight="bold"
          textColor="white"
          _focus={{}}
          onClick={onOpen}
        >
          upload song
        </Button>

        {account ? (
          <>
            <Menu>
              <MenuButton>
                <Button
                  bgColor="green.50"
                  rounded="full"
                  h="8"
                  px="4"
                  _hover={{ bgColor: "green.100" }}
                  fontWeight="700"
                  fontSize="sm"
                  gap="1"
                  _active={{}}
                  _focus={{}}
                >
                  <Image
                    src="/assests/polygon-icon.svg"
                    height="6"
                    width="6"
                    alt="polygon icon"
                  />
                  {account.slice(0, 4) + "...." + account.slice(-4)}
                </Button>
              </MenuButton>

              <MenuList fontFamily="redHat" fontWeight="500">
                <MenuItem
                  display="flex"
                  gap="2"
                  alignItems="center"
                  onClick={() => router.push(`/account/${account}`)}
                >
                  <CgProfile size={22} />
                  Account
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  display="flex"
                  gap="2"
                  alignItems="center"
                  textColor="red.500"
                >
                  <FiLogOut size={22} />
                  Disconnect Wallet
                </MenuItem>
              </MenuList>
            </Menu>
          </>
        ) : (
          <Button
            h="9"
            colorScheme="cyan"
            px="6"
            py="2"
            rounded="full"
            fontWeight="bold"
            textColor="white"
            _focus={{}}
            onClick={onConnect}
          >
            connect wallet
          </Button>
        )}
      </Box>
    </>
  );
};

export default Header;
