import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
	Grid,
	Accordion,
	AccordionSummary,
	AccordionDetails
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const API_URL = 'https://skimap.org/SkiAreas/view/';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex'
	},
	details: {
		display: 'flex',
		flexDirection: 'column'
	},
	content: {
		flex: '1 0 auto'
	},
	map: {
		width: 151
	}
}));

const AlpineCard = (props) => {
	const [loading, setLoading] = useState(true);
	const [mountainData, setMountainData] = useState([]);
	const [error, setError] = useState(false);

	const classes = useStyles();

	useEffect(() => {
		async function getMountains() {
			try {
				const { data } = await axios.get(`${API_URL}/${props.id}.json`);
				mountainData.ski_maps &&
					console.log(mountainData.ski_maps[0].media.original.url);
				setMountainData(data);
				setLoading(false);
			} catch (e) {
				console.log(e);
				setError(true);
			}
		}
		getMountains();
	}, [JSON.stringify(mountainData)]);

	return (
		<Grid item xs={12} key={props.id} width={1}>
			<Card key={props.id}>
				<CardActionArea>
					<div>
						<CardContent>
							<Typography
								gutterBottom
								variant="h5"
								component="h2"
							>
								{mountainData.name}
							</Typography>
							<Typography
								variant="body2"
								color="textSecondary"
								component="p"
							>
								{mountainData.official_website}
								{mountainData.latitude},{' '}
								{mountainData.longitude}
							</Typography>
						</CardContent>
					</div>
					{mountainData.ski_maps && (
						<CardMedia
							square
							imageUrl={
								mountainData.ski_maps[0].media.original.url
							}
							title="Map"
						/>
					)}
				</CardActionArea>
				{/* <CardActions>
						 <ShareModal id={props.id} type="trail" /> 
					</CardActions> */}
			</Card>
		</Grid>
	);
};

export default AlpineCard;
