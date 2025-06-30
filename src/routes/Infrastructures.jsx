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
			<div className="my-4 flex flex-row-reverse items-center justify-between">
				<AddInfrastructures />
				<p
					onClick={fetchInfras}
					className="cursor-pointer text-purple-600 hover:underline">
					Refresh
				</p>
			</div>
			<table className="w-full border-collapse border border-purple-500 mx-auto">
				<thead>
					<tr className="bg-purple-500 text-white">
						<th className="py-2 px-4 text-left">Image</th>
						<th className="py-2 px-4 text-left">Name</th>
						<th className="py-2 px-4 text-left">Type</th>
						<th className="py-2 px-4 text-left">Description</th>
						<th className="py-2 px-4 text-left">Actions</th>
					</tr>
				</thead>
				<tbody>
					{infras.map((infra) => (
						<tr
							key={infra.id}
							className="bg-white border-b border-purple-500">
							<td className="py-2 px-4">
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
							<td className="py-2 px-4">{infra.name}</td>
							<td className="py-2 px-4">{infra.type}</td>
							<td className="py-2 px-4">{infra.description}</td>
							<td className="py-2 px-4">
								<button
									type="button"
									onClick={() => deleteInfra(infra.id)}
									className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1">
									Delete
								</button>
							</td>
						</tr>
					))}
					{infras.length === 0 && (
						<tr className="bg-white border-b border-purple-500">
							<td
								colSpan="5"
								className="py-4 px-4 text-center text-gray-500">
								No infrastructure records found.
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</section>
	);
}

export default Infrastructure;
