import React, { useState } from "react";import { Modal } from "@mui/material";
import api from "../../assets/api";

const style = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
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
	const [error, setError] = useState("");

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setFormData({
			name: "",
			type: "",
			description: "",
			location: "",
		});
		setImage(null);
		setError("");
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
			setError("Failed to add infrastructure");
		}
	};

	return (
		<>
			<button
				onClick={handleOpen}
				className="bg-purple-600 text-white px-4 py-2 rounded">
				Add Infrastructure
			</button>

			<Modal
				open={open}
				onClose={handleClose}
				sx={style}
				BackdropProps={{
					sx: {
						backgroundColor: "rgba(0, 0, 0, 0.9)",
					},
				}}>
				<div className="min-h-screen py-6 flex flex-col justify-center sm:py-12 z-[999999]">
					<div className="relative py-3 sm:max-w-xl sm:mx-auto w-full">
						<div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
						<div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
							<div className="max-w-md mx-auto">
								<h1 className="text-2xl font-semibold text-center mb-4">Add Infrastructure</h1>
								<div className="space-y-4 text-gray-700 sm:text-lg">
									<div className="relative">
										<input
											type="text"
											name="name"
											value={formData.name}
											onChange={handleChange}
											placeholder="Name"
											className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-purple-600"
										/>
										<label
											htmlFor="name"
											className="absolute left-0 -top-3.5 text-sm text-gray-600 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-sm">
											Name
										</label>
									</div>

									<div className="relative">
										<input
											type="text"
											name="type"
											value={formData.type}
											onChange={handleChange}
											placeholder="Type"
											className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-purple-600"
										/>
										<label
											htmlFor="type"
											className="absolute left-0 -top-3.5 text-sm text-gray-600 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-sm">
											Type
										</label>
									</div>

									<div className="relative">
										<textarea
											name="description"
											value={formData.description}
											onChange={handleChange}
											placeholder="Description"
											rows="3"
											className="peer placeholder-transparent w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-purple-600"></textarea>
										<label
											htmlFor="description"
											className="absolute left-0 -top-3.5 text-sm text-gray-600 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-sm">
											Description
										</label>
									</div>

									<div className="relative">
										<input
											type="text"
											name="location"
											value={formData.location}
											onChange={handleChange}
											placeholder="Location"
											className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-purple-600"
										/>
										<label
											htmlFor="location"
											className="absolute left-0 -top-3.5 text-sm text-gray-600 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-sm">
											Location
										</label>
									</div>

									<div className="relative">
										<input
											type="file"
											accept="image/png, image/jpeg, image/jpg"
											onChange={handleImageChange}
											className="block w-full text-sm text-gray-600"
										/>
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

export default AddInfrastructures;
