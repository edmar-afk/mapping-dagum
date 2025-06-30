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
	});
	const [error, setError] = useState("");

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setFormData({ people: "", age: "", gender: "", location: "" });
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
			const response = await api.post("/api/pwds/", formData);
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
					sx: {
						backgroundColor: "rgba(0, 0, 0, 0.4)",
					},
				}}>
				<div className="min-h-screen py-6 flex flex-col justify-center sm:py-12 z-[999999]">
					<div className="relative py-3 sm:max-w-xl sm:mx-auto w-full">
						<div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
						<div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
							<div className="max-w-md mx-auto">
								<div>
									<h1 className="text-2xl font-semibold text-center">Add PWD</h1>
								</div>
								<div className="divide-y divide-gray-200">
									<div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
										<div className="relative">
											<input
												autoComplete="off"
												type="text"
												name="people"
												value={formData.people}
												onChange={handleChange}
												placeholder="Full Name"
												className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-600"
											/>
											<label
												htmlFor="people"
												className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
												Full Name
											</label>
										</div>
										<div className="relative">
											<input
												autoComplete="off"
												type="number"
												name="age"
												value={formData.age}
												onChange={handleChange}
												placeholder="Age"
												className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-600"
											/>
											<label
												htmlFor="age"
												className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
												Age
											</label>
										</div>
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
										<div className="relative">
											<input
												autoComplete="off"
												type="text"
												name="location"
												value={formData.location}
												onChange={handleChange}
												placeholder="Location"
												className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-600"
											/>
											<label
												htmlFor="location"
												className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
												Location
											</label>
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
