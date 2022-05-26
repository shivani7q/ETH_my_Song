// @ts-nocheck

declare let window: any;
import { FC, createContext, useContext, useEffect, useState } from "react";
import Web3 from "web3";
import ETH_my_Song from "../abis/ETH_my_Song.json";

import { accountAtom } from "../utils/helpers/atoms"
import { useRecoilState } from "recoil"

interface DataContextProps {
  account: string;
  contract: any;
  loading: boolean;
  Audios: any[];
  AudioCount: number;
  updateAudios: () => Promise<void>;
  tipAudioOwner: (id: string, tipAmout: any) => Promise<void>;
}

const DataContext = createContext<DataContextProps | null>(null);

export const DataProvider = ({ children }: any) => {
  const data = useProviderData();

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export const useData = () => useContext<DataContextProps>(DataContext);

export const useProviderData = () => {
  const [loading, setLoading] = useState(true);
  const [Audios, setAudios] = useState<any[]>([]);
  const [AudioCount, setAudioCount] = useState(0);
  const [account, setAccount] = useRecoilState(accountAtom);

  const [contract, setContract] = useState<any>();

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  const loadWeb3 = async () => {
    if (typeof window !== undefined) {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      } else if (window.web3) {
        window.web3 = new Web3(window?.web3?.currentProvider);
      } else {
        window.alert(
          "Non-Eth browser detected. Please consider using MetaMask."
        );
      }
    }
  };

  const loadBlockchainData = async () => {
    if (typeof window !== undefined) {
      const web3 = window?.web3;
      var allAccounts = await web3?.eth.getAccounts();
      setAccount(allAccounts[0]);

      const networkId = await web3?.eth.net.getId();
      const networkData = ETH_my_Song.networks[networkId];

      if (networkData) {
        var tempContract = new web3?.eth.Contract(
          ETH_my_Song.abi,
          networkData.address
        );
        setContract(tempContract);
        var count = await tempContract.methods.AudioCount().call();
        setAudioCount(count);
        var tempAudioList = [];
        for (var i = 1; i <= count; i++) {
          const Audio = await tempContract.methods.Audios(i).call();
          tempAudioList.push(Audio);
        }
        tempAudioList.reverse();
        setAudios(tempAudioList);
      } else {
        window.alert("TestNet not found");
      }
      setLoading(false);
    }

  };

  const updateAudios = async () => {
    setLoading(true);
    if (contract !== undefined) {
      var count = await contract.methods.AudioCount().call();
      setAudioCount(count);
      var tempAudioList = [];
      for (var i = 1; i <= count; i++) {
        const Audio = await contract.methods.Audios(i).call();
        tempAudioList.push(Audio);
      }
      tempAudioList.reverse();
      setAudios(tempAudioList);
      setLoading(false);
    }
  };

  const tipAudioOwner = async (id: string, tipAmout: any) => {
    var res = await contract.methods
      .tipAudioOwner(id)
      .send({ from: account, value: tipAmout });
  };

  return {
    contract,
    loading,
    Audios,
    AudioCount,
    updateAudios,
    tipAudioOwner,
  };
};
