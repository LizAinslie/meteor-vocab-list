import React from 'react';
import { Meteor } from 'meteor/meteor';
import _ from '@railrunner16/raildash';
import Moment from 'react-moment';

import Terms from '../../api/terms';

export default class Term extends React.Component {
  constructor(props) {
    super(props);
    
    this.deleteThis = this.deleteThis.bind(this);
  }
  
  getAuthor() {
    return Meteor.users.findOne(this.props.term.ownerId);
  }
  
  getPartOfSpeech() {
    switch (this.props.term.type) {
      case 0:
        return {
          letter: 'n',
          full: 'noun'
        };
      case 1:
        return {
          letter: 'v',
          full: 'verb'
        };
      case 2:
        return {
          letter: 'adj',
          full: 'adjective'
        };
    }
  }
  
  deleteThis() {
    Terms.deleteItem(this.props.term._id);
  }
  
  render() {
    return (
      <li>
        {Meteor.user() && Meteor.userId() == this.props.term.ownerId ?
          <button className="delete" onClick={this.deleteThis}>&times;</button>
        : ''}
        <h5>
          <b>{_.String.capitalize(this.props.term.name)}</b> <span className="text-muted">({this.getPartOfSpeech().letter}.)</span>
        </h5>
        <br />
        <b className="section">Definition:</b>
        <p>
          {_.String.upperFirst(this.props.term.definition)}
        </p>
        <table>
          <tr>
            <th colspan={2}>More Info</th>
          </tr>
          <tr>
            <td>Added By</td>
            <td>{this.props.term.ownerId == Meteor.userId() ? 'You!' : this.getAuthor().username}</td>
          </tr>
          <tr>
            <td>Added On</td>
            <td>
              <Moment titleFormat="YYYY/MM/DD" format="D MMM YYYY" withTitle>{this.props.term.createdAt}</Moment>
            </td>
          </tr>
        </table>
      </li>
    );
  }
}