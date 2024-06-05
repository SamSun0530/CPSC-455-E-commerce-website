import { useState } from "react";
// import { useDispatch } from 'react-redux'
// import { nanoid } from '@reduxjs/toolkit'


export default function RegistrationForm() {
	const blankState = { firstName: "", lastName: "", email: "", phone: "", address: "", username: "", password: "" };
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
			// 	  username: formData.username,
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
		<form onSubmit={handleSubmit}>
			<p>
				<label htmlFor="firstName">First Name:</label>
				<input type="text" id="firstName" name="firstName" required placeholder="Required" value={formData.firstName} onChange={handleChange} />
			</p>
			<p>
				<label htmlFor="lastName">Last Name:</label>
				<input type="text" id="lastName" name="lastName" required placeholder="Required" value={formData.lastName} onChange={handleChange} />
			</p>
			<p>
				<label htmlFor="email">Email:</label>
				<input type="email" id="email" name="email" required placeholder="Required" value={formData.email} onChange={handleChange} />
			</p>
			<p>
				<label htmlFor="phone">Phone Number:</label>
				<input type="text" id="phone" name="phone" placeholder="Optional" pattern=" *\d{10,11} *" onInvalid={handleInvalidPhoneFormat} value={formData.phone} onChange={handlePhoneChange} />
			</p>
			<p>
				<label htmlFor="address">Address:</label>
				<input type="text" id="address" name="address" placeholder="Optional" value={formData.address} onChange={handleChange} />
			</p>
			<p>
				<label htmlFor="username">Username:</label>
				<input type="text" id="username" name="username" required placeholder="Required" value={formData.username} onChange={handleChange} />
			</p>
			<p>
				<label htmlFor="password">Password:</label>
				<input type="password" id="password" name="password" required placeholder="Required" value={formData.password} onChange={handleChange} />
			</p>
			<p>
				<button type="submit">Register</button>
			</p>
		</form>
	);
}

function areTextFieldsValid(firstName, lastName, username, password) {
	return !(firstName.trim().length === 0 || lastName.trim().length === 0 || username.trim().length === 0 || password.trim().length === 0);
}