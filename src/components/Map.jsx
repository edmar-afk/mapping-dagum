import { useState } from "react";import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from "react-leaflet";import "leaflet/dist/leaflet.css";import L from "leaflet";import api from "../assets/api";import Sidebar from "./Sidebar";import TopBar from "./TopBar";import FeedBack from "./FeedBack";import Households from "./pins/Households";delete L.Icon.Default.prototype._getIconUrl;L.Icon.Default.mergeOptions({
	iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
	iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
	shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const redIcon = new L.Icon({
	iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
	shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});

function ClickHandler({ onClick }) {
	useMapEvents({
		click(e) {
			onClick({ lat: e.latlng.lat, lng: e.latlng.lng });
		},
	});
	return null;
}

function Map() {
	const [, setIsVisible] = useState(false);
	const [coords, setCoords] = useState(null);
	const [categoryPins, setCategoryPins] = useState([]);
	const [activeCategory, setActiveCategory] = useState(null);

	const handleClick = (clickedCoords) => {
		setCoords(clickedCoords);
		setIsVisible(true);
	};

	const handleCategorySelect = async (categoryKey) => {
		setActiveCategory(categoryKey);
		try {
			const response = await api.get(`/api/${categoryKey}/`);
			setCategoryPins(response.data);
		} catch (error) {
			console.error(`Error fetching ${categoryKey} data:`, error);
			setCategoryPins([]);
		}
	};

	return (
		<div className="relative">
			<MapContainer
				center={[7.89961, 123.103254]}
				zoom={25}
				style={{ width: "100%", height: "100vh" }}>
				<TileLayer
					url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
					attribution="Tiles &copy; Esri &mdash; Source: Esri, Earthstar Geographics"
				/>
				<ClickHandler onClick={handleClick} />

				{coords && (
					<Marker
						position={[coords.lat, coords.lng]}
						icon={redIcon}>
						<Popup>
							Lat: {coords.lat.toFixed(5)}, Lng: {coords.lng.toFixed(5)}
						</Popup>
					</Marker>
				)}

				{activeCategory &&
					categoryPins
						.filter((item) => item.location && item.location.includes(","))
						.map((item) => {
							const [latStr, lngStr] = item.location.split(",");
							const lat = parseFloat(latStr);
							const lng = parseFloat(lngStr);

							if (isNaN(lat) || isNaN(lng)) return null;

							return (
								<Marker
									key={item.id}
									position={[lat, lng]}
									eventHandlers={{
										mouseover: (e) => {
											e.target.openPopup();
										},
										mouseout: (e) => {
											e.target.closePopup();
										},
									}}>
									<Popup maxWidth={800}>
										{activeCategory === "pwds" ? (
											<>
												Name: {item.people} <br />
												Age: {item.age} <br />
												Gender: {item.gender}
												<br />
												Description: "{item.description}" <br />
												Disability Type: {item.disability_type} <br />
											</>
										) : activeCategory === "infras" ? (
											<>
												Name: {item.name} <br />
												Type: {item.type} <br />
												<img
													src={item.image || "https://images.unsplash.com/photo-1499856871958-5b9627545d1a"}
													alt={item.name}
													style={{ width: "100%", height: "auto", marginTop: "5px" }}
												/>
											</>
										) : activeCategory === "seniors" ? (
											<>
												Name: {item.people} <br />
												Age: {item.age} <br />
												Gender: {item.gender}
											</>
										) : activeCategory === "households" ? (
											<>
												<div className="space-y-10">
													<div className="relative shadow-md sm:rounded-lg">
														<h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
															{item.family_name} Family
														</h2>

														{item.members && item.members.length > 0 ? (
															<table className="w-full text-sm text-left rtl:text-right text-gray-500">
																<thead className="text-xs text-gray-700 uppercase">
																	<tr>
																		<th
																			scope="col"
																			className="px-6 py-3 bg-gray-50">
																			Name
																		</th>
																		<th
																			scope="col"
																			className="px-6 py-3">
																			Age
																		</th>
																		<th
																			scope="col"
																			className="px-6 py-3 bg-gray-50">
																			Role
																		</th>
																		<th
																			scope="col"
																			className="px-6 py-3 bg-gray-50">
																			Occupation
																		</th>
																		<th
																			scope="col"
																			className="px-6 py-3 bg-gray-50">
																			Source of Income
																		</th>
																	</tr>
																</thead>
																<tbody>
																	{item.members.map((member, i) => (
																		<tr
																			key={i}
																			className="border-b border-gray-200">
																			<th
																				scope="row"
																				className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
																				{member.name}
																			</th>
																			<td className="px-6 py-4">{member.age}</td>
																			<td className="px-6 py-4 bg-gray-50">{member.role}</td>
																			<td className="px-6 py-4 bg-gray-50">{member.occupation}</td>
																			<td className="px-6 py-4 bg-gray-50">{member.source_income}</td>
																		</tr>
																	))}
																</tbody>
															</table>
														) : (
															<p className="text-gray-500 italic text-center">No family members found.</p>
														)}
													</div>
												</div>
											</>
										) : (
											"Unknown category"
										)}
									</Popup>
								</Marker>
							);
						})}
			</MapContainer>

			<Sidebar
				lat={coords?.lat}
				lng={coords?.lng}
				isVisible={true}
				onClose={() => setIsVisible(false)}
				categoryKey={activeCategory}
			/>

			<TopBar
				isVisible={true}
				onCategorySelect={handleCategorySelect}
				activeCategory={activeCategory}
			/>

			<FeedBack />
		</div>
	);
}

export default Map;
