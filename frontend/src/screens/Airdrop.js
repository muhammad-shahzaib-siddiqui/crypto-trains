import React, { useEffect, useState } from 'react'
import logo from '../assets/img/logo.png';
import { Col, Form, Row } from 'react-bootstrap';
import { Button } from 'bootstrap';

import { ethers,BigNumber } from 'ethers'
import {nft_addr, nftPreSale_addr} from "../contract/addresses"
import NFT from "../contract/NFT.json";
import NFTCrowdsale from "../contract/NFTCrowdsale.json"
import Web3Modal from 'web3modal'
import { useWeb3React } from "@web3-react/core";
import {generate} from "../components/metadata";

const Airdrop = () => {

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

 

    const [addr, setAddr] = useState([])
    const [startTime, setStartTime] = useState()
    const [select, setSelect] = useState()
    const [airdropAddr, setAirdropAddr] = useState()
    console.log(addr)

    const typeSelect = parseInt(select)
    console.log("select", typeSelect)

	const loadProvider = async () => {
        try{
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            return provider.getSigner();
        }
        catch(e){
            console.log("loadProvider: ", e)
        }
    }

    
	const startSale = async () => {
        try {
            
            let signer = await loadProvider()
            let NFTCrowdsaleContract = new ethers.Contract(nftPreSale_addr, NFTCrowdsale, signer);
			console.log("account", account)
            let startSale = await NFTCrowdsaleContract.startSale([addr], nft_addr, startTime)
            let tx = await startSale.wait()
              
            console.log("startSale", startSale)
        } catch (e) {
            console.log("data", e)
        }
    }

    

    const airDrop = async () => {
        try {
            
            let signer = await loadProvider()
            let NFTContract = new ethers.Contract(nft_addr, NFT, signer);
            let meta = generate(typeSelect)
            // let acc = ethers.utils.getAddress( addr )
            console.log("meta", meta)

            let drop = await NFTContract.AirDrop(meta, airdropAddr, typeSelect)
            let tx = await drop.wait()
              
            // console.log("startSale", drop)
        } catch (e) {
            console.log("data", e)
        }
    }
    

	

	useEffect(() => {
        (async () => {
            if (account) {
                try {
                   
                } catch (error) {
                    console.log(error)
                }
            }
        })()
    }, [account]);


	return (
		<div>
			
            <div className="container-fluid">
            <Row>
                <Col lg={5} className='m-auto'>
			<div className='custom-form'>
                <h1 className='text-white'>Pre-Sale</h1>
                <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Whitelist Addresses</Form.Label>
                <Form.Control type="text" placeholder="Whitelist Addresses"  onChange={(e)=>setAddr(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Start Time</Form.Label>
                <Form.Control type="number" placeholder="Start Time"  onChange={(e) => setStartTime(e.target.value)} />
            </Form.Group>
            
            </Form>
			<button onClick={startSale} >Submit</button>
            </div>
                </Col>
            </Row>

            </div>

			<div className="container-fluid">
            <Row>
                <Col lg={5} className='m-auto'>
			<div className='custom-form'>
                <h1 className='text-white'>Air-Drop</h1>
                <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Whitelist Addresses</Form.Label>
                <Form.Control type="text" placeholder="Whitelist Addresses" onChange={(e) => setAirdropAddr(e.target.value)} />
            </Form.Group>
          
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Select Type</Form.Label>
                <Form.Select aria-label="Default select example" onChange={(e) => setSelect(e.target.value)}>
                <option>Select Type</option>
                <option value="0">GOODS TRAIN</option>
                <option value="1">VILLAGE TRAIN</option>
                <option value="2">CITY TRAIN</option>
                <option value="3">HIGH-SPEED TRAIN</option>
                <option value="4">GOODS STATION</option>
                <option value="5">CITY STATION</option>
                <option value="6">HIGH-SPEED-STATION</option>
                </Form.Select>
            </Form.Group>

            
            
            </Form>
            <button  onClick={airDrop} >Submit</button>
            </div>
                </Col>
            </Row>

            </div>
			<div
				className="modal fade custom-modal"
				id="exampleModal"
				tabindex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-lg modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header">
							<h3 className="modal-title" id="exampleModalLabel">
								CONGRATULATIONS! YOU HAVE PURCHASED YOUR NFT
							</h3>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
						</div>
						<div className="modal-body">
							<h1>You can buy 5 NFT per WALLET!</h1>
							<h1>1/5 NFT</h1>
							<div className="d-flex justify-content-center">
								<a className="custom-btn btn-white" data-bs-dismiss="modal" aria-label="Close">
									KEEP BUYING
								</a>
								<a className="custom-btn btn-white" data-bs-dismiss="modal" aria-label="Close">
									VIEW MY NFTS
								</a>
							</div>
						</div>
						<div className="modal-footer" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Airdrop;
