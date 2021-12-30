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
  const [deployer] = await ethers.getSigners();
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

  // Manager = await ethers.getContractFactory("Manager");
  // manager = await Manager.attach(manager_addr)

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
`
  let data = JSON.stringify(config)
  fs.writeFileSync(
    contractsDir + '/addresses.js', JSON.parse(data)

  );
  // fs.writeFileSync(
  //   contractsDir + "/contract-address.json",
  //   JSON.stringify({ LASM: lasm.address ,  nftPreSale: nftPreSale.address ,nftPubSale: nftPubSale.address ,nft: nft.address }
  //     , undefined, 2)

  // );
  // fs.writeFileSync(
  //   contractsDir + "/contract-address.json",
  //    JSON.stringify({ nftPreSale: nftPreSale.address }, undefined, 2)
  // );
  // fs.writeFileSync(
  //   contractsDir + "/contract-address.json",
  //   JSON.stringify({ nftPubSale: nftPubSale.address }, undefined, 2)
  // );
  // fs.writeFileSync(
  //   contractsDir + "/contract-address.json",
  //   JSON.stringify({ nft: nft.address }, undefined, 2)
  // );


  // const nftArtifact = artifacts.readArtifactSync("NFT");



  // let abi




  // abi = `const NFT  = ${JSON.stringify(nftArtifact)}`

  // data = JSON.stringify(abi, null, 2)

  // fs.writeFileSync(
  //   contractsDir + '/NFT.js', JSON.parse(data)

  // );



}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


// npx hardhat run scripts\deploy.js --network rinkeby