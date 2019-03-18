import { Meteor } from 'meteor/meteor';
import Places from '/imports/api/places';

Meteor.startup(() => {
  if (Places.length === 0) {
    // maybe add some terms
  }
});
