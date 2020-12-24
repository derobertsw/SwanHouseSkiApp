import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Chip, Paper } from '@material-ui/core';
import { useQuery, gql, useMutation } from '@apollo/react-hooks';
import firebase from 'firebase';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import uuid from 'react-uuid';

function Comments(props) {
	const [newComment, setNewComment] = useState('');

	const COMMENT_MUTATION = gql`
		mutation addComment($trailId: ID!, $username: String!, $text: String!) {
			addComment(trailId: $trailId, username: $username, text: $text) {
				username
				text
			}
		}
	`;

	const GET_COMMENTS = gql`
		query getTrail($trailID: [ID]!) {
			getTrailsById(trailId: $trailID) {
				comments {
					username
					text
				}
			}
		}
	`;

	const GET_USER = gql`
		query($userId: ID!) {
			getUser(userId: $userId) {
				name
			}
		}
	`;

	const [addComment] = useMutation(COMMENT_MUTATION);

	const { isloading, error, data, refetch } = useQuery(GET_COMMENTS, {
		variables: {
			trailID: props.trailId
		}
	});

	const { data: userData } = useQuery(GET_USER, {
		variables: {
			userId: firebase.auth().currentUser.uid
		}
	});

	const useStyles = makeStyles((theme) => ({
		root: {
			width: '100%',
			maxWidth: 360
		}
	}));

	const handleSubmit = (event) => {
		event.preventDefault();

		if (/\S/.test(newComment)) {
			addComment({
				variables: {
					trailId: props.trailId,
					username: userData.getUser.name,
					text: newComment
				}
			});
			refetch();

			setNewComment('');
		}
	};

	const classes = useStyles();

	if (error) {
		return <div>Unexpected Error: {error}</div>;
	}

	return (
		<div>
			{data?.getTrailsById &&
				data.getTrailsById[0].comments.map(function ({
					username,
					text
				}) {
					return (
						<Container maxWidth="sm" key={uuid()}>
							<Paper elevation={3}>
								<div>
									<Chip
										label={username}
										size="small"
										variant="outlined"
									/>
									<h3 className="comText">{text}</h3>
								</div>
							</Paper>
						</Container>
					);
				})}
			<Container maxWidth="sm">
				<Paper>
					{isloading ? (
						<Loader
							type="Grid"
							color="#00BFFF"
							height={80}
							width={80}
						/>
					) : (
						<form
							onSubmit={handleSubmit}
							className={classes.root}
							noValidate
							autoComplete="off"
						>
							<TextField
								id="standard-basic"
								label="Add a Comment"
								value={newComment}
								onInput={(e) => setNewComment(e.target.value)}
								multiline
								rowsMax={4}
							/>
							<br />
							<Button
								type="submit"
								value="Submit"
								size="small"
								color="primary"
							>
								Submit
							</Button>
						</form>
					)}
				</Paper>
			</Container>
		</div>
	);
}

export default Comments;
