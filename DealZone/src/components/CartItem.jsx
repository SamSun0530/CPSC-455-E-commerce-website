import { IndividualListingPage } from "../pages/IndividualListingPage";
import { Link } from "react-router-dom";

const CartItem = () => {
    return (
        <div className="member-card">
            <img src="https://via.placeholder.com/100" alt="Item" />
            <div>
                <h2>Item Name</h2>
                <p>
                    <Link to="/listings/test-product">Go to product</Link>  {/*TODO: Link to={`/listings/${product.id}`} */}
                </p>
                <button className="delete-button">Delete</button>
                <button className="view-details-button">Move to Wishlist</button>
            </div>

        </div>
    );
};

export default CartItem;
