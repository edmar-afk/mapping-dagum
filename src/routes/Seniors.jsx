import React, { useEffect, useState } from "react";import api from "../assets/api";
import AddSeniors from "../components/admin/AddSeniors";

function Seniors() {
	const [seniors, setSeniors] = useState([]);

	const fetchSeniors = async () => {
		try {
			const res = await api.get("/api/seniors/");
			setSeniors(res.data);
		} catch (err) {
			console.error("Failed to fetch Seniors:", err);
		}
	};

	const deleteSenior = async (id) => {
		try {
			await api.delete(`/api/seniors/${id}/`);
			setSeniors((prev) => prev.filter((s) => s.id !== id));
		} catch (err) {
			console.error("Failed to delete Senior:", err);
		}
	};

	useEffect(() => {
		fetchSeniors();
	}, []);

	return (
		<section className="w-full">
			<div className="my-4 flex flex-row-reverse items-center justify-between">
				<AddSeniors />
				<p
					onClick={fetchSeniors}
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
					{seniors.map((senior) => (
						<tr
							key={senior.id}
							className="bg-white border-b border-purple-500">
							<td className="py-2 px-4">{senior.people}</td>
							<td className="py-2 px-4">{senior.age}</td>
							<td className="py-2 px-4">{senior.gender}</td>
							<td className="py-2 px-4">
								<button
									type="button"
									onClick={() => deleteSenior(senior.id)}
									className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1">
									Delete
								</button>
							</td>
						</tr>
					))}
					{seniors.length === 0 && (
						<tr className="bg-white border-b border-purple-500">
							<td
								colSpan="4"
								className="py-4 px-4 text-center text-gray-500">
								No Senior records found.
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</section>
	);
}

export default Seniors;
