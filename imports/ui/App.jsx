import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import Term from './components/Term';
import NewTerm from './components/NewTerm';
import AccountsUIWrapper from './components/wrappers/AccountsUIWrapper';

import Terms from '../api/terms';

class App extends React.Component {
    renderTerms() {
		return this.props.terms.map(term => (
			<Term key={term._id} term={term} />
		));
	}
	
	render() {
		return (
			<div className="container">
				<AccountsUIWrapper />
				<header>
					<h1>Vocab List</h1>
				</header>
				{this.props.user ?
					<NewTerm />
				:
					<NewTerm disabled />
				}
				<ul className="vocab-list">
					{this.renderTerms()}
				</ul>
			</div>
		);
	}
}

export default withTracker(({ id }) => {
	return {
		terms: Terms.getAll({ sort: { createdAt: -1 } }),
		user: Meteor.user()
	};
})(App);