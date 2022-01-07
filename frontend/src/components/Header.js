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
  const [countDown, setCountDown] = React.useState(0);
const [runTimer, setRunTimer] = React.useState(false);
const [shortAddress,setShortAddress] = useState()


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

        setTimer(startime.toNumber());
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


  useEffect(() => {
    (async () => {
      if (account) {
        try {
          startSaleTime();
          limitationTime()
          let len = account.length 
          let short = account.slice(0, 4)+"..." + account.slice(len-5, len-1)
          setShortAddress(short);
          
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [account, status]);






  console.log("discount", discountTime);



 
  
    React.useEffect(() => {
      let timerId;
  
      if (runTimer) {
        setCountDown(timer*1000);
        timerId = setInterval(() => {
          setCountDown((countDown) => countDown - 1);
        }, 1000);
      } else {
        clearInterval(timerId);
      }
  
      return () => clearInterval(timerId);
    }, [runTimer, timer]);
  
    React.useEffect(() => {
      if (countDown < 0 && runTimer) {
        console.log("expired");
        setRunTimer(false);
        setCountDown(0);
      }
    }, [countDown, runTimer]);
  
    const togglerTimer = () => setRunTimer((t) => !t);
  

    const seconds = String(countDown % 60).padStart(2, 0);
    const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);
    // const hours = String(Math.floor(countDown / 60*60)).padStart(2, 0);
    // const days = String(Math.floor(countDown / 60*60*24)).padStart(2, 0); 
    // var days = Math.floor(countDown / (1000 * 60 * 60 * 24))
    // var hours = Math.floor((countDown / (1000 * 60 * 60)) % 24)
    // var minutes = Math.floor((countDown / 1000 / 60) % 60)
    // var seconds = Math.floor((countDown / 1000) % 60)

    useEffect(() => {
        togglerTimer()
    }, [])

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

            <a  className="custom-btn btn-white">
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
                  <span>{shortAddress}</span>
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
          {console.log("statyus", status)}
          {console.log("timer>>>", timer)}
          {status == false ? timer <= 0 ? (<div><h1>PRESALE WILL BE START SOON</h1></div>): (<div><h1>PRESALE</h1></div>) : discountTime > 0 ? (<div> <Countdown date={Date.now() + discountTime * 1000} key="discount" renderer={renderer2}  autoStart={true} /></div>) : <div><h1>PRESALE HAS BEEN STARTED</h1></div>}
         {/* {status === false && loading==1 && timer > 0 ? (<div>PRESALE STARTS IN: {minutes}:{seconds}</div>) :  status == true &&
          loading1 ==1 &&
         discountTime > 0 ?(<div>
          <Countdown date={Date.now() + discountTime * 1000}  renderer={renderer2}  autoStart={true} />
          {console.log("Timee>>", Timeee)}
            </div>): null } */}

          
      
        </div>
      </div>
    </div>
  );
}

export default Header;
