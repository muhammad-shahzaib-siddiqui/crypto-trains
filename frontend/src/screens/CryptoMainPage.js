import React, { useEffect, useState } from 'react'
import train1 from "../assets/img/train1.jpg"
import train2 from "../assets/img/train2.jpg"
import train3 from "../assets/img/train3.jpg"
import train4 from "../assets/img/train4.jpg"
import train5 from "../assets/img/train5.jpg"
import train6 from "../assets/img/train6.jpg"
import train7 from "../assets/img/train7.jpg"
import busd from "../assets/img/busd.svg"
import { ethers,BigNumber } from 'ethers'
import {nft_addr, nftPreSale_addr} from "../contract/addresses"
import NFT from "../contract/NFT.json";
import NFTCrowdsale from "../contract/NFTCrowdsale.json"
import Web3Modal from 'web3modal'
import { useWeb3React } from "@web3-react/core";
import { Button, Modal } from 'react-bootstrap'
import Countdown from 'react-countdown';
import {generate} from "../components/metadata"




export default function CryptoMainPage() {

    const [Train_common_limit, setTrain_common_limit] = useState()
    const [Train_rare_limit, setTrain_rare_limit] = useState()
    const [Train_epic_limit, setTrain_epic_limit] = useState()
    const [Train_legendary_limit, setTrain_legendary_limit] = useState()
    const [Station_common_limit, setStation_common_limit] = useState()
    const [Station_mitic_limit, setStation_mitic_limit] = useState()
    const [Station_Legendary_limit, setStation_Legendary_limit] = useState()

    const [Train_common, setTrain_common] = useState()
    const [Train_rare, setTrain_rare] = useState()
    const [Train_epic, setTrain_epic] = useState()
    const [Train_legendary, setTrain_legendary] = useState()
    const [Station_common, setStation_common] = useState()
    const [Station_mitic, setStation_mitic] = useState()
    const [Station_Legendary, setStation_Legendary] = useState()
    const [balance, setBalance] = useState();
    const [issalestart,setissalestart] = useState(true);
    const [iswhitelist,setiswhitelist] = useState(false);

    const [loading, setLoading] = useState("loading")
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [purchased, setPurchased] = useState()
    const [startTime, setStartTime] = useState(10000)

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
    
    const loadLimit = async () => {
        try {
           
            let signer = await loadProvider()
            let NFTcontract = new ethers.Contract(nft_addr, NFT, signer);
            let Train_common_limit = await NFTcontract.Train_common_limit()
            let Train_rare_limit = await NFTcontract.Train_rare_limit()
            let Train_epic_limit = await NFTcontract.Train_epic_limit()
            let Train_legendary_limit = await NFTcontract.Train_legendary_limit()
            let Station_common_limit = await NFTcontract.Station_common_limit()
            let Station_mitic_limit = await NFTcontract.Station_mitic_limit()
            let Station_Legendary_limit = await NFTcontract.Station_Legendary_limit()

            setTrain_common_limit(parseInt(Train_common_limit.toString()))
            setTrain_rare_limit(parseInt(Train_rare_limit.toString()))
            setTrain_epic_limit(parseInt(Train_epic_limit.toString()))
            setTrain_legendary_limit(parseInt(Train_legendary_limit.toString()))
            setStation_common_limit(parseInt(Station_common_limit.toString()))
            setStation_mitic_limit(parseInt(Station_mitic_limit.toString()))
            setStation_Legendary_limit(parseInt(Station_Legendary_limit.toString()))

            let Train_common = await NFTcontract.Train_common()
            let Train_rare = await NFTcontract.Train_rare()
            let Train_epic = await NFTcontract.Train_epic()
            let Train_legendary = await NFTcontract.Train_legendary()
            let Station_common = await NFTcontract.Station_common()
            let Station_mitic = await NFTcontract.Station_mitic()
            let Station_Legendary = await NFTcontract.Station_Legendary()

            setTrain_common(parseInt(Train_common.toString()))
            setTrain_rare(parseInt(Train_rare.toString()))
            setTrain_epic(parseInt(Train_epic.toString()))
            setTrain_legendary(parseInt(Train_legendary.toString()))
            setStation_common(parseInt(Station_common.toString()))
            setStation_mitic(parseInt(Station_mitic.toString()))
            setStation_Legendary(parseInt(Station_Legendary.toString()))

            setLoading("loaded")

            
            
            
            // console.log("taaaaaaaaaaaaiiiiiiiiiiiiinnnnnnnnnnn: ", data.toString())
        } catch (error) {
            console.log("data :", error)
        }
    }

    


    const loadWhiteList = async () => {
        try {
            
            let signer = await loadProvider()
            let NFTCrowdsaleContract = new ethers.Contract(nftPreSale_addr, NFTCrowdsale, signer);
            let _whitelist = await NFTCrowdsaleContract.whitelist(account)
            let start = await NFTCrowdsaleContract.start()
            let total = start.toNumber()
            setStartTime(total)
            setiswhitelist(_whitelist)          
            console.log("time", total)
        } catch (e) {
            console.log("data", e)
        }
    }

    // const getPrice = async  (no) => {
    //     try{
    //         let signer = await loadProvider()
    //         console.log("number", no)
    //         let NFTCrowdsaleContract = new ethers.Contract(nftPreSale_addr, NFTCrowdsale, signer)
    //         let _value = await NFTCrowdsaleContract.getPrice(no)
    //         // let _value = await ethers.utils.parseEther('0.3')
    //         console.log("getPrice", _value.toString())
    //     }
    //     catch(e){
    //         console.log("error", e)
    //     }
    // }



    const buynft = async (no) => {
        try{
            let signer = await loadProvider()
            console.log("number", no)
            let NFTCrowdsaleContract = new ethers.Contract(nftPreSale_addr, NFTCrowdsale, signer)
            let _value = await NFTCrowdsaleContract.getPrice(no)
            let _value1 = await NFTCrowdsaleContract.Train_common()
            // let _value = await ethers.utils.parseEther('0.3')
            let uri = generate(no)
            console.log("uri>>>", uri)
            console.log("value>>", _value.toString())
            let buy = await NFTCrowdsaleContract.buyNFT(no, uri, {value:_value})

            let tx =  await buy.wait()
            let userPurchased = await NFTCrowdsaleContract.userPurchased(account)
            setPurchased(parseInt(userPurchased.toString()))
            console.log("purchased", purchased)

            console.log("userPurchased", userPurchased)
            if(tx.confirmations == 1){
                loadLimit()
                handleShow()
            }
            console.log("tx", tx)
            
        }
        catch(e){
            console.log("error", e)
        }
    }
    

    

    useEffect(() => {
        (async () => {
            if (account) {
                try {
                    loadLimit()
                    loadWhiteList()
                  

                } catch (error) {
                    console.log(error)
                }
            }
        })()
    }, [account]);

    // const Completionist = () =><h1>PRESALE STARTS IN: 00 DAYS 00 H 00 Minutes 00 SEC</h1>;
    
    // const renderer = ({days, hours, minutes, seconds, completed }) => {
    //     if (completed) {
    //       // Render a completed state
    //       return <Completionist />;
    //     } else {
    //       // Render a countdown
    //     return <>
    //     <h1>PRESALE STARTS IN: {days} DAYS {hours} H {minutes} Minutes {seconds} SEC</h1>
    //     </>
    //     }
    //   };

    return (
        <div>
 {/* {
     issalestart == true &&
     <div className="top-bar">
            <Countdown date={Date.now() + startTime} renderer={renderer} autoStart />
    </div>
    
    } */}
    {
        iswhitelist == true ? <>
    <h1 className="green-head">You are WHITELISTED</h1>
    </>
    :<>
    <h1 className="red-head">Connect to Your Wallet</h1>
    </>
    }
    <div className="container-fluid">
        <div className="custom-padding">
            <div className="row nft-section">
                <h1 className="white-head">TRAINS</h1>
                <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                    <div className="nft">
                        <h6 className="nft-box-head">{loading === "loading"? (<p>loading</p>): `${Train_common_limit - Train_common}/${Train_common_limit}` }</h6>
                        <img className="nft-box" src={train1} alt="" />
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>GOODS TRAIN</h5>
                                <div className="tag">
                                    <h6 >COMMON</h6>
                                </div>
                            </div>
                        </div>
                        <div className="price-section">
                            <div className="d-flex justify-content-center">
                                <span className="text-center">250 BUSD</span>
                                <img src={busd} alt=""/>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button  onClick={()=> {
                                    buynft(0)
                                    
                                } } className="custom-btn btn-green" >Buy NFT</button>
                                
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                    <div className="nft">
                        <h6 className="nft-box-head">{loading === "loading"?(<p>loading</p>):`${Train_rare_limit - Train_rare}/${Train_rare_limit}`}</h6>
                        <img className="nft-box" src={train2} alt="" />
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>VILLAGE TRAIN</h5>
                                <div className="tag">
                                    <h6 >RARE</h6>
                                </div>
                            </div>
                        </div>
                        <div className="price-section">
                            <div className="d-flex justify-content-center">
                                <span className="text-center">550 BUSD</span>
                                <img src={busd} alt=""/>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button onClick={()=> {
                                    buynft(1)
                                    
                                } } className="custom-btn btn-green" >Buy NFT</button>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                    <div className="nft">
                        <h6 className="nft-box-head">{loading === "loading"?(<p>loading</p>):`${Train_epic_limit - Train_epic}/${Train_epic_limit}`}</h6>
                        <img className="nft-box" src={train3} alt="" />
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>CITY TRAIN</h5>
                                <div className="tag">
                                    <h6 >EPIC</h6>
                                </div>
                            </div>
                        </div>
                        <div className="price-section">
                            <div className="d-flex justify-content-center">
                                <span className="text-center">900 BUSD</span>
                                <img src={busd} alt=""/>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button onClick={()=> {
                                    buynft(2)
                                    
                                } } className="custom-btn btn-green" >Buy NFT</button>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                    <div className="nft">
                        <h6 className="nft-box-head">{loading === "loading"?(<p>loading</p>):`${Train_legendary_limit - Train_legendary}/${Train_legendary_limit}`}</h6>
                        <img className="nft-box" src={train4} alt="" />
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>HIGH-SPEED TRAIN</h5>
                                <div className="tag">
                                    <h6 >LEGENDARY</h6>
                                </div>
                            </div>
                        </div>
                        <div className="price-section">
                            <div className="d-flex justify-content-center">
                                <span className="text-center">250 BUSD</span>
                                <img src={busd} alt=""/>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button onClick={()=> {
                                    buynft(3)
                                    
                                } } className="custom-btn btn-green" >Buy NFT</button>
                            </div>
                        </div>
                    </div>

                </div>
                
            </div>
        </div>
        <div className="custom-padding">
            <div className="row nft-section">
                <h1 className="white-head">STATIONS</h1>
                <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                    <div className="nft">
                        <h6 className="nft-box-head">{loading === "loading"?(<p>loading</p>):`${Station_common_limit - Station_common}/${Station_common_limit}`}</h6>
                        <img className="nft-box" src={train5} alt="" />
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>GOODS STATION</h5>
                                <div className="tag">
                                    <h6 >COMMON</h6>
                                </div>
                            </div>
                        </div>
                        <div className="price-section">
                            <div className="d-flex justify-content-center">
                                <span className="text-center">1100 BUSD</span>
                                <img src={busd} alt=""/>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button onClick={()=> {
                                    buynft(4)
                                    
                                } } className="custom-btn btn-green" >Buy NFT</button>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                    <div className="nft">
                        <h6 className="nft-box-head">{loading === "loading"?(<p>loading</p>):`${Station_mitic_limit - Station_mitic}/${Station_mitic_limit}`}</h6>
                        <img className="nft-box" src={train6} alt=""/>
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>CITY STATION</h5>
                                <div className="tag">
                                    <h6 >EPIC</h6>
                                </div>
                            </div>
                        </div>
                        <div className="price-section">
                            <div className="d-flex justify-content-center">
                                <span className="text-center">1800 BUSD</span>
                                <img src={busd} alt=""/>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button onClick={()=> {
                                    buynft(5)
                                    
                                } } className="custom-btn btn-green" >Buy NFT</button>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                    <div className="nft">
                        <h6 className="nft-box-head">{loading === "loading"?(<p>loading</p>):`${Station_Legendary_limit- Station_Legendary}/${Station_Legendary_limit}`}</h6>
                        <img className="nft-box" src={train7} alt="" />
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>HIGH-SPEED STATION</h5>
                                <div className="tag">
                                    <h6 >LEGENDARY</h6>
                                </div>
                            </div>
                        </div>
                        <div className="price-section">
                            <div className="d-flex justify-content-center">
                                <span className="text-center">900 BUSD</span>
                                <img src={busd} alt=""/>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button onClick={()=> {
                                    buynft(6)
                                    
                                } } className="custom-btn btn-green" >Buy NFT</button>
                            </div>
                        </div>
                    </div>

                </div>
                
            </div>
        </div>
    </div>
    <div className="container-fluid">
        <div className="custom-padding footer">
            <div className="d-flex flex-end">
                 <span className="text-black">CryptoTrains &reg; 2022</span> 
                 <div className="d-flex align-items-center">
                    <a href=""><img src="./assets/img/discord.png" alt=""/></a>
                    <a href=""><img src="./assets/img/telegram.png" alt=""/></a>
                    <a href=""><img src="./assets/img/twitter.png" alt=""/></a>
                </div>
            </div>
        </div>
    </div>
    <Modal show={show} onHide={handleClose} className='custom-modal' size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
        <h3 className="modal-title" id="exampleModalLabel">CONGRATULATIONS! YOU HAVE PURCHASED YOUR NFT</h3>
        <button type="button" className="btn-close" ></button> 
        </Modal.Header>
        <Modal.Body>
            <h1>You can buy 5 NFT per WALLET!</h1>
              <h1>{`${purchased}/5 NFT`}</h1>
              <div className="d-flex justify-content-center">
                  <a className="custom-btn btn-white"  onClick={handleClose}>KEEP BUYING</a>
                  <a className="custom-btn btn-white"  onClick={handleClose}>VIEW MY NFTS</a>
              </div>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    {/* <div className="modal fade custom-modal" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
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
      </div> */}


        </div>
    )
}


