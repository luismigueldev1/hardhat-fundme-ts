import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import "@nomiclabs/hardhat-etherscan"
import "hardhat-gas-reporter"
import "@typechain/hardhat"
import "solidity-coverage"
import "hardhat-deploy"
import "@nomiclabs/hardhat-ethers"
import "dotenv/config"

//import "@nomiclabs/hardhat-solhint"

/* Constants */
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || "https//eth-rinkeby.com/"
const RYNKEBY_PRIVATE_KEY = process.env.RINKEBY_PRIVATE_KEY || "0xkey"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key"
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key"
const POLYGON_RPC_URL = process.env.POLYGON_RPC_URL

const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    networks: {
        localhost: {
            url: "http://127.0.0.1:8545/",
            //accounts: Thanks hardhat
            chainId: 31337,
        },
        rinkeby: {
            url: RINKEBY_RPC_URL,
            accounts: [RYNKEBY_PRIVATE_KEY],
            chainId: 4,
            gas: 6000000,
        },
        polygon: {
            url: POLYGON_RPC_URL,
            accounts: [RYNKEBY_PRIVATE_KEY],
            chainId: 137,
        },
    },
    solidity: {
        compilers: [{ version: "0.8.8" }, { version: "0.6.6" }],
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: false,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        //coinmarketcap: COINMARKETCAP_API_KEY,
        token: "ETH",
    },
    namedAccounts: {
        deployer: { default: 0 },
    },
    mocha: {
        timeout: 100000000,
    },
}

export default config
