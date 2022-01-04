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
    errorWeb3Modal,
  } = useWeb3React();

  console.log("is active check = ", active);

  // const [issalestart,setissalestart] = useState(true);
  const [startTime, setStartTime] = useState();
  const [discountTime, setDiscountTime] = useState();
  const [issalestart, setissalestart] = useState(true);
  const [loading, setLoading] = useState(0);

  const [currentDate, setCurrentDate] = useState(Date.now);
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
      let startTime = await NFTCrowdsaleContract.startTime();
      if (startTime == 0) {
        setStartTime(0);
      } else {
        let start = await NFTCrowdsaleContract.start();
        let total = start.toNumber();
        console.log("total", total);
        setStartTime(total)

      }
      setLoading(1);
    } catch (e) {
      console.log("data", e);
    }
  };

  const limitationTime = async () => {
    try {
      let signer = await loadProvider();
      let NFTCrowdsaleContract = new ethers.Contract(
        nftPreSale_addr,
        NFTCrowdsale,
        signer
      );
      let start = await NFTCrowdsaleContract.limitationtime();
      let total = start.toNumber();
      let hello;
      let time;
      console.log("total", total);

      let currentTime = currentDate / 1000;
      currentTime = parseInt(currentTime);
      console.log("currentTime", parseInt(currentTime));
      if (total - currentTime > 0) {
        hello = total - currentTime;
        time = parseInt(hello);
        console.log("discountTime", time);
        setDiscountTime(hello);
        setLoading(1);
      } else {
        hello = 0;
        setDiscountTime(hello);
      }
    } catch (e) {
      console.log("data", e);
    }
  };

  useEffect(() => {
    (async () => {
      if (account) {
        try {
          startSaleTime();
          limitationTime();
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [account]);

  // useEffect(() => {
  //   if ( startTime - (currentDate/1000)<=0){
  //     setStartTime(0)
  //   }
  // }, [startTime])

  // const Completionist = () =><h1>PRESALE STARTS IN: 00 DAYS 00 H 00 Minutes 00 SEC</h1>;

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (startTime <= 0) {
      // Render a completed state
      return (
        <>
          <h1>
            DISCOUNT PERIOD ENDS IN: {days} DAYS {hours} H {minutes} Minutes{" "}
            {seconds} SEC
          </h1>
        </>
      );
    } else {
      // Render a countdown
      return (
        <>
          <h1>
            PRESALE STARTS IN: {days} DAYS {hours} H {minutes} Minutes {seconds}{" "}
            SEC
          </h1>
        </>
      );
    }
  };

  // console.log("hello", parseInt(hello))

  console.log("is active check = ", active);
  return (
    <div>
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
        <div></div>
      </nav>

      <div>
        <div className="top-bar">
          {loading == 1 && startTime > 0 ? (
            <div>
              <Countdown
                date={(startTime * 1000)-60000}
                renderer={renderer}
                autoStart
              />
            </div>
          ) : null}
          {loading == 1 && startTime <= 0 && discountTime > 0 ? (
            <div>
              <Countdown
                date={Date.now() + (discountTime * 1000)-60000}
                renderer={renderer}
                autoStart
              />
            </div>
          ) : null}
          {loading == 1 && startTime <= 0 && discountTime <= 0 ? (
            <div>
              <h1>PRE-SALE HAS STARTED</h1>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Header;
