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
  const [timer, setTimer] = useState(0);
  const [discountTime, setDiscountTime] = useState(0);
  const [loading, setLoading] = useState(0);
  const [loading1, setLoading1] = useState(0);
  const [presaleStartted, setPresaleStarted] = useState(false);
  const [status, setStatus] = useState();

  const startDate = React.useRef(Date.now());
  

  let Timeee = discountTime
  console.log("Timeee", Timeee)

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
      let start = await NFTCrowdsaleContract.start();
      let startime = await NFTCrowdsaleContract.startTime();
      setStatus(await NFTCrowdsaleContract.getTimeStatus()); 
      // let limitationtime = await NFTCrowdsaleContract.discountTime();
      // setDiscountTime(limitationtime.toNumber());
      if (status == false) {
        console.log("disssss");

        setTimer(startime);
      }
      console.log("timeStatus", status);
      // let total = start.toNumber();
      // console.log("startSaleTimeTotal", total);
      setLoading(1);
    } catch (e) {
      console.log("data", e);
    }
  };

  let startDiscountTime;
  const limitationTime = async () => {
    try {
      let signer = await loadProvider();
      let NFTCrowdsaleContract = new ethers.Contract(
        nftPreSale_addr,
        NFTCrowdsale,
        signer
      );

      // setStatus(await NFTCrowdsaleContract.getTimeStatus()); 
      startDiscountTime = await NFTCrowdsaleContract.discountTime();
      if (status == true) {
        console.log("disssss");
         setDiscountTime(startDiscountTime);
         setLoading1(1)
      }
      
      console.log("DiscounttimeStatus", status);
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
          limitationTime()
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [account, status]);

  useEffect(() => {
    (async () => {
      if (account) {
        try {
          
          // console.log("")
          // console.log(limitationTime())
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [status]);


  // useEffect(() => {
  //   if ( startTime - (currentDate/1000)<=0){
  //     setStartTime(0)
  //   }
  // }, [startTime])

  // const Completionist = () =><h1>PRESALE STARTS IN: 00 DAYS 00 H 00 Minutes 00 SEC</h1>;

  console.log("discount", discountTime);

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    console.log("timestatus test>>>>>>>>>>>>>>>>>>>>>>>>>>>", status);
    
      if (!completed) {
        return (
          <>
            <h1>
              PRESALE STARTS IN: {days} DAYS {hours} H {minutes} Minutes{" "}
              {seconds} SEC
            </h1>
          </>
        );
      } else if(completed === true) {
        return (
          <>
            <h1>PRESALE WILL STARTS SOON</h1>
          </>
        );
      }
      
    
  };

  const renderer2 = ({ days, hours, minutes, seconds, completed }) => {
    if (!completed) {
      return (
        <>
          <h1>
        DISCOUNT ENDS IN: {days} DAYS {hours} H {minutes} Minutes{" "}
        {seconds} SEC
      </h1>
        </>
      );
    } else if(completed === true) {
      return (
        <>
          <h1>SALE HAS BEEN STARTED</h1>
        </>
      );
    }
  }

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
          {console.log("timer>>>>>>>>>", parseInt(timer))}
          {console.log("discountTime>>>>>>>>>",discountTime)}
          {console.log("Status>>>>>>>>>", status)}
         {status === false && loading==1 ? (<div> {console.log("timer>>>>>>>>>", timer)} <Countdown date={startDate.current + timer * 1000} key="first"  onMount={console.log("first mount")} renderer={renderer} autoStart={true} /></div>) :  status == true &&
          loading1 ==1 &&
         discountTime > 0 ?(<div>
          <Countdown date={Date.now() + discountTime * 1000} key="second" onMount={console.log("second mount")} renderer={renderer2} autoStart={true} />
          {console.log("Timee>>", Timeee)}
            </div>): null }

          
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
