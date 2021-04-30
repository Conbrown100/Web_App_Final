import React, { Component } from 'react';

class Dashboard extends Component {
	/*
	   declare a member variable to hold the interval ID
	   that we can reference later.
	 */
	intervalID;

	componentDidMount() {
		/*
		   need to make the initial call to getData() to populate
		   data right away
		 */
		this.getData();

		/*
		   Now we need to make it run at a specified interval,
		   bind the getData() call to `this`, and keep a reference
		   to the invterval so we can clear it later.
		 */
		this.intervalID = setInterval(this.getData.bind(this), 5000);
	}

	componentWillUnmount() {
		/*
		   stop getData() from continuing to run even
		   after unmounting this component
		 */
		clearInterval(this.intervalID);
	}

	getData = () => {
		//get data
	}

	render() {
		return (
				<div>
				Dashboard
				</div>
		       );
	}
}














