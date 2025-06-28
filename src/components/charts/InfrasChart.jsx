import { useState, useEffect } from "react";import api from "../../assets/api";

function InfrasChart() {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchInfras = async () => {
			try {
				const response = await api.get(`/api/infras/`);
				setData(response.data);
			} catch (error) {
				console.error("Error fetching infrastructures:", error);
				setData([]);
			}
		};

		fetchInfras();
	}, []);

	const defaultImage = "https://images.unsplash.com/photo-1499856871958-5b9627545d1a";

	return (
		<>
			
			<div className="flex flex-col justify-center">
				{data.map((infra, index) => (
					<article
						key={index}
						className="relative border-1 border-purple-600 isolate mb-4 flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 shadow-lg">
						<img
							src={infra.image ? infra.image : defaultImage}
							alt={infra.name}
							className=" inset-0 h-full w-full object-cover"
						/>
						
						<h3 className="z-10 mt-3 text-2xl font-bold text-gray-900">{infra.name}</h3>
						<div className="z-10 text-sm leading-6 text-gray-500">
							<p>{infra.description}</p>
							<p className="italic text-gray-600 mt-1">Type: {infra.type}</p>
						</div>
					</article>
				))}
			</div>
		</>
	);
}

export default InfrasChart;
