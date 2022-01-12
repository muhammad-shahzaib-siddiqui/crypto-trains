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
  const [endTimer, setEndTimer]= useState(0)
  
  const [loading1, setLoading1] = useState(0);
  const [condition, setCondition] = useState(0);
  const [status, setStatus] = useState();
const [shortAddress,setShortAddress] = useState()

const [hourss,setHours] = useState()
const [dayss, setDays] = useState()
const [minutess, setMinutes] = useState()
const [secondss, setSeconds] = useState()

const [discountHourss,setDiscountEndHours] = useState()
const [discountDayss, setDiscountEndDays] = useState()
const [discountMinutess, setDiscountEndMinutes] = useState()
const [discountSecondss, setDiscountEndSeconds] = useState()

const [endHourss,setEndHours] = useState()
const [endDayss, seEndDays] = useState()
const [endMinutess, setEndMinutes] = useState()
const [endSecondss, setEndSeconds] = useState()


  // For Start Presale Time
    var days = Math.floor(timer / (3600*24))
    var hours = Math.floor(timer % (3600*24) / 3600);
    var minutes = Math.floor(timer % 3600 / 60);
    var seconds = Math.floor(timer % 60); 



    // For Sale End Time
    var dateNow =  new Date()
    let secondsDiff = (endTimer - (dateNow/1000))
    var _days = Math.floor(secondsDiff/84600)-1 ;
    var endDays = parseInt(_days)
    console.log("endTimer>>>", endTimer)
    var endHours = Math.floor(secondsDiff % (3600*24) / 3600);//(3600*24) / 3600)
    var endMinutes = Math.floor(endTimer % 3600 / 60);
    var endSeconds = Math.floor(endTimer % 60); 

    // var endDays = Math.floor(endTimer / (3600*24))
    // var endHours = Math.floor(endTimer % (3600*24) / 3600);
    // var endMinutes = Math.floor(endTimer % 3600 / 60);
    // var endSeconds = Math.floor(endTimer % 60); 

        // For Discount Time

        var dateNow =  new Date()
        let discountDiff = (discountTime - (dateNow/1000))
        var discount = Math.floor(discountDiff/84600)-1 ;
        var discountDays = parseInt(discount)
        var discountHours = Math.floor(discountTime % (3600*24) / 3600);//(3600*24) / 3600)
        var discountMinutes = Math.floor(discountTime % 3600 / 60);
        var discountSeconds = Math.floor(discountTime % 60); 
        console.log("days>>>", discountTime.toString())




    
    console.log("condition", condition);
    // console.log("minutes", minutes);
    // console.log("seconds", seconds);

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
        // console.log("disssss");

        setTimer(startime.toString());
      }
      // console.log("timeStatus", status);
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
        // console.log("disssss");
         setDiscountTime(startDiscountTime);
         setLoading1(1)
      }
      
      // console.log("DiscounttimeStatus", status);
      setLoading(1);

    } catch (e) {
      console.log("data", e);
    }
  };

  const endTime = async () => {
    try{
      let signer = await loadProvider();
      let NFTCrowdsaleContract = new ethers.Contract(
        nftPreSale_addr,
        NFTCrowdsale,
        signer
      );
      let getTimeStatusCount = await NFTCrowdsaleContract.getTimeStatusCount()
      // setCondition(getTimeStatusCount.toString())
      // console.log(getTimeStatusCount.toString())
      let endTime = await NFTCrowdsaleContract.endTime()
      setEndTimer(endTime.toString())
      
    }
    catch(error){
      console.log("error", error);
    }
  }





  useEffect(() => {
    (async () => {
      if (account) {
        try {
          startSaleTime();
          limitationTime();
          endTime();
          let len = account.length 
          let short = account.slice(0, 4)+"..." + account.slice(len-5, len-1)
          setShortAddress(short);
          
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [account, status, condition]);


  useEffect(() => {
    if (!timer) return;
    
    setDays(days)
    setHours(hours)
  setMinutes(minutes)
  setSeconds(seconds)
  if(timer > 0){
    const intervalId = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }
    
  }, [timer]);


useEffect(() => {
  if (!discountTime) return;
  
  else{
    setDiscountEndDays(discountDays)
    setDiscountEndHours(discountHours)
    setDiscountEndMinutes(discountMinutes)
    setDiscountEndSeconds(discountSeconds)
  }
  if(discountTime > 0) {
    const intervalId = setInterval(() => {
      setEndTimer(discountTime - 1);
    }, 1000);
  
  return () => clearInterval(intervalId);
  }
}, [discountTime]);

useEffect(() => {
  if (!endTimer) return;
 
  else{
    seEndDays(endDays)
  setEndHours(endHours)
setEndMinutes(endMinutes)
setEndSeconds(endSeconds)
  }
  if(endTimer > 0){
    const intervalId = setInterval(() => {
      setEndTimer(endTimer - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }

}, [endTimer]);

// console.log("discount", discountTime.toString())


// console.log("endTime", endTimer)




  // console.log("discount", discountTime);



 


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
      } 
      else if(completed == true){
        return <h1>dd</h1>
      }
      
    }

  // console.log("is active check = ", active);
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
          {console.log("status", status)}
          {console.log("timer>>>", timer)} 
          {status == false && discountTime <= 0 ? timer <= 0 ? (<div><h1>PRESALE WILL BE START SOON</h1></div>):  (<div><h1>PRESALE STARTS IN {dayss} DAYS {hourss} HOURS {minutess} MINUTES {secondss} SECONDS</h1></div>) : status == true && discountTime > 0 ? (<div><h1>DISCOUNT ENDS IN {discountDayss} DAYS {discountHourss} HOURS {discountMinutess} MINUTES {discountSecondss} SECONDS</h1></div>) : 
            timer<=0 && discountTime<=0 && endTimer>timer && endTimer>discountTime ? (<div><h1>SALE ENDS IN {endDayss} DAYS {endHourss} HOURS {endMinutess} MINUTES {endSecondss} SECONDS</h1></div>): (<div><h1>SALE HAS BEEN STARTED</h1></div>)  }
{/* {status == false && discountTime <= 0 ? timer <= 0 ? (<div><h1>PRESALE WILL BE START SOON</h1></div>):  (<div><h1>PRESALE STARTS IN {dayss} dAYS {hourss} HOURS {minutess} MINUTES {secondss} SECONDS</h1></div>) : status == true && discountTime > 0 && timer <= 0 ? (<div> <Countdown date={Date.now() + discountTime * 1000} key="discount" renderer={renderer2}  autoStart={true} /></div>) : null}
            {status == true && discountTime <= 0 && timer <= 0 && endTimer > 0 ? (<div><h1>SALE ENDS IN {endDayss} DAYS {endHourss} HOURS {endMinutess} MINUTES {endSecondss} SECONDS</h1></div>):  (<div><h1>PRESALE HAS BEEN STARTED</h1></div>)}  */}
      
        </div>
      </div>
    </div>
  );
}

export default Header;