import { useEffect, useState } from "react";import api from "../assets/api";
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
			<div className="my-4 flex flex-row-reverse items-center justify-between">
				<AddMembers />
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
						<th className="py-2 px-4 text-left">Member Name</th>
						<th className="py-2 px-4 text-left">Age</th>
						<th className="py-2 px-4 text-left">Role</th>
					</tr>
				</thead>
				<tbody>
					{households.length > 0 ? (
						households.flatMap((household) =>
							household.members.map((member, idx) => (
								<tr
									key={member.id}
									className="bg-white border-b border-purple-500">
									<td className="py-2 px-4">{idx === 0 ? household.family_name : ""}</td>
									<td className="py-2 px-4">{member.name}</td>
									<td className="py-2 px-4">{member.age}</td>
									<td className="py-2 px-4">{member.role}</td>
								</tr>
							))
						)
					) : (
						<tr className="bg-white border-b border-purple-500">
							<td
								colSpan="4"
								className="py-4 px-4 text-center text-gray-500">
								No household members found.
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</section>
	);
}

export default HouseholdMembers;
