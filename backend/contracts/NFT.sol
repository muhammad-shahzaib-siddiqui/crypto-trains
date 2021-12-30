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

     uint256 public maxSupply = 5260;
     uint256 public nftPerAddressLimit = 5;
     address[] public whitelistedAddresses;

    uint256 public Train_common;//0
    uint256 public Train_rare;//1
    uint256 public Train_epic;//2
    uint256 public Train_legendary;//3
    uint256 public Station_common;//4
    uint256 public Station_mitic;//5
    uint256 public Station_Legendary;//6

    uint256 public Train_common_limit=2500;//0
    uint256 public Train_rare_limit=1500;//1
    uint256 public Train_epic_limit=500;//2
    uint256 public Train_legendary_limit=160;//3
    uint256 public Station_common_limit=300;//4
    uint256 public Station_mitic_limit=200;//5
    uint256 public Station_Legendary_limit=100;//6

    struct NftDetails{
        address[] owners;
        uint256 creationTime;
    }

    mapping(address => bool) private _owner;
    mapping(uint256=>NftDetails) private _NftDetails;
    mapping(address => uint256) public addressMintedBalance;
    mapping(uint256 => uint256) public nftType;
//,address pubSale
    constructor(address preSale) ERC721("MyNFTs", "METT") {
        
        _owner[_msgSender()] = true;
        _owner[preSale] = true;
        

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

    function createToken(string memory tokenURI , address account,uint8 nftType) public returns(uint) {
        require(_owner[_msgSender()]==true,"Not authorized to mint");
        require(_tokenIds.current() < 5260 ,"all NFTs Minted");
        require(addressMintedBalance[account] < 510000 , "You cannot have more than 5 NFTs");
        require(inc_nftType(nftType));
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        setNftDetails(newItemId,account);
        _mint(account, newItemId);
        _setTokenURI(newItemId, tokenURI);
        addressMintedBalance[account]++;
        return newItemId;
    }

    


    //returns the total number of Nfts minted from this contract
    function totalSupply() private view returns(uint256){
        return _tokenIds.current();
    }

    function getTime() private view returns(uint256){
        return block.timestamp;
    }


    function inc_nftType(uint8 no) private returns(bool){
            if(no==0){
                require(Train_common<Train_common_limit,"all Common trains minted");
                Train_common++;
                return true;
            }else if(no==1){
                require(Train_rare<Train_rare_limit,"all Rare trains minted");
                Train_rare++;
                return true;
            }else if(no==2){
                require(Train_epic<Train_epic_limit,"all Epic trains minted");
                Train_epic++;
                return true;
            }else if(no==3){
                require(Train_legendary<Train_legendary_limit,"all Legendry trains minted");
                Train_legendary++;
                return true;
            }else if(no==4){
                require(Station_common<Station_common_limit,"all Common staions minted");
                Station_common++;
                return true;
            }else if(no==5){
                require(Station_mitic<Station_mitic_limit,"all Mitic stations minted");
                Station_mitic++;
                return true;
            }else if(no==6){
                require(Station_Legendary<Station_Legendary_limit,"all Legendary trains minted");
                Station_Legendary++;
                return true;
            }else{
                require(false,"Type not found");
            }
    }


  

 
}