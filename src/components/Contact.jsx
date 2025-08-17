import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");
	const [status, setStatus] = useState("");
	const [submitting, setSubmitting] = useState(false);

	const validateEmail = (value) => {
		return /[^\s@]+@[^\s@]+\.[^\s@]+/.test(value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!name || !email || !message) {
			setStatus("Please fill in all required fields.");
			return;
		}
		if (!validateEmail(email)) {
			setStatus("Please enter a valid email address.");
			return;
		}
		try {
			setSubmitting(true);
			// Placeholder: integrate with your backend/email service here.
			await new Promise((resolve) => setTimeout(resolve, 800));
			setStatus("Thanks! Your message has been sent.");
			setName("");
			setEmail("");
			setSubject("");
			setMessage("");
		} catch (err) {
			setStatus("Something went wrong. Please try again later.");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="contact-wrapper">
			<div className="contact-card">
				<h2 className="contact-title">Contact Us</h2>
				<p className="contact-subtitle">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
				<form className="contact-form" onSubmit={handleSubmit}>
					<div className="row">
						<div className="field">
							<label htmlFor="name">Name</label>
							<input id="name" type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
						</div>
						<div className="field">
							<label htmlFor="email">Email</label>
							<input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
						</div>
					</div>
					<div className="field">
						<label htmlFor="subject">Subject <span className="muted">(optional)</span></label>
						<input id="subject" type="text" placeholder="How can we help?" value={subject} onChange={(e) => setSubject(e.target.value)} />
					</div>
					<div className="field">
						<label htmlFor="message">Message</label>
						<textarea id="message" rows="5" placeholder="Write your message..." value={message} onChange={(e) => setMessage(e.target.value)} />
					</div>
					<button className="contact-submit" type="submit" disabled={submitting}>{submitting ? "Sending..." : "Send message"}</button>
					{status && <div className="contact-status">{status}</div>}
				</form>
			</div>
		</div>
	);
};

export default Contact;


