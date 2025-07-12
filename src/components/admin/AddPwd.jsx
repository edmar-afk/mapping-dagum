import React, { useState } from "react";import { Modal } from "@mui/material";
import api from "../../assets/api";

const style = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

function AddPwd() {
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState({
		people: "",
		age: "",
		gender: "",
		location: "",
		description: "",
		disability_type: "",
	});
	const [error, setError] = useState("");

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setFormData({
			people: "",
			age: "",
			gender: "",
			location: "",
			description: "",
			disability_type: "",
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
			const payload = {
				...formData,
				purok: "no data",
				status: "no data",
			};

			const response = await api.post("/api/pwds/", payload);
			console.log("Added:", response.data);
			handleClose();
		} catch (error) {
			console.error("Add failed:", error);
			setError("Failed to add data");
		}
	};

	return (
		<>
			<button
				onClick={handleOpen}
				className="bg-purple-600 text-white px-4 py-2 rounded">
				Add PWD
			</button>

			<Modal
				open={open}
				onClose={handleClose}
				sx={style}
				BackdropProps={{
					sx: { backgroundColor: "rgba(0, 0, 0, 0.4)" },
				}}>
				<div className="min-h-screen py-6 flex flex-col justify-center sm:py-12 z-[999999]">
					<div className="relative py-3 sm:max-w-xl sm:mx-auto w-full">
						<div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
						<div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
							<div className="max-w-md mx-auto">
								<h1 className="text-2xl font-semibold text-center">Add PWD</h1>
								<div className="divide-y divide-gray-200">
									<div className="py-8 space-y-4 text-gray-700">
										{[
											{ name: "people", label: "Full Name", type: "text" },
											{ name: "age", label: "Age", type: "number" },
											{ name: "location", label: "Location", type: "text" },
											{ name: "description", label: "Description", type: "text" },
											{ name: "disability_type", label: "Disability Type", type: "text" },
										].map(({ name, label, type }) => (
											<div
												key={name}
												className="relative">
												<input
													autoComplete="off"
													type={type}
													name={name}
													value={formData[name]}
													onChange={handleChange}
													placeholder={label}
													className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-600"
												/>
												<label
													htmlFor={name}
													className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
													{label}
												</label>
											</div>
										))}

										<div className="relative">
											<select
												name="gender"
												value={formData.gender}
												onChange={handleChange}
												className="h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-600 bg-transparent">
												<option
													value=""
													disabled>
													Select Gender
												</option>
												<option value="Male">Male</option>
												<option value="Female">Female</option>
											</select>
										</div>

										{error && <p className="text-sm text-red-500 mt-1">{error}</p>}

										<div className="relative">
											<button
												onClick={handleSubmit}
												className="bg-cyan-500 text-white rounded-md px-2 py-1 w-full">
												Submit
											</button>
										</div>
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

export default AddPwd;
