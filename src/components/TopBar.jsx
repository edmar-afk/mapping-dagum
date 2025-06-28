import AccessibleIcon from "@mui/icons-material/Accessible";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ElderlyIcon from "@mui/icons-material/Elderly";
import HouseIcon from "@mui/icons-material/House";
import PeopleIcon from "@mui/icons-material/People";
import React from "react";

function TopBar({ isVisible, onCategorySelect, activeCategory }) {
	const categories = [
		{
			label: "PWD",
			key: "pwds",
			icon: (
				<AccessibleIcon
					fontSize="small"
					className="mr-1"
				/>
			),
		},
		{
			label: "Infrastructure",
			key: "infras",
			icon: (
				<ApartmentIcon
					fontSize="small"
					className="mr-1"
				/>
			),
		},
		{
			label: "Senior Citizens",
			key: "seniors",
			icon: (
				<ElderlyIcon
					fontSize="small"
					className="mr-1"
				/>
			),
		},
		// {
		// 	label: "Households",
		// 	key: "households",
		// 	icon: (
		// 		<HouseIcon
		// 			fontSize="small"
		// 			className="mr-1"
		// 		/>
		// 	),
		// },
		{
			label: "Feedbacks",
			key: "feedbacks",
			icon: (
				<PeopleIcon
					fontSize="small"
					className="mr-1"
				/>
			),
		},
	];

	return (
		<div
			className={`bg-purple-100 px-12 py-6 absolute flex flex-row items-center justify-center top-0 left-0 w-[500px] flex-wrap z-[9999] transition-transform duration-300 ${
				isVisible ? "scale-100" : "scale-0"
			}`}>
			{categories.map((cat) => (
				<button
					key={cat.key}
					onClick={() => onCategorySelect(cat.key)}
					className={`px-4 py-2 mx-2 rounded-lg flex items-center whitespace-nowrap duration-300 mb-3 ${
						activeCategory === cat.key ? "bg-purple-700 text-white" : "bg-white hover:bg-purple-700 hover:text-white"
					}`}>
					{cat.label}
				</button>
			))}
		</div>
	);
}

export default TopBar;
