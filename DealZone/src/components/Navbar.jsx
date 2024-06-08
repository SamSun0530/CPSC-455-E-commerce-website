import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import NavDropdown from 'react-bootstrap/NavDropdown';
import { PersonLinesFill, Cart } from 'react-bootstrap-icons';

const Navbar = () => {

    const isLoggedIn = useSelector((state) => {
        return state.auth.isLoggedIn;
    });
    console.log(isLoggedIn);

    const navBarAccountIcon = (<PersonLinesFill color="white" className="account-menu-icon"/>);
    const cartIcon = (<span><Cart color="white" className="cart-icon"/></span>);

    return (
        <nav>
            <Link className="navbar-brand" to="/">DealZone</Link>
            <div className="navbar-right-div">
                <Link className="navbar-right" to="/cart">{cartIcon}Cart</Link>
                {!isLoggedIn && <Link className="navbar-right" to="/login">Login</Link>}
                {!isLoggedIn && <Link className="navbar-right" to="/register">Sign Up</Link>}
                {isLoggedIn && <NavDropdown title={navBarAccountIcon} className="navbar-right navbar-icon">
                    <NavDropdown.Item as={Link} to="/account">Account</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="">
                        Wishlist
                    </NavDropdown.Item>
                </NavDropdown>}
            </div>

        </nav>
    );
};

export default Navbar;
