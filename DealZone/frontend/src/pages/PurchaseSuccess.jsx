import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import '../css/PurchaseSuccess.css';

export default function PurchaseSuccess() {
    const navigate = useNavigate();
    const continueShopping = () => {
        navigate('/');
    }

    return (
        <>
            <Navbar />
            <div className="purchased-page">
                <div className="purchased-msg">
                    <h2>Purchase Successful</h2>
                    <p>An order confirmation will be emailed to you shortly. (Coming soon)</p>
                    <button className='button' onClick={continueShopping}>Continue Shopping</button>
                </div>
            </div>
        </>
    );
}