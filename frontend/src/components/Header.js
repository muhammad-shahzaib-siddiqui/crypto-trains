import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { connectWallet } from "../utils/connectWallet";
import logo from "../assets/img/logo.png";
import metamask from "../assets/img/metamask.png";
import { Link } from "react-router-dom";

function Header(props) {
  const { active, activate } = useWeb3React();


 

  
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
      </div>
    </div>
  );
}

export default Header;
