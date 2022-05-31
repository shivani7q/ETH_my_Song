import type { NextPage } from "next";
import { useAddress, useMetamask, useContract } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";

const Home: NextPage = () => {
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const { contract } = useContract(
    "0x88Cd28FeC5008D7384103E3f672E988E4744FE57"
  );
  const [audios, setAudios] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const audioCount = await contract?.call("AudioCount");

      for (let i = 0; i <= audioCount; i++) {
        const audios = await contract?.call("Audios", i);
        console.log(audios);
      }
    };

    fetchData();
  }, [contract]);

  console.log(contract);

  const onUpload = async () => {
    const res = await contract?.call("uploadAudio", "uwu", "nouwu", "smth");
    console.log(res)
  };

  return (
    <div>
      {address ? (
        <>
          {address}

          <button onClick={onUpload}>upload audio</button>
        </>
      ) : (
        <button onClick={connectWithMetamask}>Connect with Metamask</button>
      )}
    </div>
  );
};

export default Home;
