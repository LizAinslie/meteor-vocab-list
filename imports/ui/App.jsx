import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import Place from './components/Place';
import NewPlace from './components/NewPlace';
import AccountsUIWrapper from './components/wrappers/AccountsUIWrapper';

import Places from '../api/places';

class App extends React.Component {
    renderPlaces() {
		return this.props.places.map(place => (
			<Place key={place._id} place={place} />
		));
	}
	
	render() {
		return (
			<div className="container">
				<AccountsUIWrapper />
				<header>
					<h1>KC Coordinates Sharer</h1>
				</header>
				{this.props.user ?
					<NewPlace />
				:
					<NewPlace disabled />
				}
				<ul className="vocab-list">
					{this.renderPlaces()}
				</ul>
			</div>
		);
	}
}

export default withTracker(({ id }) => {
	return {
		places: Places.getAll({ sort: { createdAt: -1 } }),
		user: Meteor.user()
	};
})(App);