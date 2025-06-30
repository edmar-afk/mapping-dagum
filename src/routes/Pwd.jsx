import React, { useEffect, useState } from "react";import api from "../assets/api";
import AddPwd from "../components/admin/AddPwd";

function Pwd() {
	const [pwds, setPwds] = useState([]);

	const fetchPwds = async () => {
		try {
			const res = await api.get("/api/pwds/");
			setPwds(res.data);
		} catch (err) {
			console.error("Failed to fetch PWDs:", err);
		}
	};

	const deletePwd = async (id) => {
		try {
			await api.delete(`/pwds/${id}/`);
			setPwds((prev) => prev.filter((p) => p.id !== id));
		} catch (err) {
			console.error("Failed to delete PWD:", err);
		}
	};

	useEffect(() => {
		fetchPwds();
	}, []);

	return (
		<section className="w-full">
			<div className="my-4 flex flex-row-reverse items-center justify-between">
				<AddPwd />
				<p
					onClick={fetchPwds}
					className="cursor-pointer text-purple-600 hover:underline">
					Refresh
				</p>
			</div>
			<table className="w-full border-collapse border border-purple-500 mx-auto">
				<thead>
					<tr className="bg-purple-500 text-white">
						<th className="py-2 px-4 text-left">Name</th>
						<th className="py-2 px-4 text-left">Age</th>
						<th className="py-2 px-4 text-left">Gender</th>
						<th className="py-2 px-4 text-left">Actions</th>
					</tr>
				</thead>
				<tbody>
					{pwds.map((pwd) => (
						<tr
							key={pwd.id}
							className="bg-white border-b border-purple-500">
							<td className="py-2 px-4">{pwd.people}</td>
							<td className="py-2 px-4">{pwd.age}</td>
							<td className="py-2 px-4">{pwd.gender}</td>
							<td className="py-2 px-4">
								<button
									type="button"
									onClick={() => deletePwd(pwd.id)}
									className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1">
									Delete
								</button>
							</td>
						</tr>
					))}
					{pwds.length === 0 && (
						<tr className="bg-white border-b border-purple-500">
							<td
								colSpan="4"
								className="py-4 px-4 text-center text-gray-500">
								No PWD records found.
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</section>
	);
}

export default Pwd;
