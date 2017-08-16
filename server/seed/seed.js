const { Contact } = require('../models/contact'); // this is the collection name
const {ObjectID} = require('mongodb');

// seed the data for a mock db
const contacts = [
  { /* 1 */
    _id: new ObjectID(),
    "name" : "First Contact",
    "email" : "contact1@gmail.com",
  }, 
  { /* 2 */
    _id: new ObjectID(),
    "name" : "Second Contact",
    "email" : "contact2@gmail.com"
  }
];

// before any tests the test db is destroyed
const populateContacts = done => {
  Contact.remove({}) // removes todos in test db every time
    .then( () => { // saves the todos above to the mock db
      return Contact.insertMany(contacts)
    })
    .then( () => done()); // then we exit 
}

module.exports = {contacts, populateContacts}