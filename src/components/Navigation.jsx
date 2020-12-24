import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import '../App.css';
import firebase from 'firebase';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import { useQuery, gql } from '@apollo/react-hooks';
import { AppBar, Toolbar } from '@material-ui/core';

const Navigation = () => {
	// const { currentUser } = useContext(AuthContext);
	// return currentUser ? <NavigationAuth /> : <NavigationNonAuth />;
	return <NavigationAuth />;
};

const NavigationAuth = () => {
	// const GET_USER = gql`
	// 	query($userId: ID!) {
	// 		getUser(userId: $userId) {
	// 			name
	// 		}
	// 	}
	// `;

	// const userID = firebase.auth().currentUser.uid;
	// const { isloading, data } = useQuery(GET_USER, {
	// 	variables: {
	// 		userId: userID
	// 	}
	// });

	// if (isloading || !data) {
	// 	return <div>Loading</div>;
	// }

	return (
		<div>
			<nav className="navigation">
				<AppBar position="relative" style={{ background: '#2E3B55' }}>
					<Toolbar>
						<div className="links title">
							<HomeIcon />
							<NavLink exact to="/home" activeClassName="active">
								Dashboard
							</NavLink>
						</div>

						<div className="links title">
							<NavLink
								exact
								to="/jackson"
								activeClassName="active"
							>
								Jackson
							</NavLink>
						</div>

						<div className="links title">
							<BookmarkIcon />
							<NavLink
								exact
								to="/favorites"
								activeClassName="active"
							>
								Favorites
							</NavLink>
						</div>
					</Toolbar>
				</AppBar>
			</nav>
		</div>
	);
};

// const NavigationNonAuth = () => {
// 	return (
// 		<div>
// 			<nav className="navigation">
// 				<AppBar position="relative" style={{ background: '#2E3B55' }}>
// 					<Toolbar style={{ color: 'black' }}>
// 						<div className="links title">
// 							<NavLink
// 								exact
// 								to="/"
// 								activeClassName="active"
// 								id="landing"
// 							>
// 								Landing
// 							</NavLink>
// 						</div>

// 						<div className="links title">
// 							<NavLink
// 								exact
// 								to="/signup"
// 								activeClassName="active"
// 							>
// 								Sign-up
// 							</NavLink>
// 						</div>
// 						<div className="links title">
// 							<NavLink
// 								exact
// 								to="/signin"
// 								activeClassName="active"
// 							>
// 								Sign-In
// 							</NavLink>
// 						</div>
// 					</Toolbar>
// 				</AppBar>
// 			</nav>
// 		</div>
// 	);
// };

export default Navigation;
