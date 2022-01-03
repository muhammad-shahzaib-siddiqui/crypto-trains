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
import MyNft from '../components/MyNft'




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
    
    const [count, setCount] = useState()

    
let journal = [
    {"name":"GOODS TRAIN", "category":"COMMON", "image": train1, "qty": count},
    {"name":"VILLAGE TRAIN", "category":"RARE", "image": train2},
    {"name":"CITY TRAIN", "category":"EPIC", "image": train3},
    {"name":"HIGH-SPEED TRAIN", "category":"LEGENDARY", "image": train4},
     {"name":"GOODS STATION", "category":"COMMON", "image": train5},
     {"name":"CITY STATION", "category":"EPIC", "image": train6},
     {"name":"HIGH-SPEED-STATION", "category":"LEGENDARY", "image": train7},
     
 
    
  ];
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
            let counter = 0
            for(var i = 0; i < balanceOf; i++) {
              let id = await NFTCrowdsaleContract.tokenOfOwnerByIndex(account,i);
                console.log("all indexes",id.toString());
                let tokenType = await NFTCrowdsaleContract.tokenType(id)
                let token = tokenType.toNumber()
                console.log("tokenType", token)
                arr.push(token)
                console.log("arr", arr)
                if(token == 0) {
                    counter += 1
                    setCount(counter)
                }
                else{
                    console.log("sorry")
                }
                setNftType(arr)
                
            }

            
            

            
            setBalance(balance)
            
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

    const hello = {
        hello: "klghkjhg"
    }
    let type1 = nftType[0];

    
    
   

    

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


                {<div>{count}</div>}
                
                {
                    journal[nftType[0]] && <MyNft image={journal[nftType[0]].image} name={journal[nftType[0]].name} qty={journal[nftType[0]].qty} category={journal[nftType[0]].category}/>
                
                }
                {
                    journal[nftType[1]] && <MyNft image={journal[nftType[1]].image} name={journal[nftType[1]].name} qty={2} category={journal[nftType[1]].category}/>
                
                }
                {
                    journal[nftType[2]] && <MyNft image={journal[nftType[2]].image} name={journal[nftType[2]].name} qty={2} category={journal[nftType[2]].category}/>
                
                }
                {
                    journal[nftType[3]] && <MyNft image={journal[nftType[3]].image} name={journal[nftType[3]].name} qty={2} category={journal[nftType[3]].category}/>
                
                }
                {
                    journal[nftType[4]] && <MyNft image={journal[nftType[4]].image} name={journal[nftType[4]].name} qty={2} category={journal[nftType[4]].category}/>
                
                }
                {/* {
                    nftType[5] !==0 ?(journal[nftType[5]] && <MyNft image={journal[nftType[5]].image} name={journal[nftType[5]].name} qty={2} category={journal[nftType[5]].category}/>) :null
                
                }
                {
                    nftType[6] !==0 ?(journal[nftType[6]] && <MyNft image={journal[nftType[6]].image} name={journal[nftType[6]].name} qty={2} category={journal[nftType[6]].category}/>) :null
                
                } */}
               
                {/* {journal[nftType[0]] && <MyNft image={train1} name={journal[nftType[0]].name} qty={2} category={journal[nftType[0]].category}/>} */}


             {/* {
                 console.log('test  ' + type1)
             } */}

                  
                
               { console.log('====>',journal[type1] && journal[type1].name)}
                
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
