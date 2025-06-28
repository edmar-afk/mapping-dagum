import { useState, useEffect } from "react";import Chart from "react-apexcharts";
import api from "../../assets/api";

function PwdCharts() {
	const [, setData] = useState([]);
	const [ageCounts, setAgeCounts] = useState([0, 0, 0, 0]);
	const [genderCounts, setGenderCounts] = useState({ Male: 0, Female: 0 });

	useEffect(() => {
		const fetchPwds = async () => {
			try {
				const response = await api.get(`/api/pwds/`);
				const fetchedData = response.data;
				setData(fetchedData);

				const ageGroupCounts = [0, 0, 0, 0];
				const genderGroupCounts = { Male: 0, Female: 0 };

				fetchedData.forEach((person) => {
					const age = parseInt(person.age);
					const gender = person.gender;

					if (!isNaN(age)) {
						if (age >= 1 && age <= 30) ageGroupCounts[0]++;
						else if (age >= 31 && age <= 60) ageGroupCounts[1]++;
						else if (age >= 61 && age <= 90) ageGroupCounts[2]++;
						else if (age >= 91) ageGroupCounts[3]++;
					}

					if (gender === "Male" || gender === "Female") {
						genderGroupCounts[gender]++;
					}
				});

				setAgeCounts(ageGroupCounts);
				setGenderCounts(genderGroupCounts);
			} catch (error) {
				console.error("Error fetching data:", error);
				setData([]);
				setAgeCounts([0, 0, 0, 0]);
				setGenderCounts({ Male: 0, Female: 0 });
			}
		};

		fetchPwds();
	}, []);

	const donutAgeOptions = {
		chart: {
			width: 380,
			type: "donut",
			toolbar: {
				show: true,
				tools: {
					download: true,
					selection: false,
					zoomin: false,
					zoomout: false,
					pan: false,
					reset: false,
				},
				export: {
					csv: {
						filename: "PWD_Age_Distribution",
					},
					svg: {
						filename: "PWD_Age_Distribution",
					},
					png: {
						filename: "PWD_Age_Distribution",
					},
				},
			},
		},
		labels: ["1–30", "31–60", "61–90", "91+"],
		plotOptions: {
			pie: {
				startAngle: -90,
				endAngle: 270,
			},
		},
		dataLabels: {
			enabled: false,
		},
		fill: {
			type: "gradient",
		},
		legend: {
			position: "bottom",
			formatter: function (val, opts) {
				return val + " - " + opts.w.globals.series[opts.seriesIndex];
			},
		},
		title: {
			text: "PWD Age Distribution",
		},
		responsive: [
			{
				breakpoint: 480,
				options: {
					chart: {
						width: 200,
					},
					legend: {
						position: "bottom",
					},
				},
			},
		],
	};

	const donutGenderOptions = {
		chart: {
			width: 380,
			type: "donut",
			toolbar: {
				show: true,
				tools: {
					download: true,
					selection: false,
					zoomin: false,
					zoomout: false,
					pan: false,
					reset: false,
				},
				export: {
					csv: {
						filename: "PWD_Gender_Distribution",
					},
					svg: {
						filename: "PWD_Gender_Distribution",
					},
					png: {
						filename: "PWD_Gender_Distribution",
					},
				},
			},
		},
		labels: ["Male", "Female"],
		plotOptions: {
			pie: {
				startAngle: -90,
				endAngle: 270,
			},
		},
		dataLabels: {
			enabled: false,
		},
		fill: {
			type: "gradient",
		},
		legend: {
			position: "bottom",
			formatter: function (val, opts) {
				return val + " - " + opts.w.globals.series[opts.seriesIndex];
			},
		},
		title: {
			text: "PWD Gender Distribution",
		},
		responsive: [
			{
				breakpoint: 480,
				options: {
					chart: {
						width: 200,
					},
					legend: {
						position: "bottom",
					},
				},
			},
		],
	};

	return (
		<>
			<div className="pt-44 min-h-[400px]">
				<Chart
					options={donutAgeOptions}
					series={ageCounts}
					type="donut"
					height={390}
				/>
			</div>

			<div className="min-h-[400px] mt-16">
				<Chart
					options={donutGenderOptions}
					series={[genderCounts.Male, genderCounts.Female]}
					type="donut"
					height={390}
				/>
			</div>
		</>
	);
}

export default PwdCharts;
