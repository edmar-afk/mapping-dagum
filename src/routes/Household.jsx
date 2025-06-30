import React, { useEffect, useState } from "react";import api from "../assets/api";
import AddHousehold from "../components/admin/AddHousehold";

function Household() {
	const [households, setHouseholds] = useState([]);

	const fetchHouseholds = async () => {
		try {
			const res = await api.get("/api/households/");
			setHouseholds(res.data);
		} catch (err) {
			console.error("Failed to fetch households:", err);
		}
	};

	const deleteHousehold = async (id) => {
		try {
			await api.delete(`/api/households/delete/${id}/`);
			setHouseholds((prev) => prev.filter((h) => h.id !== id));
		} catch (err) {
			console.error("Failed to delete household:", err);
		}
	};

	useEffect(() => {
		fetchHouseholds();
	}, []);

	return (
		<section className="w-full">
			<div className="my-4 flex flex-row-reverse items-center justify-between">
				<AddHousehold />
				<p
					onClick={fetchHouseholds}
					className="cursor-pointer text-purple-600 hover:underline">
					Refresh
				</p>
			</div>
			<table className="w-full border-collapse border border-purple-500 mx-auto">
				<thead>
					<tr className="bg-purple-500 text-white">
						<th className="py-2 px-4 text-left">Family Name</th>
						<th className="py-2 px-4 text-left">Actions</th>
					</tr>
				</thead>
				<tbody>
					{households.map((household) => (
						<tr
							key={household.id}
							className="bg-white border-b border-purple-500">
							<td className="py-2 px-4">{household.family_name}</td>
							<td className="py-2 px-4">
								<button
									type="button"
									onClick={() => deleteHousehold(household.id)}
									className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1">
									Delete
								</button>
							</td>
						</tr>
					))}
					{households.length === 0 && (
						<tr className="bg-white border-b border-purple-500">
							<td
								colSpan="2"
								className="py-4 px-4 text-center text-gray-500">
								No household records found.
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</section>
	);
}

export default Household;
