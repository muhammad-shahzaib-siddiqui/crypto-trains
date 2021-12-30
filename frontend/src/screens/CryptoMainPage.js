import React from 'react'
import logo from "../assets/img/logo.png"
import train1 from "../assets/img/train1.jpg"
import train2 from "../assets/img/train2.jpg"
import train3 from "../assets/img/train3.jpg"
import train4 from "../assets/img/train4.jpg"
import train5 from "../assets/img/train5.jpg"
import train6 from "../assets/img/train6.jpg"
import train7 from "../assets/img/train7.jpg"
import busd from "../assets/img/busd.svg"






const CryptoMainPage = () => {
    return (
        <div>
            

            {/* <div className="container-fluid">
        <nav className="custom-padding custom-padd-mobile">
            <div className="d-j-flex align-items-center">
                <a href="index.html">
                    <img className="logo" src={logo} alt=""/>
                </a>
                <div className="d-flex ">
                    <a className="custom-btn btn-white" href="nfts.html">MY NFTS</a>
                    <a className="custom-btn btn-white justify-content-center" onclick="loadWeb3();"><img height="27" src="./assets/img/metamask.png" alt=""/> Connect Metamask</a>
                </div>
            </div>
        </nav>
    </div> */}
    <div className="top-bar">
        <h1>PRESALE STARTS IN: <span id="days"></span> DAYS <span id="hours"></span> H <span id="minutes"></span> Minutes <span id="seconds"></span> SEC</h1>
    </div>
    <h1 className="green-head">You are WHITELISTED</h1>
    <div className="container-fluid">
        <div className="custom-padding">
            <div className="row nft-section">
                <h1 className="white-head">TRAINS</h1>
                <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                    <div className="nft">
                        <h6 className="nft-box-head">2500/2500</h6>
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
                                <button className="custom-btn btn-green" data-bs-toggle="modal" data-bs-target="#exampleModal">Buy NFT</button>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                    <div className="nft">
                        <h6 className="nft-box-head">1500/1500</h6>
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
                                <button className="custom-btn btn-green" data-bs-toggle="modal" data-bs-target="#exampleModal">Buy NFT</button>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                    <div className="nft">
                        <h6 className="nft-box-head">500/500</h6>
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
                                <button className="custom-btn btn-green" data-bs-toggle="modal" data-bs-target="#exampleModal">Buy NFT</button>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                    <div className="nft">
                        <h6 className="nft-box-head">160/160</h6>
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
                                <button className="custom-btn btn-green" data-bs-toggle="modal" data-bs-target="#exampleModal">Buy NFT</button>
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
                        <h6 className="nft-box-head">300/300</h6>
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
                                <button className="custom-btn btn-green" data-bs-toggle="modal" data-bs-target="#exampleModal">Buy NFT</button>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                    <div className="nft">
                        <h6 className="nft-box-head">200/200</h6>
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
                                <button className="custom-btn btn-green" data-bs-toggle="modal" data-bs-target="#exampleModal">Buy NFT</button>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                    <div className="nft">
                        <h6 className="nft-box-head">100/100</h6>
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
                                <button className="custom-btn btn-green" data-bs-toggle="modal" data-bs-target="#exampleModal">Buy NFT</button>
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
    )
}

export default CryptoMainPage
