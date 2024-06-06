import Navbar from '../components/Navbar'
import '../css/IndividualListingPage.css'

export const IndividualListingPage = () => {
    return (
        <>
		<Navbar/>
            <div className="product-container">
                <div className="product-image-container">
                    <img src="https://via.placeholder.com/400" alt="Item" />
                </div>
                <div className="product-details-container">
                    <h2 className='product-title'>Product Name</h2>
                    <h3 className="product-price">Product Price</h3>
                    <p className="product-description">Product description</p>
                    <p className="product-stock">Quantity Left</p>
                    <button className='view-details-button'>Add to Wishlist</button>
                    <button className='view-details-button'>Add to Cart</button>
                </div>
            </div>
        </>
    )
}
