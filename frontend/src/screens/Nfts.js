import train1 from "../assets/img/train1.jpg"
import train2 from "../assets/img/train2.jpg"
import train3 from "../assets/img/train3.jpg"
import train4 from "../assets/img/train4.jpg"
import train5 from "../assets/img/train5.jpg"
import train6 from "../assets/img/train6.jpg"
import train7 from "../assets/img/train7.jpg"
import discord from "../assets/img/discord.png"
import twitter from "../assets/img/twitter.png"
import telegram from "../assets/img/telegram.png"


import React, { useEffect, useState } from 'react'
import { ethers,BigNumber } from 'ethers'
import {nft_addr, nftPreSale_addr} from "../contract/addresses"
import NFT from "../contract/NFT.json";
import NFTCrowdsale from "../contract/NFTCrowdsale.json"
import Web3Modal from 'web3modal'
import { useWeb3React } from "@web3-react/core";




const Nfts = () => {

    const {
        connector,
        library,
        account,
        chainId,
        activate,
        deactivate,
        active,
        errorWeb3Modal
    } = useWeb3React();

    const [balance, setBalance] = useState()
    const [nftType, setNftType] = useState([])

    const loadProvider = async () => {
        try{
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            return provider.getSigner();
        }
        catch(e){
            console.log("loadProvider: ", e)
        }
    }

    const loadNFTs = async () => {
        try {
            
            let signer = await loadProvider()
            let NFTCrowdsaleContract = new ethers.Contract(nft_addr, NFT, signer);
            let balanceOf = await NFTCrowdsaleContract.balanceOf(account)
            let balance = balanceOf.toNumber()
            let arr= [] 
            for(var i = 0; i < balanceOf; i++) {
              let id = await NFTCrowdsaleContract.tokenOfOwnerByIndex(account,i);
                console.log("all indexes",id.toString());
                let tokenType = await NFTCrowdsaleContract.tokenType(id)
                let token = tokenType.toNumber()
                arr.push(token)
                console.log("type", token)
            }
            console.log("array : " , arr)

            setNftType(arr)
            setBalance(balance)
            console.log("nftType", nftType)
            console.log("balanceOf", balance) 
           
            // console.log("signer", signer)

        } catch (e) {
            console.log("data", e)
        }
    }

    useEffect(() => {
        (async () => {
            if (account) {
                try {
                    loadNFTs()
                } catch (error) {
                    console.log(error)
                }
            }
        })()
    }, [account]);

    
    if (!account) {
        return <h1>Kindly connect wallet</h1>
    }


    return (
        <div>
    <div className="top-bar">
        <h1>PRESALE STARTS IN: 01 DAYS 12 H 30 SEC</h1>
        {balance}
    </div>
    <h1 className="green-head">You are WHITELISTED</h1>
    <div className="container-fluid">
        <div className="custom-padding">
            <div className="row nft-section">
                <h1 className="white-head">MY NFTS</h1>
                
                   {
                        // nftType.length[2] == 2 ? (commonTrain) :null
                        nftType[0] == 0 ? (
                            <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                        <div>
                            <div className="nft">
                        <div className="tag-top">
                            <h6>x1</h6>
                        </div>
                        <img className="nft-box" src={train1} alt="" />
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>GOODS TRAIN</h5>
                                <div className="tag">
                                    <h6 >COMMON</h6>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                        </div>
               </div> ) :null
               
                    }
                    {
                        // nftType.length[2] == 2 ? (commonTrain) :null
                        nftType[0] == 1 ? (
                            <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                        <div>
                            <div className="nft">
                        <div className="tag-top">
                            <h6>x1</h6>
                        </div>
                        <img className="nft-box" src={train2} alt="" />
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>VILLAGE STATION</h5>
                                <div className="tag">
                                    <h6 >RARE</h6>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                        </div>
               </div> ) :null
               
                    }
                    {
                        // nftType.length[2] == 2 ? (commonTrain) :null
                        nftType[0] == 2 ? (
                            <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                        <div>
                            <div className="nft">
                        <div className="tag-top">
                            <h6>x1</h6>
                        </div>
                        <img className="nft-box" src={train3} alt="" />
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>CITY STATION</h5>
                                <div className="tag">
                                    <h6 >EPIC</h6>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                        </div>
               </div> ) :null
               
                    }
                    {
                        // nftType.length[2] == 2 ? (commonTrain) :null
                        nftType[0] == 3 ? (
                            <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                        <div>
                            <div className="nft">
                        <div className="tag-top">
                            <h6>x1</h6>
                        </div>
                        <img className="nft-box" src={train4} alt="" />
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>HIGH-SPEED STATION</h5>
                                <div className="tag">
                                    <h6 >LEGENDARY</h6>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                        </div>
               </div> ) :null
               
                    }
                    {
                        // nftType.length[2] == 2 ? (commonTrain) :null
                        nftType[0] == 4 ? (
                            <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                        <div>
                            <div className="nft">
                        <div className="tag-top">
                            <h6>x1</h6>
                        </div>
                        <img className="nft-box" src={train5} alt="" />
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>GOODS STATION</h5>
                                <div className="tag">
                                    <h6 >COMMON</h6>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                        </div>
               </div> ) :null
               
                    }
                    {
                        // nftType.length[2] == 2 ? (commonTrain) :null
                        nftType[0] == 5 ? (
                            <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                        <div>
                            <div className="nft">
                        <div className="tag-top">
                            <h6>x1</h6>
                        </div>
                        <img className="nft-box" src={train6} alt="" />
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>CITY STATION</h5>
                                <div className="tag">
                                    <h6 >EPIC</h6>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                        </div>
               </div> ) :null
               
                    }
                    {
                        // nftType.length[2] == 2 ? (commonTrain) :null
                        nftType[0] == 6 ? (
                            <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                        <div>
                            <div className="nft">
                        <div className="tag-top">
                            <h6>x1</h6>
                        </div>
                        <img className="nft-box" src={train7} alt="" />
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>HIGH-SPEED STATION</h5>
                                <div className="tag">
                                    <h6 >LEGENDARY</h6>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                        </div>
               </div> ) :null
               
                    }
                    {
                        // nftType.length[2] == 2 ? (commonTrain) :null
                        nftType[1] == 0 ? (
                            <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                        <div>
                            <div className="nft">
                        <div className="tag-top">
                            <h6>x1</h6>
                        </div>
                        <img className="nft-box" src={train1} alt="" />
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>GOODS TRAIN</h5>
                                <div className="tag">
                                    <h6 >COMMON</h6>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                        </div>
               </div> ) :null
               
                    }
                    {
                        // nftType.length[2] == 2 ? (commonTrain) :null
                        nftType[1] == 1 ? (
                            <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                        <div>
                            <div className="nft">
                        <div className="tag-top">
                            <h6>x1</h6>
                        </div>
                        <img className="nft-box" src={train2} alt="" />
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>VILLAGE STATION</h5>
                                <div className="tag">
                                    <h6 >RARE</h6>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                        </div>
               </div> ) :null
               
                    }
                    {
                        // nftType.length[2] == 2 ? (commonTrain) :null
                        nftType[1] == 2 ? (
                            <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                        <div>
                            <div className="nft">
                        <div className="tag-top">
                            <h6>x1</h6>
                        </div>
                        <img className="nft-box" src={train3} alt="" />
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>CITY STATION</h5>
                                <div className="tag">
                                    <h6 >EPIC</h6>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                        </div>
               </div> ) :null
               
                    }
                    {
                        // nftType.length[2] == 2 ? (commonTrain) :null
                        nftType[1] == 3 ? (
                            <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                        <div>
                            <div className="nft">
                        <div className="tag-top">
                            <h6>x1</h6>
                        </div>
                        <img className="nft-box" src={train4} alt="" />
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>HIGH-SPEED STATION</h5>
                                <div className="tag">
                                    <h6 >LEGENDARY</h6>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                        </div>
               </div> ) :null
               
                    }
                    {
                        // nftType.length[2] == 2 ? (commonTrain) :null
                        nftType[1] == 4 ? (
                            <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                        <div>
                            <div className="nft">
                        <div className="tag-top">
                            <h6>x1</h6>
                        </div>
                        <img className="nft-box" src={train5} alt="" />
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>GOODS STATION</h5>
                                <div className="tag">
                                    <h6 >COMMON</h6>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                        </div>
               </div> ) :null
               
                    }
                    {
                        // nftType.length[2] == 2 ? (commonTrain) :null
                        nftType[1] == 5 ? (
                            <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                        <div>
                            <div className="nft">
                        <div className="tag-top">
                            <h6>x1</h6>
                        </div>
                        <img className="nft-box" src={train6} alt="" />
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>CITY STATION</h5>
                                <div className="tag">
                                    <h6 >EPIC</h6>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                        </div>
               </div> ) :null
               
                    }
                    {
                        // nftType.length[2] == 2 ? (commonTrain) :null
                        nftType[1] == 6 ? (
                            <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                        <div>
                            <div className="nft">
                        <div className="tag-top">
                            <h6>x1</h6>
                        </div>
                        <img className="nft-box" src={train7} alt="" />
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>HIGH-SPEED STATION</h5>
                                <div className="tag">
                                    <h6 >LEGENDARY</h6>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                        </div>
               </div> ) :null
               
                    }
                    {
                        // nftType.length[2] == 2 ? (commonTrain) :null
                        nftType[2] == 0 ? (
                            <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                        <div>
                            <div className="nft">
                        <div className="tag-top">
                            <h6>x1</h6>
                        </div>
                        <img className="nft-box" src={train1} alt="" />
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>GOODS TRAIN</h5>
                                <div className="tag">
                                    <h6 >COMMON</h6>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                        </div>
               </div> ) :null
               
                    }
                    {
                        // nftType.length[2] == 2 ? (commonTrain) :null
                        nftType[2] == 1 ? (
                            <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                        <div>
                            <div className="nft">
                        <div className="tag-top">
                            <h6>x1</h6>
                        </div>
                        <img className="nft-box" src={train2} alt="" />
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>VILLAGE STATION</h5>
                                <div className="tag">
                                    <h6 >RARE</h6>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                        </div>
               </div> ) :null
               
                    }
                    {
                        // nftType.length[2] == 2 ? (commonTrain) :null
                        nftType[2] == 2 ? (
                            <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                        <div>
                            <div className="nft">
                        <div className="tag-top">
                            <h6>x1</h6>
                        </div>
                        <img className="nft-box" src={train3} alt="" />
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>CITY STATION</h5>
                                <div className="tag">
                                    <h6 >EPIC</h6>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                        </div>
               </div> ) :null
               
                    }
                    {
                        // nftType.length[2] == 2 ? (commonTrain) :null
                        nftType[2] == 3 ? (
                            <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                        <div>
                            <div className="nft">
                        <div className="tag-top">
                            <h6>x1</h6>
                        </div>
                        <img className="nft-box" src={train4} alt="" />
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>HIGH-SPEED STATION</h5>
                                <div className="tag">
                                    <h6 >LEGENDARY</h6>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                        </div>
               </div> ) :null
               
                    }
                    {
                        // nftType.length[2] == 2 ? (commonTrain) :null
                        nftType[2] == 4 ? (
                            <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                        <div>
                            <div className="nft">
                        <div className="tag-top">
                            <h6>x1</h6>
                        </div>
                        <img className="nft-box" src={train5} alt="" />
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>GOODS STATION</h5>
                                <div className="tag">
                                    <h6 >COMMON</h6>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                        </div>
               </div> ) :null
               
                    }
                    {
                        // nftType.length[2] == 2 ? (commonTrain) :null
                        nftType[2] == 5 ? (
                            <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                        <div>
                            <div className="nft">
                        <div className="tag-top">
                            <h6>x1</h6>
                        </div>
                        <img className="nft-box" src={train6} alt="" />
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>CITY STATION</h5>
                                <div className="tag">
                                    <h6 >EPIC</h6>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                        </div>
               </div> ) :null
               
                    }
                    {
                        // nftType.length[2] == 2 ? (commonTrain) :null
                        nftType[2] == 6 ? (
                            <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                        <div>
                            <div className="nft">
                        <div className="tag-top">
                            <h6>x1</h6>
                        </div>
                        <img className="nft-box" src={train7} alt="" />
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>HIGH-SPEED STATION</h5>
                                <div className="tag">
                                    <h6 >LEGENDARY</h6>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                        </div>
               </div> ) :null
               
                    }
                    {
                        // nftType.length[2] == 2 ? (commonTrain) :null
                        nftType[3] == 0 ? (
                            <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                        <div>
                            <div className="nft">
                        <div className="tag-top">
                            <h6>x1</h6>
                        </div>
                        <img className="nft-box" src={train1} alt="" />
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>GOODS TRAIN</h5>
                                <div className="tag">
                                    <h6 >COMMON</h6>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                        </div>
               </div> ) :null
               
                    }
                    {
                        // nftType.length[2] == 2 ? (commonTrain) :null
                        nftType[3] == 1 ? (
                            <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                        <div>
                            <div className="nft">
                        <div className="tag-top">
                            <h6>x1</h6>
                        </div>
                        <img className="nft-box" src={train2} alt="" />
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>VILLAGE STATION</h5>
                                <div className="tag">
                                    <h6 >RARE</h6>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                        </div>
               </div> ) :null
               
                    }
                    {
                        // nftType.length[2] == 2 ? (commonTrain) :null
                        nftType[3] == 2 ? (
                            <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                        <div>
                            <div className="nft">
                        <div className="tag-top">
                            <h6>x1</h6>
                        </div>
                        <img className="nft-box" src={train3} alt="" />
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>CITY STATION</h5>
                                <div className="tag">
                                    <h6 >EPIC</h6>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                        </div>
               </div> ) :null
               
                    }
                    {
                        // nftType.length[2] == 2 ? (commonTrain) :null
                        nftType[3] == 3 ? (
                            <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                        <div>
                            <div className="nft">
                        <div className="tag-top">
                            <h6>x1</h6>
                        </div>
                        <img className="nft-box" src={train4} alt="" />
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>HIGH-SPEED STATION</h5>
                                <div className="tag">
                                    <h6 >LEGENDARY</h6>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                        </div>
               </div> ) :null
               
                    }
                    {
                        // nftType.length[2] == 2 ? (commonTrain) :null
                        nftType[3] == 4 ? (
                            <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                        <div>
                            <div className="nft">
                        <div className="tag-top">
                            <h6>x1</h6>
                        </div>
                        <img className="nft-box" src={train5} alt="" />
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>GOODS STATION</h5>
                                <div className="tag">
                                    <h6 >COMMON</h6>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                        </div>
               </div> ) :null
               
                    }
                    {
                        // nftType.length[2] == 2 ? (commonTrain) :null
                        nftType[3] == 5 ? (
                            <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                        <div>
                            <div className="nft">
                        <div className="tag-top">
                            <h6>x1</h6>
                        </div>
                        <img className="nft-box" src={train6} alt="" />
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>CITY STATION</h5>
                                <div className="tag">
                                    <h6 >EPIC</h6>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                        </div>
               </div> ) :null
               
                    }
                    {
                        // nftType.length[2] == 2 ? (commonTrain) :null
                        nftType[3] == 6 ? (
                            <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                        <div>
                            <div className="nft">
                        <div className="tag-top">
                            <h6>x1</h6>
                        </div>
                        <img className="nft-box" src={train7} alt="" />
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>HIGH-SPEED STATION</h5>
                                <div className="tag">
                                    <h6 >LEGENDARY</h6>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                        </div>
               </div> ) :null
               
                    }
                    {
                        // nftType.length[2] == 2 ? (commonTrain) :null
                        nftType[4] == 0 ? (
                            <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                        <div>
                            <div className="nft">
                        <div className="tag-top">
                            <h6>x1</h6>
                        </div>
                        <img className="nft-box" src={train1} alt="" />
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>GOODS TRAIN</h5>
                                <div className="tag">
                                    <h6 >COMMON</h6>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                        </div>
               </div> ) :null
               
                    }
                    {
                        // nftType.length[2] == 2 ? (commonTrain) :null
                        nftType[4] == 1 ? (
                            <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                        <div>
                            <div className="nft">
                        <div className="tag-top">
                            <h6>x1</h6>
                        </div>
                        <img className="nft-box" src={train2} alt="" />
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>VILLAGE STATION</h5>
                                <div className="tag">
                                    <h6 >RARE</h6>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                        </div>
               </div> ) :null
               
                    }
                    {
                        // nftType.length[2] == 2 ? (commonTrain) :null
                        nftType[4] == 2 ? (
                            <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                        <div>
                            <div className="nft">
                        <div className="tag-top">
                            <h6>x1</h6>
                        </div>
                        <img className="nft-box" src={train3} alt="" />
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>CITY STATION</h5>
                                <div className="tag">
                                    <h6 >EPIC</h6>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                        </div>
               </div> ) :null
               
                    }
                    {
                        // nftType.length[2] == 2 ? (commonTrain) :null
                        nftType[4] == 3 ? (
                            <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                        <div>
                            <div className="nft">
                        <div className="tag-top">
                            <h6>x1</h6>
                        </div>
                        <img className="nft-box" src={train4} alt="" />
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>HIGH-SPEED STATION</h5>
                                <div className="tag">
                                    <h6 >LEGENDARY</h6>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                        </div>
               </div> ) :null
               
                    }
                    {
                        // nftType.length[2] == 2 ? (commonTrain) :null
                        nftType[4] == 4 ? (
                            <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                        <div>
                            <div className="nft">
                        <div className="tag-top">
                            <h6>x1</h6>
                        </div>
                        <img className="nft-box" src={train5} alt="" />
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>GOODS STATION</h5>
                                <div className="tag">
                                    <h6 >COMMON</h6>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                        </div>
               </div> ) :null
               
                    }
                    {
                        // nftType.length[2] == 2 ? (commonTrain) :null
                        nftType[4] == 5 ? (
                            <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                        <div>
                            <div className="nft">
                        <div className="tag-top">
                            <h6>x1</h6>
                        </div>
                        <img className="nft-box" src={train6} alt="" />
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>CITY STATION</h5>
                                <div className="tag">
                                    <h6 >EPIC</h6>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                        </div>
               </div> ) :null
               
                    }
                    {
                        // nftType.length[2] == 2 ? (commonTrain) :null
                        nftType[4] == 6 ? (
                            <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                        <div>
                            <div className="nft">
                        <div className="tag-top">
                            <h6>x1</h6>
                        </div>
                        <img className="nft-box" src={train7} alt="" />
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>HIGH-SPEED STATION</h5>
                                <div className="tag">
                                    <h6 >LEGENDARY</h6>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                        </div>
               </div> ) :null
               
                    }

                    
    
                
               
                
            </div>
        </div>
        <div className="container-fluid">
        <div className="custom-padding footer">
            <div className="d-j-flex">
                <span className="text-black">CryptoTrains &reg; 2022</span>
                <div className="d-flex align-items-center">
                    <a href=""><img src={discord} alt=""/></a>
                    <a href=""><img src={telegram} alt=""/></a>
                    <a href=""><img src={twitter} alt=""/></a>
                </div>
            </div>
        </div>
    </div>

    <div className="modal fade custom-modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title" id="exampleModalLabel">CONGRATULATIONS! YOU HAVE PURCHASED YOUR NFT</h3>
               <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> 
            </div>
            <div className="modal-body">
              <h1>You can buy 5 NFT per WALLET!</h1>
              <h1>1/5 NFT</h1>
              <div className="d-flex justify-content-center">
                  <a className="custom-btn btn-white" data-bs-dismiss="modal" aria-label="Close">KEEP BUYING</a>
                  <a className="custom-btn btn-white" data-bs-dismiss="modal" aria-label="Close">VIEW MY NFTS</a>
              </div>
            </div>
            <div className="modal-footer">
              
            </div>
          </div>
        </div>
      </div>
        </div>
        </div>
    )
}

export default Nfts
