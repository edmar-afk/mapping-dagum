import React, { useEffect, useState } from "react";import api from "../assets/api";
import AccessibleIcon from "@mui/icons-material/Accessible";
import PeopleIcon from "@mui/icons-material/People";
import ElderlyWomanIcon from "@mui/icons-material/ElderlyWoman";
import ApartmentIcon from "@mui/icons-material/Apartment";
function Dashboard() {
	const [stats, setStats] = useState({
		total_pwds: 0,
		total_seniors: 0,
		total_households: 0,
		total_infrastructures: 0,
	});

	useEffect(() => {
		api.get("/api/stats/").then((res) => {
			setStats(res.data);
		});
	}, []);

	return (
		<section className="text-gray-700 body-font">
			<div className="container px-5 py-24 mx-auto">
				<div className="flex flex-wrap -m-4 text-center">
					<div className="p-4 md:w-1/4 sm:w-1/2 w-full">
						<div className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
							<AccessibleIcon
								className="text-indigo-500 w-12 h-12 mb-3"
								style={{ fontSize: 48 }}
							/>
							<h2 className="title-font font-medium text-3xl text-gray-900">{stats.total_pwds}</h2>
							<p className="leading-relaxed">PWDs</p>
						</div>
					</div>
					<div className="p-4 md:w-1/4 sm:w-1/2 w-full">
						<div className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
							<ElderlyWomanIcon
								className="text-indigo-500 w-12 h-12 mb-3"
								style={{ fontSize: 48 }}
							/>
							<h2 className="title-font font-medium text-3xl text-gray-900">{stats.total_seniors}</h2>
							<p className="leading-relaxed">Senior Citizens</p>
						</div>
					</div>
					<div className="p-4 md:w-1/4 sm:w-1/2 w-full">
						<div className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
							<PeopleIcon
								className="text-indigo-500 w-12 h-12 mb-3"
								style={{ fontSize: 48 }}
							/>
							<h2 className="title-font font-medium text-3xl text-gray-900">{stats.total_households}</h2>
							<p className="leading-relaxed">Households</p>
						</div>
					</div>
					<div className="p-4 md:w-1/4 sm:w-1/2 w-full">
						<div className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
							<ApartmentIcon
								className="text-indigo-500 w-12 h-12 mb-3"
								style={{ fontSize: 48 }}
							/>
							<h2 className="title-font font-medium text-3xl text-gray-900">{stats.total_infrastructures}</h2>
							<p className="leading-relaxed">Infrastructures</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Dashboard;
