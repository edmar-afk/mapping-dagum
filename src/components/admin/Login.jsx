import React, { useState } from "react";import { Modal } from "@mui/material";import { useNavigate } from "react-router-dom";

const style = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

function Login({ open, onClose }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleLogin = () => {
		if (username === "admin" && password === "admin123") {
			setError("");
			onClose();
			navigate("/admin");
		} else {
			setError("Invalid username or password");
		}
	};

	return (
		<Modal
			open={open}
			onClose={onClose}
			sx={style}
			BackdropProps={{
				sx: {
					backgroundColor: "rgba(0, 0, 0, 0.9)",
				},
			}}>
			<div className="min-h-screen py-6 flex flex-col justify-center sm:py-12 z-[999999]">
				<div className="relative py-3 sm:max-w-xl sm:mx-auto w-full">
					<div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
					<div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
						<div className="max-w-md mx-auto">
							<div>
								<h1 className="text-2xl font-semibold text-center">Login to Admin</h1>
							</div>
							<div className="divide-y divide-gray-200">
								<div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
									<div className="relative">
										<input
											autoComplete="off"
											type="text"
											id="username"
											value={username}
											onChange={(e) => setUsername(e.target.value)}
											placeholder="Username"
											className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-600"
										/>
										<label
											htmlFor="username"
											className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
											Username
										</label>
									</div>
									<div className="relative">
										<input
											autoComplete="off"
											type="password"
											id="password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											placeholder="Password"
											className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-600"
										/>
										<label
											htmlFor="password"
											className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
											Password
										</label>
									</div>

									{error && <p className="text-sm text-red-500 mt-1">{error}</p>}

									<div className="relative">
										<button
											onClick={handleLogin}
											className="bg-cyan-500 text-white rounded-md px-2 py-1 w-full">
											Submit
										</button>
									</div>
								</div>
							</div>

							<div className="w-full flex justify-center mt-4">
								<button className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
									<svg
										className="h-6 w-6 mr-2"
										viewBox="-0.5 0 48 48"
										version="1.1">
										<path
											fill="#FBBC05"
											d="M9.82727273,24..."></path>
										<path
											fill="#EB4335"
											d="M23.7136364,10.1333333..."></path>
										<path
											fill="#34A853"
											d="M23.7136364,37.8666667..."></path>
										<path
											fill="#4285F4"
											d="M46.1454545,24..."></path>
									</svg>
									<span>Continue with Google</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
}

export default function LoginWrapper() {
	const [open, setOpen] = useState(false);

	return (
		<>
			<button
				onClick={() => setOpen(true)}
				className="bg-cyan-600 text-white px-4 py-2 rounded">
				Login
			</button>
			<Login
				open={open}
				onClose={() => setOpen(false)}
			/>
		</>
	);
}
