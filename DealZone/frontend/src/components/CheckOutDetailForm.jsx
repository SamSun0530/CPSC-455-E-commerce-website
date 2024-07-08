import { Link } from 'react-router-dom';
import {
    TextField, Select, MenuItem, InputLabel, FormControl, Grid, Typography,
    Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function CheckOutDetailForm() {

    return (
        <>
            <div className='checkout-container'>
                <div className='checkout-info'>
                    <form>
                        <Accordion defaultExpanded>
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
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="country-label">Country</InputLabel>
                                            <Select
                                                labelId="country-label"
                                                id="country"
                                                name="country"
                                                defaultValue=""
                                                label="Country"
                                                autoComplete="country-name"
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
                                        />
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion style={{ marginTop: '2rem' }}>
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
                                            fullWidth
                                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                            // autoComplete='cc-number'
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
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            required
                                            id="month"
                                            name="month"
                                            label="Month"
                                            fullWidth
                                            // autoComplete='cc-exp-month'
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            required
                                            id="year"
                                            name="year"
                                            label="Year"
                                            fullWidth
                                            // autoComplete='cc-exp-year'
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
                        <li>
                            <p>Product 1</p>
                            <p className='price'>$40</p>
                        </li>
                        <li>
                            <p>Product 2</p>
                            <p className='price'>$90</p>
                        </li>
                        <li>
                            <p>Tax</p>
                            <p className='price'>$10</p>
                        </li>
                        <li>
                            <p>Total</p>
                            <p className='price'>$140</p>
                        </li>

                    </ul>
                    <button id='checkoutButton' className="button" type="submit">Purchase</button>
                    <Link to='/cart'><button id='cancelCheckoutButton' className="button" type="submit">Cancel</button></Link>
                </div>
            </div>
        </>
    );
}