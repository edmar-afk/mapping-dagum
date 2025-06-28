import { useState, useEffect } from "react";
import api from "../../assets/api";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RefreshIcon from "@mui/icons-material/Refresh";

function FeedbackChart() {
	const [data, setData] = useState([]);

	const fetchFeedback = async () => {
		try {
			const response = await api.get(`/api/feedbacks/`);
			setData(response.data);
		} catch (error) {
			console.error("Error fetching feedbacks:", error);
			setData([]);
		}
	};

	useEffect(() => {
		fetchFeedback();
	}, []);

	return (
		<>
			<div className="space-y-6 pt-44">
				<div
					className="text-right flex justify-end items-center space-x-1 text-blue-600 hover:underline cursor-pointer"
					onClick={fetchFeedback}>
					<RefreshIcon fontSize="small" />
					<p>Refresh</p>
				</div>

				{data.length > 0 ? (
					data.map((item, index) => (
						<blockquote
							class="flex flex-col items-start p-4 mb-8"
							key={index}>
							<p class="max-w-4xl text-xl font-medium text-center md:text-2xl lg:text-3xl">"{item.feedback}"</p>
							<footer class="flex items-center gap-3 mt-2">
								<a
									href=""
									target="_blank"
									class="inline-block font-bold tracking-tight">
									<p>{item.name}</p>
									<p class="font-medium text-black/60">
										{new Date(item.created_at)
											.toLocaleString("en-US", {
												hour: "numeric",
												minute: "numeric",
												hour12: true,
												month: "long",
												day: "numeric",
												year: "numeric",
											})
											.replace("AM", "am")
											.replace("PM", "pm")}
									</p>
								</a>
							</footer>
						</blockquote>
					))
				) : (
					<p className="text-center text-gray-500 italic">No feedbacks found.</p>
				)}
			</div>
		</>
	);
}

export default FeedbackChart;
