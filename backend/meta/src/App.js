import React, { Component } from 'react';
import './App.css';
import { DATA } from './attribute_data';
import { saveAs } from 'file-saver';

const ipfsClient = require('ipfs-http-client');

const ipfs = ipfsClient.create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
// let meta = {
// 	name:MOON BOYS,
// 	token_id:counter,
// 	description:'',
// 	image:image link,
// 	attributes:[
// 		{

// 		}
// 	],
// 	rarerity:points
// }
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			buffer: [],
			cid: [],
			account: '',
			taskCount: 0,
			tasks: [],
			meta: [],
			JSONfile: '',
			loopStart: 1
		};
		// saveTextAs("Hi,This,is,a,CSV,File", "test.csv");
	}

	captureFile = (event) => {
		// console.log(this.state.cid.length)
		// this.setState({
		// 	loopStart:this.state.cid.length+1
		// })
		this.setState({
			buffer: []
		});
		event.preventDefault();
		for (let index = 0; index < event.target.files.length; index++) {
			let element = event.target.files[index];
			const file = event.target.files[index];
			const reader = new window.FileReader();
			reader.readAsArrayBuffer(file);
			reader.onloadend = () => {
				this.setState({
					buffer: [ ...this.state.buffer, { file_code: Buffer(reader.result), name: element.name } ]
				});
				// console.log('buffer', Buffer(reader.result));
			};
		}
	};
	onSubmit = async (event) => {
		event.preventDefault();
		// console.log(this.state.buffer);
		// put it on ipfs
		for (let index = 0; index < this.state.buffer.length; index++) {
			let element = this.state.buffer[index];

			const file = await ipfs.add(element.file_code, (error, result) => {
				//here
				console.log('IpfsResult', result);
				if (error) {
					console.error(error);
					return;
				}
			});
			// console.log('IpfsResult', { CID: file.path, name: element.name });

		
			let img_attr = [{
				trait_type: 'Hardness',
				value: "asd" ,
				rare: "asd"
			},
			{
				trait_type: 'Power',
				value: "asd" ,
				rare: "asd"
			},
			{
				trait_type: 'Speed',
				value: "asd" ,
				rare: "asd"
			},];
			// console.log(attr);
			

			

			// console.log(attr);
			// console.log(img_attr);
			// Process File For IPFS

			this.setState({
				cid: [ ...this.state.cid, 'https://ipfs.io/ipfs/' + file.path ],
				meta: [
					...this.state.meta,
					{
						name: 'CRYPTO TRAINS',
						image: 'https://ipfs.io/ipfs/' + file.path,
						description:
							'At least it has wheels.',
						attributes: img_attr,
						rarity: element.name.slice(0, -4).split('-').pop()
					}
				]
			});

			var blob = new Blob(
				[
					JSON.stringify({
						name: 'MOON BOYS',
						image: 'https://ipfs.io/ipfs/' + file.path,
						token_id: Number(index) + Number(this.state.loopStart),
						description:
							'The Moon Boyz is a collection of 11,111 unique ERC-721 tokens living on the Ethereum Blockchain. Unique and 3D designed, each NFT comes with a full membership to an ever-growing community and awesome utilities.',
						attributes: img_attr,
						rarity: element.name.slice(0, -4).split('-').pop()
					})
				],
				{ type: 'text/json;charset=utf-8,' }
			);
			saveAs(blob, Number(index) + Number(this.state.loopStart));
			// console.log(this.state.meta);
			var data = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.state.meta));
			this.setState({ JSONfile: data });
			// console.log(data)
		}
	};
	render() {
		// console.log(DATA[0][1]);
		return (
			<div style={{ padding: 20 }}>
				<nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow container">
					<h1>Create IPFS & s</h1>
				</nav>
				<div className="container mt-5">
					<div className="row">
						<main role="main" className="col-lg-12 d-flex text-center">
							<p> &nbsp;</p>
							<div className="content mr-auto ml-auto">
								<a href="https://www.endureblock.com/" target="_blank" rel="noopener noreferrer">
									{/* <img src={logo} className="App-logo" alt="logo" /> */}
								</a>
								<p> &nbsp;</p>
								<h2>Upload File</h2>
								<p> &nbsp;</p>
								<input
									type="number"
									onInput={(e) => this.setState({ loopStart: e.target.value })}
									value={this.state.loopStart}
								/>

								<form onSubmit={this.onSubmit}>
									<input type="file" onChange={this.captureFile} multiple />
									<input type="submit" />
								</form>
								<a href={'data:' + this.state.JSONfile} download="data.json">
									download JSON
								</a>
							</div>
						</main>
					</div>
				</div>
				<div>
					{this.state.cid.length}
					<br />
					{/* <ul>
						{this.state.cid.map((val) => {
							return (
								<li>
									<a target="_blank" href={val}>
										{val}
									</a>
								</li>
							);
						})}
					</ul> */}
				</div>
			</div>
		);
	}
}

export default App;
