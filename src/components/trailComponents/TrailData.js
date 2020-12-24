import React, { useContext, useEffect } from 'react';
import { useQuery, gql, useMutation } from '@apollo/react-hooks';
import {
	Paper,
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	Avatar,
	Divider
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import CallMadeIcon from '@material-ui/icons/CallMade';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import StarRateIcon from '@material-ui/icons/StarRate';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import '../../App.css';

import { AuthContext } from '../../firebase/Auth';

function TrailData(props) {
	const { currentUser } = useContext(AuthContext);
	const userID = currentUser.$b.uid;

	const useStyles = makeStyles((theme) => ({
		root: {
			width: '100%',
			maxWidth: 360
		}
	}));

	const classes = useStyles();

	const difficulty = {
		green: 'Easy',
		blue: 'Intermediate',
		blueBlack: 'Hard',
		black: 'Very Hard'
	};

	//fetch and calculated rating
	const query = gql`
		query getTrail($trailID: [ID]!) {
			getTrailsById(trailId: $trailID) {
				ratings {
					rating
				}
			}
		}
	`;
	const UPDATE = gql`
		mutation($userId: ID!, $trailId: ID!, $rating: Float!) {
			addRating(userId: $userId, trailId: $trailId, rating: $rating) {
				userId
			}
		}
	`;

	const [updateRat] = useMutation(UPDATE);

	useEffect(() => {
		console.log('loaded');
		reload();
	}, []);

	const { isloading, error, data, refetch } = useQuery(query, {
		variables: {
			trailID: props.trailID
		}
	});

	if (error) {
		return <div>Error</div>;
	}

	function calcRating() {
		let finalRating = 0;
		if (data.getTrailsById[0].ratings) {
			data.getTrailsById[0].ratings.forEach((key) => {
				finalRating = finalRating + key.rating;
			});
		}
		console.log(finalRating);

		if (finalRating === 0 || isNaN(finalRating)) {
			return 0;
		} else {
			return finalRating / data.getTrailsById[0].ratings.length;
		}
	}
	//

	//update rating

	function reload() {
		refetch();
	}
	//

	return (
		<div>
			<Paper elevation={3}>
				<List className={classes.root}>
					<ListItem>
						<ListItemAvatar>
							<Avatar>
								<StarRateIcon />
							</Avatar>
						</ListItemAvatar>

						<Rating
							name="hover-feedback"
							precision={0.5}
							value={calcRating()}
							onChange={(event, newValue) => {
								updateRat({
									variables: {
										userId: userID,
										trailId: props.trailID,
										rating: newValue
									}
								});
								reload();
								console.log(newValue);
							}}
						/>

						<br />
						<ListItemText
							secondary={`${data.getTrailsById[0].ratings.length} ratings`}
						/>
					</ListItem>
					<Divider variant="inset" component="li" />
					<ListItem>
						<ListItemAvatar>
							<Avatar>
								<FitnessCenterIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText
							primary={difficulty[props.difficulty]}
							secondary="Difficulty"
						/>
					</ListItem>
					<Divider variant="inset" component="li" />
					<ListItem>
						<ListItemAvatar>
							<Avatar>
								<DirectionsRunIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText
							primary={`${props.length} miles`}
							secondary="Total Distance"
						/>
					</ListItem>
					<Divider variant="inset" component="li" />
					<ListItem>
						<ListItemAvatar>
							<Avatar>
								<CallMadeIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText
							primary={`${props.ascent} ft`}
							secondary="Distance to Ascent"
						/>
					</ListItem>
					{props.conditionStatus !== 'Unknown' && (
						<div>
							<Divider variant="inset" component="li" />
							<ListItem>
								<ListItemAvatar>
									<Avatar>
										<WbSunnyIcon />
									</Avatar>
								</ListItemAvatar>

								<ListItemText
									primary={`${props.conditionStatus} and ${props.conditionDetails}`}
									secondary={`Current Conditions as of ${props.conditionDate}`}
								/>
							</ListItem>
						</div>
					)}
				</List>
			</Paper>
		</div>
	);
}

export default TrailData;
