import { ethers } from "hardhat";

const main = async () => {
  const tokenCreation = await ethers.getContractFactory("ERC20Token");
  const creation = await tokenCreation.deploy();

  await creation.deployed();

  console.log("Contract deployed to:", creation.address);
  // deployed to 0xCeffEeCF546791448e9a7b0d1BDA19eDd29658B0
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
