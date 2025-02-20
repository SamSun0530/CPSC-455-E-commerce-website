import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { registerUserAsync } from "../thunks/auth";
import { clearAPIStatus } from "../slices/auth";


export default function RegistrationForm() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const blankState = { username: "", email: "", phone: "", password: "" };
	const [formData, setFormData] = useState(blankState);
	const authState = useSelector((state) => state.auth);

	useEffect(() => {
		dispatch(clearAPIStatus());
	}, []);

	useEffect(() => {
		if (authState.registerUser === 'FULFILLED') {
			navigate('/login');
			dispatch(clearAPIStatus());
		}
	}, [authState.registerUser]);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (areTextFieldsValid(formData.username, formData.password)) {
			dispatch(registerUserAsync({ username: formData.username, email: formData.email, phone_number: formData.phone_number, password: formData.password }));
			setFormData(blankState);
		} else {
			alert("Invalid form inputs detected.");
		}
	};

	const handleInvalidPhoneFormat = (event) => {
		event.target.setCustomValidity("Please enter a 10-11 digit phone number without spacing in between or additional punctuation.");
	}

	const handlePhoneChange = (event) => {
		handleChange(event);
		event.target.setCustomValidity("");
	};

	return (
		<div className="register-container">
			<form className="register-form" onSubmit={handleSubmit}>
				<h2 id="registerHeading">Welcome to DealZone</h2>

				<label htmlFor="username">Username *</label>
				<input className="input" type="text" id="username" name="username" required value={formData.username} onChange={handleChange} />

				<label htmlFor="email">Email *</label>
				<input className="input" type="email" id="email" name="email" required value={formData.email} onChange={handleChange} />

				<label htmlFor="phone">Phone Number</label>
				<input className="input" type="text" id="phone" name="phone" placeholder="10 - 11 digits" pattern=" *\d{10,11} *" onInvalid={handleInvalidPhoneFormat} value={formData.phone} onChange={handlePhoneChange} />

				<label htmlFor="password">Password *</label>
				<input className="input" type="password" id="password" name="password" required value={formData.password} onChange={handleChange} />
				{authState.registerUser === 'REJECTED' && <p className="p-error">Registration Failed</p>}
				<button className="register-button" type="submit">Register</button>
				<label className="required-field">* Required fields</label>
				<p><Link to="/login">Login</Link> with existing account or continue as <Link to="/">Guest</Link>.</p>
				<p></p>
			</form>
		</div>
	);
}

function areTextFieldsValid(username, password) {
	return !(username.trim().length === 0 || password.trim().length === 0);
}