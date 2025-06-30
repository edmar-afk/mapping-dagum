import React, { useState } from "react";
import { Button, Box, Modal, TextField, Typography, MenuItem } from "@mui/material";
import api from "../../assets/api";

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

function AddPwd() {
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState({
		people: "",
		age: "",
		gender: "",
		location: "",
	});

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setFormData({ people: "", age: "", gender: "", location: "" });
		setOpen(false);
	};

	const handleChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async () => {
		try {
			const response = await api.post("/api/pwds/", formData);
			console.log("Added:", response.data);
			handleClose();
		} catch (error) {
			console.error("Add failed:", error);
		}
	};

	return (
		<>
			<Button
				variant="contained"
				onClick={handleOpen}>
				Add PWD
			</Button>
			<Modal
				open={open}
				onClose={handleClose}>
				<Box sx={style}>
					<Typography
						variant="h6"
						mb={2}>
						Add PWD
					</Typography>
					<TextField
						fullWidth
						name="people"
						label="Full Name"
						value={formData.people}
						onChange={handleChange}
						sx={{ mb: 2 }}
					/>
					<TextField
						fullWidth
						name="age"
						label="Age"
						type="number"
						value={formData.age}
						onChange={handleChange}
						sx={{ mb: 2 }}
					/>
					<TextField
						fullWidth
						select
						name="gender"
						label="Gender"
						value={formData.gender}
						onChange={handleChange}
						sx={{ mb: 2 }}>
						<MenuItem value="Male">Male</MenuItem>
						<MenuItem value="Female">Female</MenuItem>
					</TextField>
					<TextField
						fullWidth
						name="location"
						label="Location"
						value={formData.location}
						onChange={handleChange}
						sx={{ mb: 2 }}
					/>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						onClick={handleSubmit}>
						Submit
					</Button>
				</Box>
			</Modal>
		</>
	);
}

export default AddPwd;
