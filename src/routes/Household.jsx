import React, { useEffect, useState } from "react";
import api from "../assets/api";
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
			<div className="my-4 flex flex-row items-center justify-between">
				<AddHousehold />
				<p
					onClick={fetchHouseholds}
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
									<th className="px-4 py-3">Family Name</th>

									<th className="px-4 py-3">Actions</th>
								</tr>
							</thead>
							<tbody>
								{households.map((household) => (
									<tr
										key={household.id}
										className="border-b">
										<td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{household.family_name}</td>
										<td className="px-4 py-3 flex items-center justify-start">
											<button
												type="button"
												onClick={() => deleteHousehold(household.id)}
												className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2">
												Delete
											</button>
										</td>
									</tr>
								))}
								{households.length === 0 && (
									<tr>
										<td
											colSpan="3"
											className="text-center py-4 text-gray-500">
											No household records found.
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

export default Household;
