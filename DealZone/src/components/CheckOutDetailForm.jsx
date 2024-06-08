import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

export default function CheckOutDetailForm() {

    return (
        <>
            <div className='checkout-container'>
                <div className='checkout-info'>
                    <Form>
                        <h2>Shipping Information</h2>
                        <Form.Group className='form-row'>
                            <Form.Group className='form-column'>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    name="firstname"
                                    placeholder='John'
                                />
                            </Form.Group>
                            <Form.Group className='form-column'>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    name='lastname'
                                    placeholder='Smith'
                                />
                            </Form.Group>
                            <Form.Group className='form-column'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    name='email'
                                    placeholder='123@example.com'
                                    type='email'
                                />
                            </Form.Group>
                        </Form.Group>
                        <Form.Group className='form-row'>
                            <Form.Group className='form-column'>
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    name='street'
                                    placeholder='123 Main St'
                                />
                            </Form.Group>
                            <Form.Group className='form-column'>
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    name='city'
                                    placeholder='Vancouver'
                                />
                            </Form.Group>
                        </Form.Group>
                        <Form.Group className='form-row'>
                            <Form.Group className='form-column'>
                                <Form.Label>State/Province</Form.Label>
                                <Form.Control
                                    name='state_province'
                                    placeholder='BC'
                                />
                            </Form.Group>
                            <Form.Group className='form-column'>
                                <Form.Label>Country</Form.Label>
                                <Form.Select>
                                    <option>Select a Country</option>
                                    <option value="canada">Canada</option>
                                    <option value="us">United States</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className='form-column'>
                                <Form.Label>Postal/Zip Code</Form.Label>
                                <Form.Control
                                    name='postal_code'
                                    placeholder='A1B2C3'
                                />
                            </Form.Group>
                        </Form.Group>
                        <h2>Payment Information</h2>
                        <Form.Group className='form-row'>
                            <Form.Group className='form-column'>
                                <Form.Label>Card Number</Form.Label>
                                <Form.Control
                                    name='card_number'
                                    placeholder='4520-1234-5678-0000'
                                    pattern='[0-9]*'
                                />
                            </Form.Group>
                            <Form.Group className='form-column'>
                                <Form.Label>CVC</Form.Label>
                                <Form.Control
                                    name='cvc'
                                    placeholder='123'
                                />
                            </Form.Group>
                        </Form.Group>
                        <Form.Group className='form-row'>
                            <Form.Group className='form-column'>
                                <Form.Label>Month</Form.Label>
                                <Form.Control
                                    name='month'
                                    placeholder='Dec'
                                />
                            </Form.Group>
                            <Form.Group className='form-column'>
                                <Form.Label>Year</Form.Label>
                                <Form.Control
                                    name='year'
                                    placeholder='2030'
                                />
                            </Form.Group>
                            <Form.Group className='form-column'>
                                <Form.Label>Postal Code</Form.Label>
                                <Form.Control
                                    name='card_postal_code'
                                    placeholder='A1B2C3'
                                />
                            </Form.Group>
                        </Form.Group>
                    </Form>
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