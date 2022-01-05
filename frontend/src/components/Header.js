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
  const [startTime, setStartTime] = useState(0);
  const [discountTime, setDiscountTime] = useState();
  const [issalestart, setissalestart] = useState(true);
  const [loading, setLoading] = useState(0);
  const [currentDate, setCurrentDate] = useState(Date.now);

  // let address = account.toString()
  // let accountAddress = address.slice(0,3)
  // console.log("accountAddress", accountAddress)
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
      let starttime = await NFTCrowdsaleContract.startTime();
      if (starttime == 0) {
        setStartTime(0);
      } else {
        let start = await NFTCrowdsaleContract.start();
        let total = start.toNumber();
        console.log("startSaleTimeTotal", total);
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
      let limitationTime = await NFTCrowdsaleContract.limitationTime();
      if (limitationTime == 0) {
        setDiscountTime(0);
      } else {
        let limitationtime = await NFTCrowdsaleContract.limitationtime();
        let total = limitationtime.toNumber();
        console.log("startlimitationTotal", total);
        setDiscountTime(total)
        

      }
      setLoading(1);
    } catch (e) {
      console.log("data", e);
    }
  };

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
          limitationTime();
          // blockTimeStoamp();
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [account, startTime]);

  // useEffect(() => {
  //   if ( startTime - (currentDate/1000)<=0){
  //     setStartTime(0)
  //   }
  // }, [startTime])

  // const Completionist = () =><h1>PRESALE STARTS IN: 00 DAYS 00 H 00 Minutes 00 SEC</h1>;

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    // if(completed == false){
    //   startTime > 0
    // }
    // else{
    //   startTime >=0
    //   console.log("startTimee>>>>", startTime)
    // }
    console.log("completed", completed)
    if(completed === false){
      return (
        <div>
          <h1>
            PRESALE STARTS IN: {days} DAYS {hours} H {minutes} Minutes {seconds}{" "} 
            SEC
          </h1>
        </div>
      );
    }
    else{
      
      return(
        <>
          <h1>
             DISCOUNT PERIOD ENDS IN: {days} DAYS {hours} H {minutes} Minutes{" "}
             {seconds} SEC
           </h1>
        </>
      )

    }
    // if (startTime > 0) {
    //   // Render a completed state
    //   console.log("PresaleStartIn")
    //   return (
    //     <>
          
    //       <h1>
    //         PRESALE STARTS IN: {days} DAYS {hours} H {minutes} Minutes {seconds}{" "} 
    //         SEC
    //       </h1>
    //     </>
    //   );
    // } else {
    //   // Render a countdown
    //   console.log("DescountPeriod")
    //   return (
    //     <>
    //       <h1>
    //         DISCOUNT PERIOD ENDS IN: {days} DAYS {hours} H {minutes} Minutes{" "}
    //         {seconds} SEC
    //       </h1>
    //     </>
    //   );
    // }
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
        <div className="top-bar">
          {loading == 1 && startTime > 0 ? (<div>
              <Countdown
                date={(startTime * 1000)}
                renderer={renderer}
                autoStart
              />
            </div>) : loading == 1 /*&& startTime <= 0 && discountTime > 0*/ ? (<div> <Countdown
                date={Date.now() + 1000/*(discountTime * 1000)*/}
                renderer={renderer}
                autoStart
              /></div>) : null}

          {/* {loading == 1 && startTime > 0 ? (
            <div>
              <Countdown
                date={(startTime * 1000)}
                renderer={renderer}
                autoStart
              />
            </div>
          ) : null}
          {loading == 1 && startTime <= 0 && discountTime > 0 ? (
            <div>
              <Countdown
                date={Date.now() + (discountTime * 1000)}
                renderer={renderer}
                autoStart
              />
            </div>
          ) : null} */}



          {/* {loading == 1 && startTime <= 0 && discountTime <= 0 ? (
            <div>
              <h1>PRE-SALE HAS STARTED</h1>
            </div>
          ) : null} */}
        </div>
      </div>
    </div>
  );
}

export default Header;
