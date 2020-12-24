import React from 'react';
import './App.css';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { AuthProvider } from './firebase/Auth';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Box } from '@material-ui/core';
import Account from './components/AuthComponents/Account';
import Home from './components/Home';
import Navigation from './components/Navigation';
import SignIn from './components/AuthComponents/SignIn';
import SignUp from './components/AuthComponents/SignUp';
import PrivateRoute from './components/AuthComponents/PrivateRoute';
import Trail from './components/trailComponents/Trail';
import Favorites from './components/Favorites';
import HeaderImage from './images/ski_app_header.jpeg';
import Error from './components/Error';
import Jackson from './components/Jackson';

Amplify.configure(awsconfig);

const { endpoint } = awsconfig.aws_cloud_logic_custom[0];

/* Create client using the GraphQL endpoint  */
const client = new ApolloClient({
	uri: endpoint + '/graphql'
});

function App() {
	return (
		<Router>
			<Box
				height="200px"
				display="flex"
				className="App"
				alignItems="center"
				justifyContent="center"
				style={{
					backgroundImage: `url(${HeaderImage})`
				}}
			>
				<Navigation />
			</Box>
			<Switch>
				<Route exact path="/" component={Home} />
				<PrivateRoute path="/home" component={Home} />
				<PrivateRoute exact path="/trails/:id" component={Trail} />
				<PrivateRoute exact path="/jackson" component={Jackson} />
				<PrivateRoute exact path="/favorites" component={Favorites} />

				<Route path="/signin" component={SignIn} />
				<Route path="/signup" component={SignUp} />
				<Route component={Error} />
			</Switch>
		</Router>
	);
}

const AppWithProvider = () => (
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
);

export default AppWithProvider;
