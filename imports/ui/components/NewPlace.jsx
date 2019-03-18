import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import Places from '../../api/places';

class NewPlace extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			errors: [],
			nameError: false,
			xError: false,
			yError: false,
			zError: false,
		};
		
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleSubmit(event) {
		event.preventDefault();
		
		const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
		
		if (name.length <= 0) {
			this.setState({
				nameError: true
			});
			this.state.errors.push('Point of Interest is missing.');
			return;
		}
		
		Places.insert({
			name: name.toLowerCase(),
			x: Number(ReactDOM.findDOMNode(this.refs.xInput).value.trim()),
			y: Number(ReactDOM.findDOMNode(this.refs.yInput).value.trim()),
			z: Number(ReactDOM.findDOMNode(this.refs.zInput).value.trim()),
			ownerId: Meteor.userId()
		});
		
		ReactDOM.findDOMNode(this.refs.nameInput).value = '';
		ReactDOM.findDOMNode(this.refs.xInput).value = 0;
		ReactDOM.findDOMNode(this.refs.yInput).value = 0;
		ReactDOM.findDOMNode(this.refs.zInput).value = 0;
		
		this.setState({
			errors: [],
			nameError: false,
			xError: false,
			yError: false,
			zError: false,
		});
	}
	
	getErrorClass(err) {
		return err ? 'error' : '';
	}
	
	render() {
		return (
			<div class="form-wrap">
				<form className="new-term" onSubmit={this.handleSubmit} >
					{this.state.errors.length > 0 ?
						<ul className="errors">
							{this.state.errors.map(err => (
								<li className="error">{err}</li>
							))}
						</ul>
					: ''}
					<input 
						disabled={this.props.disabled}
						className={this.getErrorClass(this.state.nameError)} 
						type="text" 
						ref="nameInput"
						placeholder="Point Of Interest" />
					<input
						disabled={this.props.disabled} 
						className={this.getErrorClass(this.state.xError)} 
						type="number"
						ref="xInput" 
						placeholder="X Coordinate" />
					<input
						disabled={this.props.disabled} 
						className={this.getErrorClass(this.state.yError)} 
						type="number"
						ref="yInput" 
						placeholder="Y Coordinate" />
					<input
						disabled={this.props.disabled} 
						className={this.getErrorClass(this.state.zError)} 
						type="number"
						ref="zInput" 
						placeholder="Z Coordinate" />
					<input disabled={this.props.disabled} type="submit" value="Save this place!" />
				</form>
			</div>
		);
	}
}

export default NewPlace;