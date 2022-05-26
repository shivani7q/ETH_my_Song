import Web3Modal from "web3modal";

let web3Modal: any;

if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    network: "testnet",
    cacheProvider: true,
  });
}

export { web3Modal };
