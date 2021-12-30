// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./NFT.sol";



contract NFTCrowdsale is Context, ReentrancyGuard,Ownable {

    using SafeMath for uint256;
    using SafeERC20 for IERC20;
    
    // The token being sold
    IERC20 private _token;
    NFT private nft;
    // Address where funds are collected
    address payable private _wallet;
    address payable public _manager;

    
    uint256 private _rate;
    uint256 private limit = 5260;
    uint256 public min;
    uint256 public max;
    uint256 public whitePrice = 0.2 ether;
    uint256 public pubPrice = 0.3 ether;

    //dicounted price
    uint256 public discounted_Train_common=0.2 ether;//0
    uint256 public discounted_Train_rare=0.2 ether;//1
    uint256 public discounted_Train_epic=0.2 ether;//2
    uint256 public discounted_Train_legendary=0.2 ether;//3
    uint256 public discounted_Station_common=0.2 ether;//4
    uint256 public discounted_Station_mitic=0.2 ether;//5
    uint256 public discounted_Station_Legendary=0.2 ether;//6

    //noraml price
    uint256 public Train_common= 0.3 ether;//0
    uint256 public Train_rare= 0.3 ether;//1
    uint256 public Train_epic= 0.3 ether;//2
    uint256 public Train_legendary= 0.3 ether;//3
    uint256 public Station_common= 0.3 ether;//4
    uint256 public Station_mitic= 0.3 ether;//5
    uint256 public Station_Legendary= 0.3 ether;//6
    

    // Amount of wei raised
    uint256 private _weiRaised;
    uint256 public _busdRaised;
    uint256 private _nftPurchased;
    bool public success;
    bool public finalized;
    bool public pub;


    
    event TokensPurchased(address indexed purchaser, address indexed beneficiary, uint256 value, uint256 amount);

    
    
    mapping (address => uint256) purchase;
    mapping (address => uint256) msgValue;
    uint256 public start = 0;
    uint256 public limitationtime = 0;
    mapping(address => bool) private _whitelist;
   
    constructor( address payable wallet_ ){
        _wallet = wallet_;
        }
    

    
    function startSale(address[] memory accounts,address _nft,uint256 startTime) public onlyOwner {
        //NFT(_nft) req
        require(address(_nft) != address(0), "NFT: token is the zero address");
        nft = NFT(_nft);
        require(accounts.length!=0,"please provide whitelist addresses");
        if(accounts.length==0){
        pub = true;
        }
        else{
            pub = false;
            for (uint256 i = 0; i < accounts.length; i++) {
                _addPayee(accounts[i]);
            }
        }
       
        start = block.timestamp + startTime * 1 seconds;
        limitationtime = start + 14400   * 1 seconds;
    }
 
    fallback () external payable { 
    }

    receive () external payable {
    }


    /**
     * @return the address where funds are collected.
     */
    function wallet() public view returns (address payable) {
        return _wallet;
    }

    /**
     * @return the number of token units a buyer gets per wei.
     */
    function rate() public view returns (uint256) {
        return _rate;
    }

    /**
     * @return the amount of wei raised.
     */
    function weiRaised() public view returns (uint256) {
        return _weiRaised;
    }

    
    function buyNFT(uint8 no) public nonReentrant payable {
        require(start<block.timestamp || start !=0,"Sale not started");
        uint256 price;
        if(block.timestamp<limitationtime){
            price = discount_price(no);
        }else{
            price = normal_price(no);
        }
      
            require (purchase[_msgSender()] < 500000000,"cant buy more nft");
            require (_whitelist[_msgSender()] == true,"you are not whitelisted");
            require(_nftPurchased < limit,"All nft Sold");
    
       
        require (!finalized,"Sale Ended");
        uint256 weiAmount = msg.value;
        require (weiAmount ==  price,"please provide exact amount for one NFT");

        nft.createToken("4321",_msgSender(),no);

        
        _nftPurchased ++;

        purchase[_msgSender()]++;

        // update state
        _weiRaised = _weiRaised.add(weiAmount);

        _wallet.transfer(weiAmount);   
    }

    function Finalize() public  returns(bool) {
        require(!finalized,"already finalized");
        require( limit == _nftPurchased, "the crowdSale is in progress");
            //nft.transferOwnership(_wallet);
        finalized = true;
        return finalized;
    }

    function _addPayee(address account) private {
        require(account != address(0), "PaymentSplitter: account is the zero address");
        _whitelist[account]=true;
       
    }
    


    function normal_price(uint8 no) private view returns(uint256){
        if(no==0){
                return Train_common;
            }else if(no==1){
                return Train_rare;
            }else if(no==2){
                return Train_epic;
            }else if(no==3){
                return Train_legendary;
            }else if(no==4){
                return Station_common;
            }else if(no==5){
                return Station_mitic;
            }else if(no==6){
                return Station_Legendary;
            }else{
                require(false,"price :: Type not found");
            }
    }

    function discount_price(uint8 no) private view returns(uint256){
        if(no==0){
                return discounted_Train_common;
            }else if(no==1){
                return discounted_Train_rare;
            }else if(no==2){
                return discounted_Train_epic;
            }else if(no==3){
                return discounted_Train_legendary;
            }else if(no==4){
                return discounted_Station_common;
            }else if(no==5){
                return discounted_Station_mitic;
            }else if(no==6){
                return discounted_Station_Legendary;
            }else{
                require(false,"price :: Type not found");
            }
    }
      
}