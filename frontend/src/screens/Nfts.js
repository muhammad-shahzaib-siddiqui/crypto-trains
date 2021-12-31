import React from 'react'
import train5 from "../assets/img/train5.jpg"
import train6 from "../assets/img/train6.jpg"
import train7 from "../assets/img/train7.jpg"
import discord from "../assets/img/discord.png"
import twitter from "../assets/img/twitter.png"
import telegram from "../assets/img/telegram.png"
// import {} from "../assets/img"
// import {} from "../assets/img"
// import {} from "../assets/img"
// import {} from "../assets/img"
// import {} from "../assets/img"
// import {} from "../assets/img"
// import {} from "../assets/img"
// import {} from "../assets/img"
// import {} from "../assets/img"
// import {} from "../assets/img"
// import {} from "../assets/img"


const Nfts = () => {
    return (
        <div>
           {/* <div className="container-fluid">
        <nav className="custom-padding">
            <div className="d-j-flex align-items-center">
                <a href="index.html">
                    <img className="logo" src="./assets/img/logo.png" alt=""/>
                </a>
                <div className="d-flex ">
                    <a className="custom-btn btn-white" href="nfts.html">MY NFTS</a>
                    <a className="custom-btn btn-white justify-content-center" onclick="loadWeb3();"><img height="27" src="./assets/img/metamask.png" alt=""/> Connect Metamask</a>
                </div>
            </div>
        </nav>
    </div> */}
    {/* <Header /> */}
    <div className="top-bar">
        <h1>PRESALE STARTS IN: 01 DAYS 12 H 30 SEC</h1>
    </div>
    <h1 className="green-head">You are WHITELISTED</h1>
    <div className="container-fluid">
        <div className="custom-padding">
            <div className="row nft-section">
                <h1 className="white-head">MY NFTS</h1>
                <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
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
                <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
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
                <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
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
