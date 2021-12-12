const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();


module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: 5777 
    },
    matic: {
    provider: () =>
      new HDWalletProvider({
        mnemonic: {
          phrase: mnemonic,
        },
        providerOrUrl: `https://rpc-mumbai.maticvigil.com/v1/f7f8b00d0ae4a255a8de62af38b053ef125b6282`,
        chainId: 80001,
      }),
    network_id: 80001,
    confirmations: 2,
    timeoutBlocks: 200,
    skipDryRun: true,
    chainId: 80001,
  },
  },

  

  mocha: {
    // timeout: 100000
  },
  contracts_directory: "./contracts",
  contracts_build_directory: "./abis",
  compilers: {
    solc: {
      version: "^0.8.10",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

  db: {
    enabled: false,
  },
};