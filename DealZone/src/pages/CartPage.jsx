import CartItem from '../components/CartItem';


const CartPage = () => {
    return (
        <div>
            <h1>Cart</h1>
            <CartItem />
            {/* Add more CartItem components as needed */}
            <button>Buy</button>
            <button>Delete All</button>
        </div>
    );
};

export default CartPage;
