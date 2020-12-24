import React, { useState } from 'react';
import 'react-multi-email/style.css';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Backdrop, Fade, Button } from '@material-ui/core';
import { ReactMultiEmail, isEmail } from 'react-multi-email';
import { init } from 'emailjs-com';

init('user_J1PtI5yaJrAIvR7rH1SXz');

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3)
	}
}));

export default function ShareModal(props) {
	let body;
	if (props.type === 'trail') {
		body = `Hey, I found a cool trail we should checkout! https://dev.d2kuny68xeo7bn.amplifyapp.com/trails/${props.id}`;
	} else if (props.type === 'group') {
		body = `Hey, I found a cool group we should checkout! https://dev.d2kuny68xeo7bn.amplifyapp.com/groups/${props.id}`;
	}

	let [emails, setEmails] = useState([]);
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button variant="outlined" color="primary" onClick={handleOpen}>
				{props.type === 'trail' ? 'Share Trail' : 'Share Group'}
			</Button>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						<h2 id="transition-modal-title">
							{props.type === 'trail'
								? 'Share a Trail!'
								: 'Share a Group!'}
						</h2>
						<form
							className="form"
							id="share-trail"
							onSubmit={(e) => {
								e.preventDefault();
								console.log(emails);
								console.log(body.value);
								for (var i = 0; i < emails.length; i++) {
									console.log(emails[i]);
									console.log(body.value);
									axios
										.post(
											'https://api.emailjs.com/api/v1.0/email/send',
											{
												service_id: 'service_yhc20h5',
												template_id: 'template_do6i7bp',
												user_id:
													'user_J1PtI5yaJrAIvR7rH1SXz',
												template_params: {
													message: body.value,
													to_email: emails[i]
												}
											}
										)
										.then(function (response) {
											console.log(response);
											alert('Message Sent!');
										})
										.catch(function (error) {
											console.log(error);
										});
								}

								body.value = '';
							}}
						>
							<label htmlFor="emails">Emails</label>

							<ReactMultiEmail
								placeholder="placeholder"
								emails={emails}
								onChange={(_emails) => {
									setEmails(_emails);
								}}
								validateEmail={(email) => {
									return isEmail(email); // return boolean
								}}
								getLabel={(
									email,
									index,
									removeEmail = index
								) => {
									return (
										<div data-tag key={index}>
											{email}
											<span
												data-tag-handle
												onClick={() =>
													removeEmail(index)
												}
											>
												×
											</span>
										</div>
									);
								}}
							/>

							<br></br>
							<textarea
								className="body-modal"
								type="textarea"
								id="body"
								name="body"
								defaultValue={body}
								ref={(node) => {
									body = node;
								}}
								required
								autoFocus={true}
							></textarea>

							<Button color="secondary">
								<input type="submit" value="Submit" />
							</Button>
						</form>
					</div>
				</Fade>
			</Modal>
		</div>
	);
}
