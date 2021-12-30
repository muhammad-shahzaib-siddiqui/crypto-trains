const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LASM",  function ()  {

  
  let NFT
  let nft
  let NFTCrowdsale
  let nftPreSale
  let nftPubSale
  let [_,per1,per2,per3] = [1,1,1,1]

  it("Should return the new greeting once it's changed", async function () {
    [_,per1,per2,per3] = await ethers.getSigners()
    

   

    NFTCrowdsale = await ethers.getContractFactory("NFTCrowdsale");
    nftPreSale = await NFTCrowdsale.deploy();
     await nftPreSale.deployed();

      NFT = await ethers.getContractFactory("NFT");
      nft = await NFT.deploy(nftPreSale.address);
      await nft.deployed();

  
     


   //  create_NftPreSale
  });
  it("Should start preSale", async function () {

    let tx = await nftPreSale.startSale([per1.address,per2.address],_.address,nft.address)
    await tx.wait()

 });
 it("Should buy multiple nfts", async function () {
   for(i=0;i<6;i++){
    let _value = await ethers.utils.parseEther('0.2')
    console.log(await _.getBalance())
    let tx = await nftPreSale.connect(per1).buyNFT({value:_value})
   await tx.wait()
   console.log(await _.getBalance())
   }
  
});
it("fail Should buy multiple nfts", async function () {
  for(i=0;i<3;i++){
   let _value = await ethers.utils.parseEther('0.2')
   console.log(await _.getBalance())
   let tx = await nftPreSale.connect(per3).buyNFT({value:_value})
  await tx.wait()
  console.log(await _.getBalance())
  }
 
});
});
