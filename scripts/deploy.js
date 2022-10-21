const { ethers, getNamedAccounts, network } = require("hardhat")
const { getWeth, AMOUNT } = require("../scripts/getWeth.js")
const { moveBlocks } = require("../utils/move-blocks")

const morpho = "0x8888882f8f843896699869179fB6E4f7e3B58888"
const weth = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
const cEth = "0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5"
const dai = "0x6B175474E89094C44Da98b954EedeAC495271d0F"
const cDai = "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643"

async function main() {
    await getWeth()
    const { deployer } = await getNamedAccounts()
    const Vault = await ethers.getContractFactory("StoaMorphoCompound")
    const vault = await Vault.deploy(morpho, weth, cEth,dai, cDai)
    await vault.deployed()
    console.log(vault.address)
    await approveErc20(weth, vault.address, AMOUNT, deployer)
    console.log("Depositing WETH...")
    console.log("Desposited!")

    if (network.config.chainId == 31337) {
  
    await moveBlocks(1, (sleepAmount = 1000))
    }
    const tx = await vault.supplyETH({value: ethers.utils.parseEther("1"),})
    tx.wait(1)
    console.log("Supplied!")
    if (network.config.chainId == 31337) {
    
      await moveBlocks(1, (sleepAmount = 1000))
    }
  
    await vault.withdrawETH(AMOUNT)
    console.log("Withdraw Success!")

   
}

async function approveErc20(erc20Address, spenderAddress, amount, signer) {
    const erc20Token = await ethers.getContractAt("IERC20", erc20Address, signer)
    txResponse = await erc20Token.approve(spenderAddress, amount)
    await txResponse.wait(1)
    console.log("Approved!")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
