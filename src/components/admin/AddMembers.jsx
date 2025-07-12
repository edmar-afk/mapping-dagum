import React, { useState } from "react";import { Modal } from "@mui/material";
import api from "../../assets/api";

const style = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

function AddMembers() {
	const [open, setOpen] = useState(false);
	const [households, setHouseholds] = useState([]);
	const [formData, setFormData] = useState({
		name: "",
		age: "",
		role: "",
		household: "",
		occupation: "",
		source_income: "",
	});
	const [error, setError] = useState("");

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
		setFormData({
			name: "",
			age: "",
			role: "",
			household: "",
			occupation: "",
			source_income: "",
		});
		setError("");
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
			setError("Failed to add member");
		}
	};

	return (
		<>
			<button
				onClick={handleOpen}
				className="bg-purple-600 text-white px-4 py-2 rounded">
				Add Member
			</button>

			<Modal
				open={open}
				onClose={handleClose}
				sx={style}
				BackdropProps={{
					sx: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
				}}>
				<div className="min-h-screen py-6 flex flex-col justify-center sm:py-12 z-[999999]">
					<div className="relative py-3 sm:max-w-xl sm:mx-auto w-full">
						<div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
						<div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
							<div className="max-w-md mx-auto">
								<h1 className="text-2xl font-semibold text-center mb-4">Add Household Member</h1>
								<div className="space-y-4 text-gray-700 sm:text-lg">
									{[
										{ name: "name", label: "Name", type: "text" },
										{ name: "age", label: "Age", type: "number" },
										{ name: "occupation", label: "Occupation", type: "text" },
										{ name: "source_income", label: "Source of Income", type: "text" },
									].map(({ name, label, type }) => (
										<div
											key={name}
											className="relative">
											<input
												type={type}
												name={name}
												value={formData[name]}
												onChange={handleChange}
												placeholder={label}
												className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-purple-600"
											/>
											<label
												htmlFor={name}
												className="absolute left-0 -top-3.5 text-sm text-gray-600 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all peer-focus:-top-3.5 peer-focus:text-sm">
												{label}
											</label>
										</div>
									))}

									<div className="relative">
										<select
											name="role"
											value={formData.role}
											onChange={handleChange}
											className="h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-purple-600 bg-transparent">
											<option
												value=""
												disabled>
												Select Role
											</option>
											<option value="Father">Father</option>
											<option value="Mother">Mother</option>
											<option value="Son">Son</option>
											<option value="Daughter">Daughter</option>
										</select>
									</div>

									<div className="relative">
										<select
											name="household"
											value={formData.household}
											onChange={handleChange}
											className="h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-purple-600 bg-transparent">
											<option
												value=""
												disabled>
												Select Household
											</option>
											{households.map((h) => (
												<option
													key={h.id}
													value={h.id}>
													{h.family_name}
												</option>
											))}
										</select>
									</div>

									{error && <p className="text-sm text-red-500">{error}</p>}

									<div className="relative">
										<button
											onClick={handleSubmit}
											className="bg-purple-500 text-white rounded-md px-2 py-1 w-full">
											Submit
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
}

export default AddMembers;
