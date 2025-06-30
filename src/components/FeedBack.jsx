import React, { useState } from "react";
import { Modal, Box, Button, Typography, TextField } from "@mui/material";
import api from "../assets/api";
import Swal from "sweetalert2";
import Login from "./admin/Login";
const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	borderRadius: 2,
	boxShadow: 24,
	p: 4,
};

function FeedBack() {
	const [open, setOpen] = useState(false);
	const [name, setName] = useState("");
	const [feedback, setFeedback] = useState("");

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await api.post("/api/feedback/submit/", { name, feedback });
			setName("");
			setFeedback("");
			handleClose(); // ✅ close modal first
		} catch (err) {
			handleClose(); // ✅ close modal first
			console.error(err);
		}
	};

	return (
		<>
			<div className="flex flex-row fixed top-8 right-8 z-[9999]">
				<Login />
				<Button
					variant="contained"
					color="secondary"
					onClick={handleOpen}
					sx={{ ml: 2 }}>
					Send Feedback
				</Button>
			</div>
			<Modal
				open={open}
				onClose={handleClose}>
				<Box sx={style}>
					<form onSubmit={handleSubmit}>
						<TextField
							fullWidth
							label="Your Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							sx={{ mb: 2 }}
						/>
						<TextField
							fullWidth
							label="Your Feedback"
							multiline
							rows={4}
							value={feedback}
							onChange={(e) => setFeedback(e.target.value)}
							required
						/>
						<Button
							type="submit"
							variant="contained"
							sx={{ mt: 2 }}>
							Submit your Feedback
						</Button>
					</form>
				</Box>
			</Modal>
		</>
	);
}

export default FeedBack;
