interface NetworkConfig {
    [networkId: number]: Network
}
interface Network {
    name: string
    ethUsdPriceAddress: string
    waitConfirmations: number
}

const networkConfig: NetworkConfig = {
    4: {
        name: "rinkeby",
        ethUsdPriceAddress: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
        waitConfirmations: 6,
    },
    137: {
        name: "polygon",
        ethUsdPriceAddress: "0xF9680D99D6C9589e2a93a78A04A279e509205945",
        waitConfirmations: 6,
    },
}

const developmentChains: string[] = ["hardhat", "localhost"]
const devWaitConfirmations = 1

const DECIMALS: number = 8
const INITIAL_ANSWER: number = 120000000000

export {
    developmentChains,
    networkConfig,
    DECIMALS,
    INITIAL_ANSWER,
    devWaitConfirmations,
}
