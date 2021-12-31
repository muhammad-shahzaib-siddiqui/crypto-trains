const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LASM",  function ()  {

  
  let NFT
  let nft
  let NFTCrowdsale
  let nftPreSale
  let NFTpaymentSplitter
  let nFTpaymentSplitter
  let [_,per1,per2,per3] = [1,1,1,1]

  it("Should return the new greeting once it's changed", async function () {

    [_,per1,per2,per3] = await ethers.getSigners()
    

    NFTpaymentSplitter = await ethers.getContractFactory("NFTpaymentSplitter");
    nFTpaymentSplitter = await NFTpaymentSplitter.deploy();
     await nFTpaymentSplitter.deployed();

    NFTCrowdsale = await ethers.getContractFactory("NFTCrowdsale");
    nftPreSale = await NFTCrowdsale.deploy(nFTpaymentSplitter.address);
     await nftPreSale.deployed();

      NFT = await ethers.getContractFactory("NFT");
      nft = await NFT.deploy(nftPreSale.address);
      await nft.deployed();
   //  create_NftPreSale
  });
  it("Should start preSale", async function () {

    let tx = await nftPreSale.startSale([per1.address,per2.address],nft.address,10)
    await tx.wait()

  });

 it("Should buy multiple nfts", async function () {
   for(i=0;i<100;i++){
    let _value = await ethers.utils.parseEther('0.2')
    console.log(await _.getBalance())
    let tx = await nftPreSale.connect(per1).buyNFT(3,{value:_value})
   await tx.wait()
   console.log(await _.getBalance())
   }
  
});
it("Should release payment", async function () {
 
   console.log("myadd : ", nFTpaymentSplitter);
   //let add = await _.address;
   console.log(await _.getBalance())
   let rel  = await nFTpaymentSplitter.release(_.address)
    await rel.wait()
   console.log(await _.getBalance())

});
it("Should release payment", async function () {

  let bal = await nft.balanceOf(per1.address);
  
  console.log("balance",bal.toString());
   indexes = await nft.tokenOfOwnerByIndex(per1.address,1);
   console.log("all indexes",indexes.toString());

});
// it("fail Should buy multiple nfts", async function () {
//   for(i=0;i<3;i++){
//    let _value = await ethers.utils.parseEther('0.2')
//    console.log(await _.getBalance())
//    let tx = await nftPreSale.connect(per3).buyNFT(4,{value:_value})
//   await tx.wait()
//   console.log(await _.getBalance())
//   }
 
// });
});
