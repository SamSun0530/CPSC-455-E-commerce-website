import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import NavDropdown from 'react-bootstrap/NavDropdown';
import { PersonLinesFill, Cart } from 'react-bootstrap-icons';
import { logOut } from '../slices/auth';

const Navbar = () => {
    const dispatch = useDispatch();

    const isLoggedIn = useSelector((state) => {
        return state.auth.isLoggedIn;
    });

    const handleLogOut = () => {
        dispatch(logOut());
    }

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
                    <NavDropdown.Item as={Link} to="/wishlist">
                        Wishlist
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/createListing">
                        Add a listing
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogOut}>Log Out</NavDropdown.Item>
                </NavDropdown>}
            </div>

        </nav>
    );
};

export default Navbar;
