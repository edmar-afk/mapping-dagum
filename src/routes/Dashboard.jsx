import React, { useEffect, useState } from "react";import api from "../assets/api";

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
		<div className="bg-gray-50 py-16 pt-32">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto text-center">
					<h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Dagum Mapping Dashboard</h2>
					<p className="mt-3 text-xl text-gray-500 sm:mt-4">Latest statistics on community programs and development.</p>
				</div>
			</div>
			<div className="mt-10 pb-1">
				<div className="relative">
					<div className="absolute inset-0 h-1/2 bg-gray-50"></div>
					<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="max-w-4xl mx-auto">
							<dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-4">
								<div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
									<dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">PWDs</dt>
									<dd className="order-1 text-5xl font-extrabold text-gray-700">{stats.total_pwds}</dd>
								</div>
								<div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
									<dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Senior Citizens</dt>
									<dd className="order-1 text-5xl font-extrabold text-gray-700">{stats.total_seniors}</dd>
								</div>
								<div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
									<dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Households</dt>
									<dd className="order-1 text-5xl font-extrabold text-gray-700">{stats.total_households}</dd>
								</div>
								<div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
									<dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Infrastructures</dt>
									<dd className="order-1 text-5xl font-extrabold text-gray-700">{stats.total_infrastructures}</dd>
								</div>
							</dl>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
