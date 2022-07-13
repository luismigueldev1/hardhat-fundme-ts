import { BigNumberish } from "ethers"
import { ethers, getNamedAccounts, network } from "hardhat"
import { assert } from "chai"
import { FundMe } from "../../typechain-types"
import { developmentChains } from "../../helper-hardhat-config"

developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe Staging", async () => {
          let fundMe: FundMe
          let deployer: string
          let sendValue: BigNumberish = ethers.utils.parseEther("0.2")

          beforeEach(async () => {
              deployer = (await getNamedAccounts()).deployer
              fundMe = await ethers.getContract("FundMe", deployer)
          })

          it("allows people to fund and withdraw", async () => {
              console.log(`Fund the contract with ${sendValue} wei`)
              await fundMe.fund({ value: sendValue })
              console.log("Withdrawing the funds")
              await fundMe.withdraw()
              const endingBalance = await fundMe.provider.getBalance(
                  fundMe.address
              )
              assert.equal(endingBalance.toString(), "0")
          })
      })
