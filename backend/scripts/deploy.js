// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { json } = require("hardhat/internal/core/params/argumentTypes");

// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.
async function main() {
  // This is just a convenience check
  // if (network.name === "hardhat") {
  //   console.warn(
  //     "You are trying to deploy a contract to the Hardhat Network, which" +
  //       "gets automatically created and destroyed every time. Use the Hardhat" +
  //       " option '--network localhost'"
  //   );
  // }

  // ethers is avaialble in the global scope
  const [deployer,per1,per2] = await ethers.getSigners();
  const [acc1,acc2,acc3] = ["0x3B2FA3fB4c7eD3bC495F276DC60782b635bB04d9","0x57a6F97E2020a77ee47582b2fDFDa122dF6F8Eef","0x76aB059eb0D26AE8521042becb44FD89ecA8B78E"];
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());



  NFTpaymentSplitter = await ethers.getContractFactory("NFTpaymentSplitter");
  nFTpaymentSplitter = await NFTpaymentSplitter.deploy();
  await nFTpaymentSplitter.deployed();

  NFTCrowdsale = await ethers.getContractFactory("NFTCrowdsale");
  nftPreSale = await NFTCrowdsale.deploy(nFTpaymentSplitter.address);
  await nftPreSale.deployed();

  NFT = await ethers.getContractFactory("NFT");
  nft = await NFT.deploy(nftPreSale.address);
  await nft.deployed();

  // let tx = await nftPreSale.startSale([acc1,acc2,acc3],nft.address,20)
  // await tx.wait()

  // let tx = await nftPreSale.startSale([per1.address,per2.address],nft.address,60)
  // await tx.wait()


  // Manager = await ethers.getContractFactory("Manager");
  // manager = await Manager.attach(manager_addr)
  //console.log("address : ", per1.address)
  console.log("paymentSplitter deployed to:", nFTpaymentSplitter.address);
  console.log("nftPreSale deployed to:", nftPreSale.address);
  console.log("nft deployed to:", nft.address);

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(nFTpaymentSplitter, nftPreSale, nft);
}
//,nftPreSale,nftPubSale,nft

function saveFrontendFiles(nFTpaymentSplitter, nftPreSale, nft) {
  const fs = require("fs");
  const contractsDir = "../frontend/src/contract";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }
  let config = `
 export const nft_addr = "${nft.address}"
 export const nftPreSale_addr = "${nftPreSale.address}"
 export const nFTpaymentSplitter_addr = "${nFTpaymentSplitter.address}"
 export const BUSD_addr = "0xca9Eb9DDC1B511d5B67d833D1d36Ee85503DA93E"
`
//change BUSD address "0xA41e502175D8086225B83b77883986C0dA0B04C7" -rinkeby
//change BUSD address "0x17331B1B090cfA4E8754Bb0637206C1186926C4D" -BSC testnet
//pegged BUSD test = 0xca9Eb9DDC1B511d5B67d833D1d36Ee85503DA93E -BSC testnet 

  let data = JSON.stringify(config)
  fs.writeFileSync(
    contractsDir + '/addresses.js', JSON.parse(data)

  );
    config =`[
      "constructor()",
      "event Approval(address indexed,address indexed,uint256)",
      "event Transfer(address indexed,address indexed,uint256)",
      "function allowance(address,address) view returns (uint256)",
      "function approve(address,uint256) returns (bool)",
      "function balanceOf(address) view returns (uint256)",
      "function decimals() view returns (uint8)",
      "function decreaseAllowance(address,uint256) returns (bool)",
      "function increaseAllowance(address,uint256) returns (bool)",
      "function name() view returns (string)",
      "function symbol() view returns (string)",
      "function totalSupply() view returns (uint256)",
      "function transfer(address,uint256) returns (bool)",
      "function transferFrom(address,address,uint256) returns (bool)"
    ]`
   data = JSON.stringify(config)
  fs.writeFileSync(
    contractsDir + '/BUSD.json', JSON.parse(data)

  );

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


// npx hardhat run scripts\deploy.js --network rinkeby