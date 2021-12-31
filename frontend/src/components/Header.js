import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { connectWallet } from "../utils/connectWallet";
import logo from "../assets/img/logo.png";
import metamask from "../assets/img/metamask.png";
import { Link } from "react-router-dom";
import Countdown from "react-countdown";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { nft_addr, nftPreSale_addr } from "../contract/addresses";
import NFT from "../contract/NFT.json";
import NFTCrowdsale from "../contract/NFTCrowdsale.json";

function Header(props) {
  const { active, activate } = useWeb3React();
  const [startTime, setStartTime] = useState()


  const loadProvider = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      return provider.getSigner();
    } catch (e) {
      console.log("loadProvider: ", e);
    }
  };

  const Count = async () => {
    try {
      let signer = await loadProvider();
      let NFTCrowdsaleContract = new ethers.Contract(
        nftPreSale_addr,
        NFTCrowdsale,
        signer
      );
      
      let start = await NFTCrowdsaleContract.start();
      setStartTime(start);
      console.log("start", startTime.toString());
      // console.log("signer", signer)
    } catch (e) {
      console.log("data", e);
    }
  };

  useEffect(() => {
    Count()
  }, [])

  console.log("is active check = ", active);
  return (
    <div>
      {/* {active ? (
        <div
          style={{
            display: "inline-block",
            backgroundColor: "white",
            borderRadius: "40px",
            padding: "8px",
            border: "1px dashed black",
            marginLeft: "10px",
            marginTop: "10px",
          }}
        >
          Connected
        </div>
      ) : (
        <div
          style={{
            display: "inline-block",
            backgroundColor: "white",
            borderRadius: "40px",
            padding: "8px",
            border: "1px dashed black",
            marginLeft: "10px",
            marginTop: "10px",
            cursor: "pointer",
          }}
          onClick={() => {
            connectWallet(activate, props.setErrorMessage);
          }}
        >
          Connect Wallet
        </div>
      )} */}

      <div className="container-fluid">
        <nav className="custom-padding custom-padd-mobile">
          <div className="d-j-flex align-items-center">
            <Link to="/">
              <img className="logo" src={logo} alt="" />
            </Link>
            <div className="d-flex ">
              <div>
                <Link to="myNft" className="custom-btn btn-white">
                  MY NFTS
                </Link>
              </div>
              <div>
                <Link to="airDrop" className="custom-btn btn-white">
                  AirDrop
                </Link>
              </div>

              <a className="custom-btn btn-white justify-content-center">
                {<img height="27" src="./assets/img/metamask.png" alt="" />}
                {active ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img height="27" src={metamask} alt="" />
                    Connected
                  </div>
                ) : (
                  <div
                    // className="custom-btn btn-white justify-content-center"
                    onClick={() => {
                      connectWallet(activate, props.setErrorMessage);
                    }}
                  >
                    {<img height="27" src="./assets/img/metamask.png" alt="" />}
                    Connect Wallet
                  </div>
                )}
              </a>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
