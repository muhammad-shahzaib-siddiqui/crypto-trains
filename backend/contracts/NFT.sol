// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract NFT is ERC721URIStorage , Ownable{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address contractAddress;

     uint256 public maxSupply = 2559;
     uint256 public nftPerAddressLimit = 3;
     address[] public whitelistedAddresses;

    uint256 public Train_common;
    uint256 public Train_rare;
    uint256 public Train_epic;
    uint256 public Train_legendary;

    uint256 public Station_common;
    uint256 public Station_mitic;
    uint256 public Station_Legendary;

    struct NftDetails{
        address[] owners;
        uint256 creationTime;
    }

    mapping(address => bool) private _owner;
    mapping(uint256=>NftDetails) private _NftDetails;
    mapping(address => uint256) public addressMintedBalance;
//,address pubSale
    constructor(address preSale,address pubSale) ERC721("MyNFTs", "METT") {
        
        _owner[_msgSender()] = true;
        _owner[preSale] = true;
        _owner[pubSale] = true;

    }

    function setNftDetails(uint256 _newItemId,address owner)private{
        _NftDetails[_newItemId].owners.push(owner);
        _NftDetails[_newItemId].creationTime=getTime();
    }

    function addOwner(address owner_) public {
        require(_owner[_msgSender()]==true,"cannot Assign owner");
        _owner[owner_]=true;
    }

    function getNftDetails(uint256 _tokenId)private view returns(NftDetails memory){
        return _NftDetails[_tokenId];
    }

    function createToken(string memory tokenURI , address account) public returns(uint) {
        require(_owner[_msgSender()]==true,"Not authorized to mint");
        require(_tokenIds.current() < 2559 ,"all NFTs Minted");
        require(addressMintedBalance[account] < 3 , "You cannot have more than 3 NFTs");
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        setNftDetails(newItemId,account);
        _mint(account, newItemId);
        _setTokenURI(newItemId, tokenURI);
        addressMintedBalance[account]++;
      //  setApprovalForAll(contractAddress, true);
        return newItemId;
    }

    

    //returns the total number of Nfts minted from this contract
    function totalSupply() private view returns(uint256){
        return _tokenIds.current();
    }

    function getTime() private view returns(uint256){
        return block.timestamp;
    }


    //INC functions
    function  TCommonInc ()private {
        Train_common= Train_common + 1;
        }
    function TRareInc() private{
        Train_rare= Train_rare + 1;
    }
    function TEpicInc() private{
       Train_epic= Train_epic + 1;
    }
    function TLegendaryInc() private{
       Train_legendary= Train_legendary + 1;
    }

     function SCommonInc() private{
      Station_common= Station_common +1;
    }  
    function SMiticInc() private{
      Station_mitic= Station_mitic +1;
    } 
    function SLegendaryInc() private{
      Station_Legendary= Station_Legendary +1;
    } 
}