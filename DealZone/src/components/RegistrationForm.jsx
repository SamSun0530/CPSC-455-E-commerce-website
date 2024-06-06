import { useState } from "react";
import { Link } from "react-router-dom";
// import { useDispatch } from 'react-redux'
// import { nanoid } from '@reduxjs/toolkit'


export default function RegistrationForm() {
	const blankState = { firstName: "", lastName: "", email: "", phone: "", address: "", password: "" };
	const [formData, setFormData] = useState(blankState);
	//   const dispatch = useDispatch();
	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (areTextFieldsValid(formData.firstName, formData.lastName, formData.username, formData.password)) {
			// TODO: Functionality using Redux

			//   dispatch(
			//     registerUser({
			//       id: nanoid(),
			//       firstName: formData.firstName,
			// 	  lastName: formData.lastName,
			//       email: formData.email,
			// 	  phone: formData.phone,
			//       address: formData.address,
			// 	  password: formData.password
			//     })
			//   )
			alert(`Full Name: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nAddress: ${formData.address}\nUsername: ${formData.username}\nPassword: ${formData.password}`); // alert for testing purpose
			setFormData(blankState);
		} else {
			alert("Invalid form inputs detected."); // alert for testing purpose
		}
	};

	const handleInvalidPhoneFormat = (event) => {
		event.target.setCustomValidity("Please enter a 10-11 digit phone number without spacing in between or additional punctuation.");
	}

	const handlePhoneChange = (event) => {
		handleChange(event);
		event.target.setCustomValidity(""); // reset validity message
	};

	return (
		<div className="register-container">
			<form className="register-form" onSubmit={handleSubmit}>
				<h2 id="registerHeading">Welcome to DealZone</h2>

				<label htmlFor="firstName">First Name *</label>
				<input className="input" type="text" id="firstName" name="firstName" required value={formData.firstName} onChange={handleChange} />

				<label htmlFor="lastName">Last Name *</label>
				<input className="input" type="text" id="lastName" name="lastName" required value={formData.lastName} onChange={handleChange} />

				<label htmlFor="email">Email *</label>
				<input className="input" type="email" id="email" name="email" required value={formData.email} onChange={handleChange} />

				<label htmlFor="phone">Phone Number</label>
				<input className="input" type="text" id="phone" name="phone" placeholder="No spaces in between or punctuation permitted" pattern=" *\d{10,11} *" onInvalid={handleInvalidPhoneFormat} value={formData.phone} onChange={handlePhoneChange} />

				<label htmlFor="address">Address</label>
				<input className="input" type="text" id="address" name="address" value={formData.address} onChange={handleChange} />

				<label htmlFor="password">Password *</label>
				<input className="input" type="password" id="password" name="password" required value={formData.password} onChange={handleChange} />

				<button className="register-button" type="submit">Register</button>
				<label className="required-field">* Required fields</label>
				<p><Link to="/login">Login</Link> with existing account or continue as <Link to="/">Guest</Link>.</p>
				<p></p>
			</form>
		</div>
	);
}

function areTextFieldsValid(firstName, lastName, username, password) {
	return !(firstName.trim().length === 0 || lastName.trim().length === 0 || password.trim().length === 0);
}