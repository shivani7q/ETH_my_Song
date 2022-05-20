import type { NextPage } from "next";
import { Header } from "../../components";
import { Box, Text } from "@chakra-ui/react";
import { useData } from "../../contexts/DataContext";

const AccountPage: NextPage = () => {
  const { account } = useData();
  return (
    <>
      <Box
        bgGradient="linear(to-r, #c6ffdd, #fbd786, #f7797d)"
        py="6"
        px="10"
        h="72"
        display="flex"
        flexDir="column"
      >
        <Header />
        <Box
          w="full"
          h="full"
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          textColor="white"
        >
          <Text fontFamily="redHat" fontSize="xl" fontWeight="500" textColor="gray.700">{account}</Text>
        </Box>
      </Box>
    </>
  );
};

export default AccountPage;
