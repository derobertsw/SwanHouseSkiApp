import React, { useState, useRef, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { makeStyles } from '@material-ui/core/styles';
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
import { Link } from 'react-router-dom';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import ShareModal from '../Modal/ShareModal';

const XCCard = (props) => {
	const useStyles = makeStyles({
		root: {
			flexGrow: 1,
			minWidth: 200,
			maxWidth: 500,
			minHeight: 300,
			maxHeight: 350,
			padding: 20
		},
		media: {
			height: 140
		}
	});

	const classes = useStyles();

	return (
		<Grid item xs={12} key={props.id} width={1}>
			<Card key={props.id}>
				<CardActionArea>
					<Link to={`/trails/${props.id}`}>
						<CardMedia
							className={classes.media}
							// className={classes}
							image={props.img}
							title={props.name}
							alt="trail card"
						/>
						<CardContent>
							<Typography
								gutterBottom
								variant="h5"
								component="h2"
							>
								{props.name}
							</Typography>
							<Typography
								variant="body2"
								color="textSecondary"
								component="p"
							>
								{props.summary}
							</Typography>
						</CardContent>
					</Link>
				</CardActionArea>
				<CardActions>
					<ShareModal id={props.id} type="trail" />
				</CardActions>
			</Card>
		</Grid>
	);
};
export default XCCard;
