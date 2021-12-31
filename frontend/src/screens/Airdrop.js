import React from 'react';
import logo from '../assets/img/logo.png';
import { Col, Form, Row } from 'react-bootstrap';
import { Button } from 'bootstrap';

const Airdrop = () => {
	return (
		<div>
			
			<div className="top-bar">
				<h1>
					PRESALE STARTS IN: <span id="days" /> DAYS <span id="hours" /> H <span id="minutes" /> Minutes{' '}
					<span id="seconds" /> SEC
				</h1>
			</div>
			<h1 className="green-head">You are WHITELISTED</h1>
            <div className="container-fluid">
            <Row>
                <Col lg={5} className='m-auto'>
			<div className='custom-form'>
                <h1 className='text-white'>Pre-Sale</h1>
                <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Whitelist Addresses</Form.Label>
                <Form.Control type="text" placeholder="Whitelist Addresses" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Start Time</Form.Label>
                <Form.Control type="text" placeholder="Start Time" />
            </Form.Group>
            <button class="custom-btn btn-white">Submit</button>
            </Form>
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
                <Form.Control type="text" placeholder="Whitelist Addresses" />
            </Form.Group>

            
            <button class="custom-btn btn-white">Submit</button>
            </Form>
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
