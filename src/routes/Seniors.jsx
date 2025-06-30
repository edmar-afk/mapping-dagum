import React, { useEffect, useState } from "react";import api from "../assets/api";import AddSeniors from "../components/admin/AddSeniors";
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
			<div className="my-4 flex flex-row items-center justify-between">
				<AddSeniors />
				<p
					onClick={fetchSeniors}
					className="cursor-pointer text-blue-600 hover:underline">
					Refresh
				</p>
			</div>

			<div className="mx-auto w-full">
				<div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
					<div className="overflow-x-auto">
						<table className="w-full text-sm text-left text-gray-500">
							<thead className="text-xs text-gray-700 uppercase bg-gray-50">
								<tr>
									<th className="px-4 py-3">Name</th>
									<th className="px-4 py-3">Age</th>
									<th className="px-4 py-3">Gender</th>
									<th className="px-4 py-3">Actions</th>
								</tr>
							</thead>
							<tbody>
								{seniors.map((senior) => (
									<tr
										key={senior.id}
										className="border-b">
										<td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{senior.people}</td>
										<td className="px-4 py-3">{senior.age}</td>
										<td className="px-4 py-3">{senior.gender}</td>
										<td className="px-4 py-3 flex items-center justify-start">
											<button
												type="button"
												onClick={() => deleteSenior(senior.id)}
												className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2">
												Delete
											</button>
										</td>
									</tr>
								))}
								{seniors.length === 0 && (
									<tr>
										<td
											colSpan="4"
											className="text-center py-4 text-gray-500">
											No Senior records found.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Seniors;
