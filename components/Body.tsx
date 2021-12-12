declare let window: any;
import Identicon from "identicon.js";
import React from "react";
import { useData } from "..//contexts/DataContext";
import ReactAudioPlayer from "react-audio-player";

const Body = () => {
  const { Audios } = useData();
  return (
    
    <>
      {Audios.length > 0 &&
        Audios.map((Audio, index) => (
          <BodyItem
            key={index}
            totalTips={Audio.tipAmount}
            address={Audio.author}
            description={Audio.description}
            hash={Audio.hash}
            id={Audio.id}
          />
        ))}
    </>
  );
};



export default Body;
const BodyItem = ({ address, description, totalTips, hash, id }) => {
  const { tipAudioOwner, updateAudios } = useData();
  var data = new Identicon(address, 200).toString();
  return (
    
    <div className="w-full md:mx-0 md:max-w-2xl mt-5 p-3 border rounded-xl flex flex-col">
      <div className="flex flex-row space-x-5 bg-gray-100 rounded-t-xl py-3 px-4 border-t border-l border-r font-mono items-center">
        <img width={35} height={35} src={`data:Audio/ogg;base64, ${data}`} />
        <div className="overflow-ellipsis w-52 overflow-hidden">{address}</div>
      </div>
      <div className="bg-gray-100 rounded-b-xl py-3 px-4 border-b border-l border-r font-mono flex flex-row justify-between">
      <ReactAudioPlayer src={`https://ipfs.infura.io/ipfs/${hash}`}  controls  /></div>
      <div className="py-3 px-4 flex flex-col border-l border-r">
        <span className="font-sans font-bold">Description</span>
        <span className="font-sans pt-2">{description}</span>
      </div>
      <div className="bg-gray-100 rounded-b-xl py-3 px-4 border-b border-l border-r font-mono flex flex-row justify-between">
        <span>
          Total TIPS: {window.web3.utils.fromWei(totalTips, "Ether")} MATIC
        </span>
        <div
          onClick={async () => {
            let tipAmount = window.web3.utils.toWei("0.1", "Ether");
            await tipAudioOwner(id, tipAmount);
            await updateAudios();
          }}
        >
          <span className="cursor-pointer font-bold text-blue-400">
            TIPS: 0.1 MATIC
          </span>
        </div>
      </div>
    </div>
  );
};
