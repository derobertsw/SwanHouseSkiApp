import { API } from 'aws-amplify';

import { useState, useEffect } from 'react';

const useHikingApi = (headers = {}) => {
	const [response, setResponse] = useState(null);
	const apiName = 'hikingAPI';
	const path = '/graphql';

	useEffect(() => {
		const myInit = {
			headers: headers
		};

		API.get(apiName, path, myInit)
			.then((response) => {
				setResponse(response);
			})
			.catch((error) => {
				console.log(error.response);
				setResponse(null);
			});
	}, [setResponse, headers]);

	return response;
};

export { useHikingApi };
