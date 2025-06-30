import React, { useState } from "react";
import { Button, Box, Modal, TextField, Typography } from "@mui/material";
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

function AddHousehold() {
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState({
		family_name: "",
		location: "",
	});

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setFormData({ family_name: "", location: "" });
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
			const payload = {
				...formData,
				members: [], // Add this line
			};
			const response = await api.post("/api/households/", payload);
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
				Add Household
			</Button>
			<Modal
				open={open}
				onClose={handleClose}>
				<Box sx={style}>
					<Typography
						variant="h6"
						mb={2}>
						Add Household
					</Typography>
					<TextField
						fullWidth
						name="family_name"
						label="Family Name"
						value={formData.family_name}
						onChange={handleChange}
						sx={{ mb: 2 }}
					/>
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

export default AddHousehold;
