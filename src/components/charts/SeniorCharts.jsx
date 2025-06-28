import { useState, useEffect } from "react";import Chart from "react-apexcharts";
import api from "../../assets/api";

function SeniorCharts() {
	const [, setData] = useState([]);
	const [ageCounts, setAgeCounts] = useState([0, 0, 0, 0]);
	const [genderCounts, setGenderCounts] = useState({ Male: 0, Female: 0 });

	useEffect(() => {
		const fetchSeniors = async () => {
			try {
				const response = await api.get(`/api/seniors/`);
				const fetchedData = response.data;
				setData(fetchedData);

				const ageGroupCounts = [0, 0, 0, 0];
				const genderGroupCounts = { Male: 0, Female: 0 };

				fetchedData.forEach((person) => {
					const age = parseInt(person.age);
					const gender = person.gender;

					if (!isNaN(age)) {
						if (age >= 50 && age <= 70) ageGroupCounts[0]++;
						else if (age >= 71 && age <= 90) ageGroupCounts[1]++;
						else if (age >= 91 && age <= 99) ageGroupCounts[2]++;
						else if (age >= 100) ageGroupCounts[3]++;
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

		fetchSeniors();
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
						filename: "Senior_Age_Distribution",
					},
					svg: {
						filename: "Senior_Age_Distribution",
					},
					png: {
						filename: "Senior_Age_Distribution",
					},
				},
			},
		},
		labels: ["50–70", "71–90", "91–99", "100+"],
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
			text: "Senior Age Distribution",
		},
		colors: ["#546E7A", "#26A69A", "#D4AC0D", "#A569BD"],
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
						filename: "Senior_Gender_Distribution",
					},
					svg: {
						filename: "Senior_Gender_Distribution",
					},
					png: {
						filename: "Senior_Gender_Distribution",
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
			text: "Senior Gender Distribution",
		},
		colors: ["#FF6347", "#00CED1"],
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

export default SeniorCharts;
