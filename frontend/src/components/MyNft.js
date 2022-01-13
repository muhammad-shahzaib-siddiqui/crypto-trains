function MyNft(props){
    return (
        <div className="col-lg-3 col-md-6 col-sm-6 position-relative">
                        <div>
                            <div className="nft">
                        <div className="tag-top">
                            <h6>x{props.qty}</h6>
                        </div>
                        <img className="nft-box" src={props.image} alt="" />
                        <div className="text-section">
                            <div className="tag-section">
                                <h5>{props.name}</h5>
                                <div className="tag">
                                    <h6>{props.category}</h6>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                        </div>
               </div> 
    )
}
export default MyNft;