import React from 'react';
import Iframe from 'react-iframe';
import { Paper, Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MapImage from '../images/Jackson_XC_Printed_Trail_Map_2018.pdf';

const useStyles = makeStyles({
	root: {
		flexGrow: 1
	}
});

const Jackson = () => {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div>
			<h1>Jackson!</h1>
			<Paper className={classes.root}>
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="primary"
					centered
				>
					<Tab label="Website" />
					<Tab label="Maps" />
					<Tab label="Trail Conditions" />
				</Tabs>
			</Paper>
			{
				{
					0: (
						<Iframe
							width={'650px'}
							height={'1000'}
							src="https://www.jacksonxc.org/trail-info/"
						/>
					),
					1: <embed src={MapImage} width="100%" height="2100px" />,
					2: <h1>2</h1>
				}[value]
			}
		</div>
	);
};

export default Jackson;
