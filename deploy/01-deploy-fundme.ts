import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction, DeployResult } from "hardhat-deploy/types"
import {
    developmentChains,
    devWaitConfirmations,
    networkConfig,
} from "../helper-hardhat-config"
import { verify } from "../utils/verifyContract"

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { getNamedAccounts, deployments } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const networkName = hre.network.name
    const chainId = hre.network.config.chainId!

    let ethUsdPriceFeedAddress
    let waitConfirmations

    if (developmentChains.includes(networkName)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
        waitConfirmations = devWaitConfirmations
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceAddress"]
        waitConfirmations = networkConfig[chainId]["waitConfirmations"]
    }

    const args = [ethUsdPriceFeedAddress]
    const fundMe: DeployResult = await deploy("FundMe", {
        contract: "FundMe",
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: waitConfirmations,
    })

    if (!developmentChains.includes(networkName) && ETHERSCAN_API_KEY) {
        //verify
        await verify(fundMe.address, args)
    }

    log("-----------------------------------------------")
}

export default func
func.tags = ["all", "fundme"]
