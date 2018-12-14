import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import Terms from '../../api/terms';

class NewTerm extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			partOfSpeech: 0,
			spanishError: false,
			englishError: false,
			errors: []
		};
		
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleSelectChange(event) {
		this.setState({
			partOfSpeech: Number(event.target.value)
		});
	}
	
	handleSubmit(event) {
		event.preventDefault();
		
		const name = ReactDOM.findDOMNode(this.refs.spanishInput).value.trim();
		const definition = ReactDOM.findDOMNode(this.refs.englishInput).value.trim();
		
		if (name.length <= 0 || definition.length <= 0) {
			if (name.length <= 0) {
				this.setState({
					spanishError: true
				});
				this.state.errors.push('Spanish word is missing.');
			}
			
			if (definition.length <= 0) {
				this.setState({
					englishError: true
				});
				this.state.errors.push('English definition is missing.');
			}
			
			return;
		}
		
		if (Terms.filter({ name: name.toLowerCase(), definition: definition.toLowerCase(), type: this.state.partOfSpeech }).length > 0) {
			this.setState({
				spanishError: true,
				englishError: true
			});
			this.state.errors.push('Term already exists!');
			return;
		}
		
		Terms.insert({
			name: name.toLowerCase(),
			definition: definition.toLowerCase(),
			type: this.state.partOfSpeech,
			ownerId: Meteor.userId()
		});
		
		ReactDOM.findDOMNode(this.refs.englishInput).value = '';
		ReactDOM.findDOMNode(this.refs.spanishInput).value = '';
		this.setState({
			errors: [],
			spanishError: false,
			englishError: false,
			partOfSpeech: 0
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
						className={this.getErrorClass(this.state.spanishError)} 
						type="text" 
						ref="spanishInput" 
						placeholder="Spanish word" />
					<input
						disabled={this.props.disabled} 
						className={this.getErrorClass(this.state.spanishError)} 
						type="text" 
						ref="englishInput" 
						placeholder="English word" />
					<select
						disabled={this.props.disabled} 
						value={this.state.partOfSpeech} 
						onChange={this.handleSelectChange}>
						<option value={0}>Noun</option>
						<option value={1}>Verb</option>
						<option value={2}>Adjective</option>
					</select>
					<input disabled={this.props.disabled} type="submit" value="Save this term!" />
				</form>
			</div>
		);
	}
}

export default NewTerm;