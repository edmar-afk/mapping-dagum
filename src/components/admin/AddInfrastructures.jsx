import React, { useState } from "react";import { Button, Box, Modal, TextField, Typography, MenuItem } from "@mui/material";
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

function AddInfrastructures() {
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		type: "",
		description: "",
		location: "",
	});
	const [image, setImage] = useState(null);

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setFormData({
			name: "",
			type: "",
			description: "",
			location: "",
		});
		setImage(null);
		setOpen(false);
	};

	const handleChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleImageChange = (e) => {
		setImage(e.target.files[0]);
	};

	const handleSubmit = async () => {
		const infraData = new FormData();
		infraData.append("name", formData.name);
		infraData.append("type", formData.type);
		infraData.append("description", formData.description);
		infraData.append("location", formData.location);
		if (image) {
			infraData.append("image", image);
		}

		try {
			const response = await api.post("/api/infras/create/", infraData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			console.log("Infrastructure added:", response.data);
			handleClose();
		} catch (error) {
			console.error("Add infrastructure failed:", error);
		}
	};

	return (
		<>
			<Button
				variant="contained"
				onClick={handleOpen}>
				Add Infrastructure
			</Button>
			<Modal
				open={open}
				onClose={handleClose}>
				<Box sx={style}>
					<Typography
						variant="h6"
						mb={2}>
						Add Infrastructure
					</Typography>
					<TextField
						fullWidth
						name="name"
						label="Name"
						value={formData.name}
						onChange={handleChange}
						sx={{ mb: 2 }}
					/>
					<TextField
						fullWidth
						name="type"
						label="Type"
						value={formData.type}
						onChange={handleChange}
						sx={{ mb: 2 }}
					/>
					<TextField
						fullWidth
						multiline
						rows={3}
						name="description"
						label="Description"
						value={formData.description}
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
					<input
						type="file"
						accept="image/png, image/jpeg, image/jpg"
						onChange={handleImageChange}
						style={{ marginBottom: "16px" }}
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

export default AddInfrastructures;
