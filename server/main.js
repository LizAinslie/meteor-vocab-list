import { Meteor } from 'meteor/meteor';
import Terms from '/imports/api/terms';

Meteor.startup(() => {
  if (Terms.length === 0) {
    // maybe add some terms
  }
});
