const { getNamedAccounts, ethers } = require("hardhat")

const AMOUNT = ethers.utils.parseEther("1")

async function getWeth() {
    const { deployer } = await getNamedAccounts()
    const iWeth = await ethers.getContractAt(
        "IWETH9",
        "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        deployer
    )
    const tx = await iWeth.deposit({ value: AMOUNT })
    await tx.wait(1)

}

module.exports = { getWeth, AMOUNT}
