import { BigNumberish } from "ethers"
import { ethers, getNamedAccounts } from "hardhat"
import { FundMe } from "../typechain-types"

const main = async () => {
    const { deployer } = await getNamedAccounts()
    const fundMe: FundMe = await ethers.getContract("FundMe", deployer)
    const sendValue: BigNumberish = ethers.utils.parseEther("0.01")

    console.log("Withdraw Contract...")

    const transactionResponse = await fundMe.withdraw()
    await transactionResponse.wait(1)
    console.log("Got it back!")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
