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

  // console.log("is active check = ", active);

  // const [issalestart,setissalestart] = useState(true);
  const [startTimer, setStartTimer] = useState(0);
  const [timer, setTimer] = useState(0);
  const [discountTime, setDiscountTime] = useState(0);
  const [issalestart, setissalestart] = useState(true);
  const [loading, setLoading] = useState(0);
  const [currentDate, setCurrentDate] = useState(Date.now);
  const [presaleStartted, setPresaleStarted] = useState(false);
  const [status, setStatus] = useState(false);

  // let address = account.toString()
  // let accountAddress = address.slice(0,3)
  // console.log("accountAddress", accountAddress)
  // console.log("currentDate", currentDate)

  let time = 0;

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
      let start = await NFTCrowdsaleContract.start();
      let startime = await NFTCrowdsaleContract.startTime();
      setStatus(await NFTCrowdsaleContract.getTimeStatus()); //
      let limitationtime = await NFTCrowdsaleContract.discountTime();
      setDiscountTime(limitationtime.toNumber())
      if (status == false) {
        console.log("disssss");

        setTimer(startime.toNumber());
      }
      if (status == true) {
        console.log("discountStartted", limitationtime.toNumber());
        setTimer(limitationtime.toNumber());
      }
      console.log("timeStatus", status);
      let total = start.toNumber();
      console.log("startSaleTimeTotal", total);
      if (total > 0) {
        setPresaleStarted(true);
        console.log("presaleStart");
      } else {
        setPresaleStarted(false);
        console.log("presaleFalse");
      }

      if (startime == 0) {
        setStartTimer(0);
      } else {
        setStartTimer(total);
      }
      setLoading(1);
    } catch (e) {
      console.log("data", e);
    }
  };

  // const limitationTime = async () => {
  //   try {
  //     let signer = await loadProvider();
  //     let NFTCrowdsaleContract = new ethers.Contract(
  //       nftPreSale_addr,
  //       NFTCrowdsale,
  //       signer
  //     );

  //     setLoading(1);
  //   } catch (e) {
  //     console.log("data", e);
  //   }
  // };

  // const blockTimeStoamp = async () => {
  //   try{
  //     let signer = await loadProvider();
  //     let NFTCrowdsaleContract = new ethers.Contract(
  //       nftPreSale_addr,
  //       NFTCrowdsale,
  //       signer
  //     );
  //     let blockTime = await NFTCrowdsaleContract.blocktime();
  //     console.log("blockTime", blockTime.toString())
  //   }
  //   catch(e){
  //     console.log("error", e)
  //   }
  // }

  useEffect(() => {
    (async () => {
      if (account) {
        try {
          startSaleTime();
          // limitationTime();
          // blockTimeStoamp();
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [account, status]);

  // useEffect(() => {
  //   if ( startTime - (currentDate/1000)<=0){
  //     setStartTime(0)
  //   }
  // }, [startTime])

  // const Completionist = () =><h1>PRESALE STARTS IN: 00 DAYS 00 H 00 Minutes 00 SEC</h1>;

  console.log("startTime", startTimer);
  console.log("discount", discountTime);

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    console.log("timestatus test>>>>>>>>>>>>>>>>>>>>>>>>>>>", status);
    if (status == false) {
      if (!completed) {
        return (
          <>
            <h1>
              PRESALE STARTS IN: {days} DAYS {hours} H {minutes} Minutes{" "}
              {seconds} SEC
            </h1>
          </>
        );
      } else {
        return (
          <>
            <h1>PRESALE WILL STARTS SOON</h1>
          </>
        );
      }
    } else if (status == true) {
      console.log("completed>>>>", completed);
      if (!completed) {
      console.log("completed>>>>", completed);

        return (
          <>
            <h1>
              DISCOUNT STARTSa IN: {days} DAYS {hours} H {minutes} Minutes{" "}
              {seconds} SEC
            </h1>
          </>
        );
      } else {
        return (
          <>
            <h1>SALE HAS BEEN STARTED</h1>
          </>
        );
      }
    }
  };

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
              {/* {<img  src="./assets/img/metamask.png" alt="" />} */}
              {active ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* <img height="27" src={metamask} alt="" /> */}
                  <p>{account}</p>
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
        {console.log("timer>>>>>>>>>", timer)}
        <div className="top-bar">
          <Countdown
                date={Date.now() + 100 * 1000} 
                renderer={renderer}
                
              />

          {/* {
            timer > 0   ? (
            <div>
              {console.log("hello>>>>>>>>>>>>>>")}
              <Countdown
                date={timer * 1000}
                renderer={renderer}
                autoStart
              />
            </div>
          ) :  (
            <div>sorry</div>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default Header;
