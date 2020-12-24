import React, { useState, useRef, useEffect } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import osm from './osm-providers';
import useGeoLocation from '../hooks/useGeoLocation';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { makeStyles } from '@material-ui/core/styles';
import {
	Button,
	Typography,
	Grid,
	Accordion,
	AccordionSummary,
	AccordionDetails
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import altIcon from '../images/trail_marker_3.png';
import altTrailImage from '../images/temp_trail_image.jpeg';
import { useQuery, gql } from '@apollo/react-hooks';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import uuid from 'react-uuid';
import XCCard from './TrailCards/XCCard';
import AlpineCard from './TrailCards/AlpineCard';
import Iframe from 'react-iframe';

let DefaultIcon = L.icon({
	iconUrl: icon,
	shadowUrl: iconShadow
});

let AltIcon = L.icon({
	iconUrl: altIcon,
	iconSize: [40, 40]
});

const style = {
	position: 'fixed',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)'
};
L.Marker.prototype.options.icon = DefaultIcon;

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
		minWidth: 200,
		maxWidth: 500,
		minHeight: 300,
		maxHeight: 350
	},
	media: {
		height: 140
	},
	control: {
		padding: 5
	}
});

const GET_TRAILS = gql`
	query trails($lat: Float!, $long: Float!) {
		listTrails(lat: $lat, long: $long) {
			id
			summary
			name
			img
			lat
			long
		}
	}
`;

const Home = (props) => {
	let inputLat;
	let inputLong;
	let trailMarkers;
	const [center, setCenter] = useState({ lat: 40.7451, lng: -74.0248 });
	const { isloading, error, data, refetch } = useQuery(GET_TRAILS, {
		variables: { lat: center.lat, long: center.lng }
	});
	const location = useGeoLocation();
	let cards = [];
	const elements = Array(15)
		.fill()
		.map((_, i) => String(342 + i));

	const ZOOM_LEVEL = 9;
	const mapRef = useRef();
	const classes = useStyles();

	if (isloading || !location.loaded) {
		return (
			<div style={style}>
				<Loader
					className="Loader"
					type="Grid"
					color="#00BFFF"
					height={60}
					width={60}
				/>
			</div>
		);
	}

	// if (error) {
	// 	return <div>Unexpected Error: {error}</div>;
	// }

	if (data?.listTrails) {
		let newCards = data.listTrails.map((trail) => {
			return (
				<XCCard
					id={trail.id}
					img={trail.img || altTrailImage}
					name={trail.name}
					summary={trail.summary}
				/>
			);
		});
		trailMarkers = data.listTrails.map((trail) => {
			return (
				<Marker
					key={uuid()}
					icon={AltIcon}
					position={[trail.lat, trail.long]}
				>
					<Popup>{trail.name}</Popup>
				</Marker>
			);
		});
		cards = newCards;
	}

	const showMyLocation = () => {
		console.log(location);
		const { current = {} } = mapRef;
		const { leafletElement: map } = current;

		if (location.loaded && !location.error) {
			map.flyTo(
				[location.coordinates.lat, location.coordinates.lng],
				ZOOM_LEVEL,
				{
					animate: true,
					duration: 0.5
				}
			);
			console.log({
				lat: location.coordinates.lat,
				lng: location.coordinates.lng
			});

			setCenter({
				lat: location.coordinates.lat,
				lng: location.coordinates.lng
			});

			setCenter((center) => {
				console.log(center);
				return center;
			});
		} else {
			alert('loading location...');
		}
	};

	return (
		<Grid container className={classes.control} spacing={1}>
			<Grid item xs={6}>
				<Map ref={mapRef} center={center} zoom={ZOOM_LEVEL}>
					<TileLayer
						url={osm.maptiler.url}
						attribution={osm.maptiler.attribution}
					/>

					{location.loaded && !location.error && (
						<>
							<Marker
								icon={DefaultIcon}
								position={[center.lat, center.lng]}
							>
								<Popup>You are here!</Popup>
							</Marker>
							{trailMarkers}
						</>
					)}
				</Map>

				<div className="row my-4 coordInputs">
					<form
						className="form"
						id="find-location"
						onSubmit={(e) => {
							e.preventDefault();
							setCenter({
								lat: parseFloat(inputLat.value),
								lng: parseFloat(inputLong.value)
							});
							setCenter((center) => {
								console.log(center);
								return center;
							});
							refetch();
							inputLat.value = '';
							inputLong.value = '';
						}}
					>
						<label htmlFor="inputLat">Latitude</label>
						<input
							type="number"
							step="0.0001"
							id="inputLat"
							name="inputLat"
							placeholder="Latitude"
							ref={(node) => {
								inputLat = node;
							}}
							required
							autoFocus={true}
						></input>

						<label htmlFor="inputLong">Longitude</label>
						<input
							type="number"
							step="0.0001"
							id="inputLong"
							name="inputLong"
							placeholder="Longitude"
							ref={(node) => {
								inputLong = node;
							}}
							required
							autoFocus={true}
						></input>

						<Button
							variant="contained"
							color="default"
							type="submit"
						>
							Submit
						</Button>
					</form>
					<div className="col d-flex justify-content-center">
						<Button
							color="primary"
							variant="contained"
							onClick={showMyLocation}
							disabled={!location.loaded}
						>
							{' '}
							Locate Me
						</Button>
					</div>
				</div>
			</Grid>

			<Grid item xs={6}>
				<Accordion TransitionProps={{ unmountOnExit: true }}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
					>
						<Typography className={classes.heading}>
							Nordic
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Suspendisse malesuada lacus ex, sit amet
							blandit leo lobortis eget.
						</Typography>
					</AccordionDetails>
				</Accordion>
				<Accordion TransitionProps={{ unmountOnExit: true }}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel3a-content"
						id="panel3a-header"
					>
						<Typography className={classes.heading}>
							BackCountry
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Grid container spacing={2}>
							{/* {cards} */}
							<Grid item width={1}>
								<Iframe
									width="650px"
									height="469"
									src="https://www.powderproject.com/widget/conditions?v=3&x=-7934068&y=5505092&z=10&height=700"
								/>
							</Grid>
						</Grid>
					</AccordionDetails>
				</Accordion>

				<Accordion TransitionProps={{ unmountOnExit: true }}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel2a-content"
						id="panel2a-header"
					>
						<Typography className={classes.heading}>
							Alpine
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Grid container spacing={2}>
							{/* {elements.map((value, index) => {
								return <AlpineCard key={index} id={value} />;
							})} */}
							<Grid item spacing={1}>
								<Iframe
									id="o92487"
									width="600"
									height="469"
									border="0"
									frameborder="0"
									scrolling="no"
									src="https://www.onthesnow.com/widget/list?regionId=252&color=b"
								/>
							</Grid>
						</Grid>
					</AccordionDetails>
				</Accordion>
			</Grid>
		</Grid>
	);
};
export default Home;
