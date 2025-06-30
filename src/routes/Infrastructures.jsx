import { useEffect, useState } from "react";import api from "../assets/api";
import AddInfrastructures from "../components/admin/AddInfrastructures";

function Infrastructure() {
	const [infras, setInfras] = useState([]);

	const fetchInfras = async () => {
		try {
			const res = await api.get("/api/infras/");
			setInfras(res.data);
		} catch (err) {
			console.error("Failed to fetch Infrastructures:", err);
		}
	};

	const deleteInfra = async (id) => {
		try {
			await api.delete(`/api/infrastructure/delete/${id}/`);
			setInfras((prev) => prev.filter((i) => i.id !== id));
		} catch (err) {
			console.error("Failed to delete Infrastructure:", err);
		}
	};

	useEffect(() => {
		fetchInfras();
	}, []);

	return (
		<section className="w-full">
			<div className="my-4 flex flex-row items-center justify-between">
				<AddInfrastructures />
				<p
					onClick={fetchInfras}
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
									<th className="px-4 py-3">Type</th>
									<th className="px-4 py-3">Description</th>
									<th className="px-4 py-3">Location</th>
									<th className="px-4 py-3">Image</th>
									<th className="px-4 py-3">Actions</th>
								</tr>
							</thead>
							<tbody>
								{infras.map((infra) => (
									<tr
										key={infra.id}
										className="border-b">
										<td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{infra.name}</td>
										<td className="px-4 py-3">{infra.type}</td>
										<td className="px-4 py-3">{infra.description}</td>
										<td className="px-4 py-3">{infra.location}</td>
										<td className="px-4 py-3">
											{infra.image ? (
												<img
													src={infra.image}
													alt="infra"
													className="w-16 h-16 object-cover rounded"
												/>
											) : (
												<span className="text-gray-400 italic">No Image</span>
											)}
										</td>
										<td className="px-4 py-3 flex items-center justify-start">
											<button
												type="button"
												onClick={() => deleteInfra(infra.id)}
												className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2">
												Delete
											</button>
										</td>
									</tr>
								))}
								{infras.length === 0 && (
									<tr>
										<td
											colSpan="6"
											className="text-center py-4 text-gray-500">
											No infrastructure records found.
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

export default Infrastructure;
