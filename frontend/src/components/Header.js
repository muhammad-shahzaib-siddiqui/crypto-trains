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

const [hourss,setHours] = useState()
const [dayss, setDays] = useState()
const [minutess, setMinutes] = useState()
const [secondss, setSeconds] = useState()


  var days = Math.floor(timer / (3600*24))
    var hours = Math.floor(timer % (3600*24) / 3600);
    var minutes = Math.floor(timer % 3600 / 60);
    var seconds = Math.floor(timer % 60); 
    
    console.log("days", days);
    console.log("hours", hours);
    console.log("minutes", minutes);
    console.log("seconds", seconds);

  // console.log("Timeee", Timeee)

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
      if (status == false) {
        console.log("disssss");

        setTimer(startime.toNumber());
      }
      console.log("timeStatus", status);
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


  useEffect(() => {
    // exit early when we reach 0
    if (!timer) return;
    setDays(days)
    setHours(hours)
  setMinutes(minutes)
  setSeconds(seconds)
    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timer]);

// let Timeee = discountTime






  console.log("discount", discountTime);



 


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
          {status == false && discountTime <= 0 ? timer <= 0 ? (<div><h1>PRESALE WILL BE START SOON</h1></div>):  (<div><h1>PRESALE STARTS IN {dayss} dAYS {hourss} HOURS {minutess} MINUTES {secondss} SECONDS</h1></div>) : status == true && discountTime > 0 ? (<div> <Countdown date={Date.now() + discountTime * 1000} key="discount" renderer={renderer2}  autoStart={true} /></div>) : <div><h1>PRESALE HAS BEEN STARTED</h1></div>}
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
