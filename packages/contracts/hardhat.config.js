require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config()

const PRIVATE_KEY = process.env.PRIVATE_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  mocha: {
    timeout: 1200000,
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    },
  },
  networks: {
    zkatana: {
      chainId: 1261120,
      url: "https://rpc.zkatana.gelato.digital",
      accounts: [PRIVATE_KEY],
    },
    shibuya: {
      chainId: 81,
      url: "https://evm.shibuya.astar.network",
      accounts: [PRIVATE_KEY],
    }
  }
};
