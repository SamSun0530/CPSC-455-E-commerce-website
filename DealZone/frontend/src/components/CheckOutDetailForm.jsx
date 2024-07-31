import { Link, useNavigate } from 'react-router-dom';
import {
    TextField, Select, MenuItem, InputLabel, FormControl, Grid, Typography,
    Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartAsync, purchaseCartAsync } from '../thunks/cartThunk';
import { clearAPIStatus } from '../slices/cart';


export default function CheckOutDetailForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const blankState = {
        firstname: "", lastname: "", email: "", street: "", city: "",
        state_province: "", country: "", postal_code: "", card_number: "", cvc: "",
        month: "", year: "", card_postal_code: ""
    };
    const cartItems = useSelector(state => state.cart.items);
    const purchaseStatus = useSelector(state => state.cart.purchaseStatus);
    const [formData, setFormData] = useState(blankState);
    const [shippingExpanded, setShippingExpanded] = useState(true);
    const [paymentExpanded, setPaymentExpanded] = useState(false);

    const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
    const tax = parseFloat((subtotal * 0.12).toFixed(2));
    const total =  subtotal + tax;

    useEffect(() => {
        dispatch(clearAPIStatus());
        console.log('fetching cart');
        dispatch(getCartAsync());
    }, []);

    useEffect(() => {
        if (purchaseStatus == 'success') {
            dispatch(clearAPIStatus());
            navigate('/purchased');
        }
    }, [purchaseStatus]);

    const handleFormInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'card_number') {
            const cleanedValue = value.replace(/\D/g, '');

            const formattedValues = cleanedValue.slice(0, 16).match(/.{1,4}/g);
            let formattedValue
            if (formattedValues) {
                formattedValue = formattedValues.join('-');
            } else {
                formattedValue = '';
            }

            setFormData((prevFormData) => ({ ...prevFormData, [name]: formattedValue }));
        } else {
            setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        }
    };

    const handlePurchase = (event) => {
        const form = document.getElementById('checkout-form');
        if (form.checkValidity()) {
            console.log(formData);
            dispatch(purchaseCartAsync({cart: cartItems, details: formData}));
        } else {
            const invalidElements = form.querySelectorAll(':invalid');
            if (invalidElements.length > 0) {
                const firstInvalidElement = invalidElements[0];
                const lastInvalidElement = invalidElements[invalidElements.length - 1];
                if (['firstname', 'lastname', 'email', 'street', 'city', 'state_province', 'country', 'postal_code'].includes(firstInvalidElement.getAttribute('name'))) {
                    setShippingExpanded(true);
                } else {
                    setPaymentExpanded(true);
                }
                if (['card_number', 'cvc', 'month', 'year', 'card_postal_code'].includes(lastInvalidElement.getAttribute('name'))) {
                    setPaymentExpanded(true);
                }
            }
            setTimeout(() => {
                form.reportValidity();
            }, 300);
        }
    }

    const handleCartItemClick = (listing_id) => {
        navigate(`/listings/${listing_id}`);
    }

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        if (panel === 'shipping') {
            setShippingExpanded(shippingExpanded ? false : true);
        } else {
            setPaymentExpanded(paymentExpanded ? false : true);
        }
    };

    return (
        <>
            <div className='checkout-container'>
                <div className='checkout-info'>
                    <form id='checkout-form'>
                        <Accordion expanded={shippingExpanded} onChange={handleAccordionChange('shipping')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="shipping-content"
                                id="shipping-header"
                            >
                                <Typography variant="h6">Shipping Information</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="firstname"
                                            name="firstname"
                                            label="First Name"
                                            fullWidth
                                            autoComplete="given-name"
                                            onChange={handleFormInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="lastname"
                                            name="lastname"
                                            label="Last Name"
                                            fullWidth
                                            autoComplete="family-name"
                                            onChange={handleFormInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            id="email"
                                            name="email"
                                            label="Email"
                                            fullWidth
                                            autoComplete="email"
                                            onChange={handleFormInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            id="address"
                                            name="street"
                                            label="Street Address"
                                            fullWidth
                                            autoComplete="street-address"
                                            onChange={handleFormInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="city"
                                            name="city"
                                            label="City"
                                            fullWidth
                                            autoComplete="address-level2"
                                            onChange={handleFormInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="state_province"
                                            name="state_province"
                                            label="State/Province"
                                            fullWidth
                                            autoComplete="address-level1"
                                            onChange={handleFormInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="country-label">Country</InputLabel>
                                            <Select
                                                required
                                                labelId="country-label"
                                                id="country"
                                                name="country"
                                                defaultValue=""
                                                label="Country"
                                                autoComplete="country-name"
                                                onChange={handleFormInputChange}
                                            >
                                                <MenuItem value="">
                                                    <em>Select a Country</em>
                                                </MenuItem>
                                                <MenuItem value="canada">Canada</MenuItem>
                                                <MenuItem value="us">United States</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="postal_code"
                                            name="postal_code"
                                            label="Postal Code"
                                            fullWidth
                                            autoComplete="postal-code"
                                            onChange={handleFormInputChange}
                                        />
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion style={{ marginTop: '2rem' }} expanded={paymentExpanded} onChange={handleAccordionChange('payment')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="payment-content"
                                id="payment-header"
                            >
                                <Typography variant="h6">Payment Information</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={9}>
                                        <TextField
                                            required
                                            id="card_number"
                                            name="card_number"
                                            label="Card Number"
                                            value={formData.card_number}
                                            fullWidth
                                            // autoComplete='cc-number'
                                            onChange={handleFormInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            required
                                            id="cvc"
                                            name="cvc"
                                            label="CVC"
                                            fullWidth
                                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                            // autoComplete='cc-csc'
                                            onChange={handleFormInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            required
                                            id="month"
                                            name="month"
                                            label="Month"
                                            fullWidth
                                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                            // autoComplete='cc-exp-month'
                                            onChange={handleFormInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            required
                                            id="year"
                                            name="year"
                                            label="Year"
                                            fullWidth
                                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                            // autoComplete='cc-exp-year'
                                            onChange={handleFormInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            required
                                            id="card_postal_code"
                                            name="card_postal_code"
                                            label="Postal Code"
                                            fullWidth
                                            autoComplete='postal-code'
                                            onChange={handleFormInputChange}
                                        />
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </form>
                </div>
                <div className='cart-total'>
                    <h3>Cart Total</h3>
                    <ul>
                        {cartItems.map(item => (
                            <li key={item._id}>
                                <p className='item_title' onClick={() => handleCartItemClick(item._id)}>{item.title}</p>
                                <p className='price'>${item.price}</p>
                            </li>
                        ))}
                        <li id='subtotal'>
                            <p><b>Subtotal</b></p>
                            <p><b>${subtotal}</b></p>
                        </li>
                        <li>
                            <p>Tax (12%)</p>
                            <p>${tax}</p>
                        </li>
                        <li>
                            <p><b>Total</b></p>
                            <p><b>${total}</b></p>
                        </li>

                    </ul>
                    <button id='checkoutButton' className="button" type="submit" onClick={handlePurchase}>Purchase</button>
                    <Link to='/cart'><button id='cancelCheckoutButton' className="button" type="submit">Cancel</button></Link>
                    {purchaseStatus && purchaseStatus !== 'success' && <p className="p-error">{purchaseStatus}</p>}
                </div>
            </div>
        </>
    );
}