import type { NextPage } from "next";

import { Hero, Search, SongCard } from "../components";
import { Box, Text, Spinner, Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useContract } from "@thirdweb-dev/react";
import { contractAddress } from "../lib/constants";

const Home: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [Audios, setAudios] = useState<any[]>([]);
  console.log(Audios);

  const { contract } = useContract(contractAddress);

  useEffect(() => {
    const fetchData = async () => {
      const count = await contract?.call("AudioCount");
      let tempArray = [];

      for (let i = 0; i <= count; i++) {
        const audio = await contract?.call("Audios", i);
        tempArray.push(audio);
        setLoading(false);
      }
      setAudios(tempArray);
    };
    fetchData();
  }, [contract]);

  return (
    <Box
      minH="100vh"
      minW="full"
      overflowX="hidden"
      display="flex"
      flexDir="column"
    >
      <Box>
        <Hero />
        <Search />
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
        {loading && <Spinner size="xl" color="blue.500" thickness="3px" />}

        {Audios && (
          <>
            <Text
              fontFamily="syncopate"
              fontSize="3xl"
              fontWeight="700"
              textColor="#4B5563"
            >
              FEATURED SONGS
            </Text>
            <Grid
              gap="8"
              templateColumns="repeat(3, 1fr)"
              justifyContent="center"
            >
              {Audios.map((audio) => (
                <SongCard
                  key={audio.index}
                  hash={audio.hash}
                  address={audio.author}
                  description={audio.description}
                  totalTips={audio.tipAmount}
                  id={audio.id}
                  owner={audio.author}
                  cover_image={audio.cover_image}
                />
              ))}
            </Grid>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Home;
