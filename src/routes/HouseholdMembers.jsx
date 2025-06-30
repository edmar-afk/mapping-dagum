import { useEffect, useState } from "react";
import api from "../assets/api";
import AddMembers from "../components/admin/AddMembers";

function HouseholdMembers() {
	const [households, setHouseholds] = useState([]);

	const fetchHouseholds = async () => {
		try {
			const res = await api.get("/api/households/");
			setHouseholds(res.data);
		} catch (err) {
			console.error("Failed to fetch households:", err);
		}
	};

	useEffect(() => {
		fetchHouseholds();
	}, []);

	return (
		<section className="w-full">
			<div className="my-4 flex items-center justify-between">
				<AddMembers />
				<p
					onClick={fetchHouseholds}
					className="cursor-pointer text-blue-600 hover:underline">
					Refresh
				</p>
			</div>

			<div className="bg-white shadow-md sm:rounded-lg overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full text-sm text-left text-gray-500">
						<thead className="text-xs text-gray-700 uppercase bg-gray-50">
							<tr>
								<th className="px-4 py-3">Family Name</th>
								<th className="px-4 py-3">Member Name</th>
								<th className="px-4 py-3">Age</th>
								<th className="px-4 py-3">Role</th>
							</tr>
						</thead>
						<tbody>
							{households.length > 0 ? (
								households.flatMap((household) =>
									household.members.map((member, idx) => (
										<tr
											key={member.id}
											className="border-b">
											<td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
												{idx === 0 ? household.family_name : ""}
											</td>
											<td className="px-4 py-3">{member.name}</td>
											<td className="px-4 py-3">{member.age}</td>
											<td className="px-4 py-3">{member.role}</td>
										</tr>
									))
								)
							) : (
								<tr>
									<td
										colSpan="4"
										className="text-center py-4 text-gray-500">
										No household members found.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
}

export default HouseholdMembers;
