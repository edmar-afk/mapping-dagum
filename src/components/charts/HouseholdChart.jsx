import { useState, useEffect } from "react";import api from "../../assets/api";

function HouseholdChart() {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchHousehold = async () => {
			try {
				const response = await api.get(`/api/households/`);
				setData(response.data);
			} catch (error) {
				console.error("Error fetching Households:", error);
				setData([]);
			}
		};

		fetchHousehold();
	}, []);

	return (
		<>
			<p className="text-center text-lg font-semibold my-12">Household Members Around Bayog Zamboanga del Sur</p>

			<div className="space-y-10">
				{data.map((household, index) => (
					<div
						key={index}
						className="relative overflow-x-auto shadow-md sm:rounded-lg">
						<h2 className="text-xl font-bold text-gray-800 mb-4 text-center">{household.family_name} Family</h2>

						{household.members && household.members.length > 0 ? (
							<table className="w-full text-sm text-left rtl:text-right text-gray-500">
								<thead className="text-xs text-gray-700 uppercase">
									<tr>
										<th
											scope="col"
											className="px-6 py-3 bg-gray-50">
											Name
										</th>
										<th
											scope="col"
											className="px-6 py-3">
											Age
										</th>
										<th
											scope="col"
											className="px-6 py-3 bg-gray-50">
											Role
										</th>
									</tr>
								</thead>
								<tbody>
									{household.members.map((member, i) => (
										<tr
											key={i}
											className="border-b border-gray-200">
											<th
												scope="row"
												className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
												{member.name}
											</th>
											<td className="px-6 py-4">{member.age}</td>
											<td className="px-6 py-4 bg-gray-50">{member.role}</td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<p className="text-gray-500 italic text-center">No family members found.</p>
						)}
					</div>
				))}
			</div>
		</>
	);
}

export default HouseholdChart;
