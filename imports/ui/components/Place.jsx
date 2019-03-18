import React from 'react';
import { Meteor } from 'meteor/meteor';
import _ from '@railrunner16/raildash';
import Moment from 'react-moment';

import Places from '../../api/places';

export default class Place extends React.Component {
  constructor(props) {
    super(props);
    
    this.deleteThis = this.deleteThis.bind(this);
  }
  
  getAuthor() {
    console.log(this.props.place);
    return Meteor.users.findOne(this.props.place.ownerId);
  }
  
  deleteThis() {
    Places.deleteItem(this.props.place._id);
  }
  
  render() {
    return (
      <li>
        {Meteor.user() && Meteor.userId() == this.props.place.ownerId ?
          <button className="delete" onClick={this.deleteThis}>&times;</button>
        : ''}
        <h5>
          <b>{_.String.capitalize(this.props.place.name)}</b>
        </h5>
        <table>
          <tr>
            <th colspan={2}>Coordinates</th>
          </tr>
          <tr>
            <td><b>X</b></td>
            <td>{this.props.place.x}</td>
          </tr>
          <tr>
            <td><b>Y</b></td>
            <td>{this.props.place.y}</td>
          </tr>
          <tr>
            <td><b>Z</b></td>
            <td>{this.props.place.z}</td>
          </tr>
        </table>
        <table>
          <tr>
            <th colspan={2}>More Info</th>
          </tr>
          <tr>
            <td>Added By</td>
            <td>{this.props.place.ownerId == Meteor.userId() ? 'You!' : this.getAuthor().username}</td>
          </tr>
          <tr>
            <td>Added On</td>
            <td>
              <Moment titleFormat="YYYY/MM/DD" format="D MMM YYYY" withTitle>{this.props.place.createdAt}</Moment>
            </td>
          </tr>
        </table>
      </li>
    );
  }
}