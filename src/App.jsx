import React from 'react';
import './App.css';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Box } from '@material-ui/core';
import Home from './components/Home';
import Navigation from './components/Navigation';
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
				<Route path="/home" component={Home} />
				<Route exact path="/trails/:id" component={Trail} />
				<Route exact path="/jackson" component={Jackson} />
				<Route exact path="/favorites" component={Favorites} />
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
