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

function AddMembers() {
	const [open, setOpen] = useState(false);
	const [households, setHouseholds] = useState([]);
	const [formData, setFormData] = useState({
		name: "",
		age: "",
		role: "",
		household: "",
	});

	const fetchHouseholds = async () => {
		try {
			const res = await api.get("/api/households/");
			setHouseholds(res.data);
		} catch (err) {
			console.error("Failed to fetch households:", err);
		}
	};

	const handleOpen = () => {
		fetchHouseholds();
		setOpen(true);
	};

	const handleClose = () => {
		setFormData({ name: "", age: "", role: "", household: "" });
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
			await api.post("/api/householdmembers/", formData);
			handleClose();
		} catch (err) {
			console.error("Add member failed:", err);
		}
	};

	return (
		<>
			<Button
				variant="contained"
				onClick={handleOpen}>
				Add Member
			</Button>
			<Modal
				open={open}
				onClose={handleClose}>
				<Box sx={style}>
					<Typography
						variant="h6"
						mb={2}>
						Add Household Member
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
						name="role"
						label="Role"
						value={formData.role}
						onChange={handleChange}
						sx={{ mb: 2 }}>
						<MenuItem value="Father">Father</MenuItem>
						<MenuItem value="Mother">Mother</MenuItem>
						<MenuItem value="Son">Son</MenuItem>
						<MenuItem value="Daughter">Daughter</MenuItem>
					</TextField>
					<TextField
						fullWidth
						select
						name="household"
						label="Household"
						value={formData.household}
						onChange={handleChange}
						sx={{ mb: 2 }}>
						{households.map((h) => (
							<MenuItem
								key={h.id}
								value={h.id}>
								{h.family_name}
							</MenuItem>
						))}
					</TextField>
					<Button
						fullWidth
						variant="contained"
						onClick={handleSubmit}>
						Submit
					</Button>
				</Box>
			</Modal>
		</>
	);
}

export default AddMembers;
