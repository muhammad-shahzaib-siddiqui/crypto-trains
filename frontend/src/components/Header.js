import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { connectWallet } from "../utils/connectWallet";
import logo from "../assets/img/logo.png";
import metamask from "../assets/img/metamask.png";
import { Link } from "react-router-dom";
import Countdown from "react-countdown";

import { ethers, BigNumber } from "ethers";
import { nft_addr, nftPreSale_addr } from "../contract/addresses";
import NFT from "../contract/NFT.json";
import NFTCrowdsale from "../contract/NFTCrowdsale.json";
import Web3Modal from "web3modal";

function Header(props) {
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

  console.log("is active check = ", active);

  // const [issalestart,setissalestart] = useState(true);
  const [startTime, setStartTime] = useState()
  const [issalestart,setissalestart] = useState(true);

  const [currentDate, setCurrentDate] = useState(Date.now)
  // console.log("currentDate", currentDate)

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

  const startSaleTime = async () => {
    try {
      let signer = await loadProvider();
      let NFTCrowdsaleContract = new ethers.Contract(
        nftPreSale_addr,
        NFTCrowdsale,
        signer
      );
      let start = await NFTCrowdsaleContract.start()
      let total = start.toNumber()
      console.log("total", total)
      setStartTime(total)
      
    } catch (e) {
      console.log("data", e);
    }
  };

  

  const Completionist = () =><h1>PRESALE STARTS IN: 00 DAYS 00 H 00 Minutes 00 SEC</h1>;
    
    const renderer = ({days, hours, minutes, seconds, completed }) => {
        if (completed) {
          // Render a completed state
          return <Completionist />;
        } else {
          // Render a countdown
        return <>
        <h1>PRESALE STARTS IN: {days} DAYS {hours} H {minutes} Minutes {seconds} SEC</h1>
        </>
        }
      };

  useEffect(() => {
    (async () => {
      if (account) {
        try {
          startSaleTime();
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [account]);


  let currentTime = currentDate / 1000
  // console.log("currentTime", parseInt(currentTime))

  let hello = startTime - currentTime

  let time = hello

  

  console.log("hello", time)

  // console.log("hello", parseInt(hello))


  console.log("is active check = ", active);
  return (
    <div>
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
        {
     issalestart == true &&
     <div className="top-bar">
            <Countdown date={Date.now() + 100000} renderer={renderer} autoStart />
    </div>
    
    }
      </div>

      
    </div>
  );
}

export default Header;
