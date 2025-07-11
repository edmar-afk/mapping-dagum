import { useState, useEffect } from "react";import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PwdCharts from "./charts/PwdCharts";
import InfrasChart from "./charts/InfrasChart";
import SeniorCharts from "./charts/SeniorCharts";
import HouseholdChart from "./charts/HouseholdChart";
import FeedbackChart from "./charts/FeedbackChart";

function Sidebar({ lat, lng, isVisible, categoryKey }) {
	const [copied, setCopied] = useState(false);
	const [isResizing, setIsResizing] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(`${lat}, ${lng}`);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	useEffect(() => {
		if (isVisible) {
			const resizeChart = () => window.dispatchEvent(new Event("resize"));
			resizeChart();
			const t1 = setTimeout(resizeChart, 200);
			const t2 = setTimeout(resizeChart, 500);
			return () => {
				clearTimeout(t1);
				clearTimeout(t2);
			};
		}
	}, [isVisible, categoryKey]);

	useEffect(() => {
		const delayTimer = setTimeout(() => {
			setIsResizing(true);
			const resetTimer = setTimeout(() => {
				setIsResizing(false);
			}, 1300);
			return () => clearTimeout(resetTimer);
		}, 1000);

		return () => clearTimeout(delayTimer);
	}, [categoryKey]);

	return (
		<div
			className={`fixed top-0 z-[999] h-screen bg-white p-4 shadow-lg transition-all duration-300`}
			style={{ width: isResizing ? "401px" : "400px" }}>
			<div className="h-[calc(100%-56px)] overflow-y-auto overflow-x-hidden pt-24 space-y-4">
				{categoryKey === "pwds" ? (
					<PwdCharts />
				) : categoryKey === "infras" ? (
					<InfrasChart />
				) : categoryKey === "seniors" ? (
					<SeniorCharts />
				) : categoryKey === "households" ? (
					<HouseholdChart />
				) : categoryKey === "feedbacks" ? (
					<FeedbackChart />
				) : (
					<p className="text-gray-500 text-center pt-44 text-xl">No Data found.</p>
				)}
			</div>

			<div className="absolute bottom-0 py-3 pl-4 bg-purple-100 w-full flex flex-row items-center gap-2 left-0">
				<p className="w-44 overflow-hidden whitespace-nowrap text-ellipsis">
					{lat}, {lng}
				</p>
				<button
					onClick={handleCopy}
					className="flex cursor-pointer flex-row items-center border px-2 rounded-md text-sm py-1 border-blue-600 bg-blue-100 text-blue-800">
					<ContentCopyIcon fontSize="small" />
					<span>{copied ? "Copied" : " "}</span>
				</button>
			</div>
		</div>
	);
}

export default Sidebar;
