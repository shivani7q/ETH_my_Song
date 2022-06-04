import type { NextPage } from "next";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";

import { Header, SongCard } from "../../components";
import { Box, Text, Grid, Button, Spinner } from "@chakra-ui/react";

import { default as BoringAvatar } from "boring-avatars";

const AccountPage: NextPage = () => {
  // const router = useRouter();
  // const [audios, setAudios] = useState<any>([]);

  // const { id } = router.query;

  // const { Audios, loading } = useData();

  // useEffect(() => {
  //   let tempArray: any = [];

  //   Audios.map((audio) => {
  //     if (audio.author === (id as string)) {
  //       tempArray.push(audio);
  //       setAudios(tempArray)
  //     }
  //   });
  // }, [id, Audios]);

  return (
    <Box minW="full" minH="screen" overflowX="hidden">
      {/* <Box
        h="64"
        minW="full"
        px="8"
        py="6"
        display="flex"
        flexDir="column"
        gap="4"
        justifyContent="center"
        alignItems="center"
        bgGradient="linear(to-r, #EF32D9 0%, #89FFFD 100%)"
      >
        <Header />

        <Box rounded="full" overflow="hidden" w="fit-content">
          <BoringAvatar
            size="6rem"
            name={(id as string) || "address"}
            variant="beam"
            colors={["#FCD8AF", "#FEC49B", "#FE9B91", "#FD6084", "#045071"]}
          />
        </Box>

        <Text
          textAlign="center"
          fontSize="xl"
          textColor="gray.100"
          fontFamily="redHat"
          fontWeight="medium"
        >
          {id as string}
        </Text>
      </Box>

      <Box
        my="24"
        mx="20"
        display="flex"
        flexDir="column"
        justifyContent={loading ? "center" : ""}
        alignItems={loading ? "center" : ""}
        gap="8"
      >
        {loading && <Spinner size="xl" color="purple.700" thickness="4px" />}

        {audios && (
          <>
            <Text
              fontFamily="syncopate"
              fontSize="3xl"
              fontWeight="700"
              textColor="#4B5563"
            >
              ARTIST SONGS
            </Text>
            <Grid
              gap="8"
              templateColumns="repeat(3, 1fr)"
              justifyContent="center"
            >
              {audios?.map((audio: any) => (
                <SongCard
                  key={audio.index}
                  hash={audio.hash}
                  address={audio.author}
                  description={audio.description}
                  totalTips={audio.tipAmount}
                  id={audio.id}
                  owner={audio.author}
                />
              ))}
            </Grid>
          </>
        )}
      </Box> */}
    </Box>
  );
};

export default AccountPage;
