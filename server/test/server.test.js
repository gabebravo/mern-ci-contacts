// import packages and local files
const expect = require('expect');
const request = require('supertest');
const {app} = require('../server');
const { Contact } = require('../models/contact'); // this is the collection name
const {ObjectID} = require('mongodb');
const {contacts, populateContacts} = require('../seed/seed');

beforeEach(populateContacts);

describe('GET /contact && GET /contact/find', () => {
  it('should get all contacts', done => {
    request(app)
      .get('/contact')
      .expect(200)
      .expect( res => {
        expect(res.body).toExist(); // data should be there
        expect(res.body.length).toEqual(2); // contacts array length
        expect(res.body[0]).toIncludeKeys(['name', 'email']); // has these keys
      })
      .end(done);
  });

  it('get a single contact by id', done => {
    request(app)
      .get(`/contact/find/?id=${contacts[0]._id}`)
      .expect(200)
      .expect( res => {
        expect(res.body).toExist();
        expect(res.body.name).toEqual(contacts[0].name);
        expect(res.body.email).toEqual(contacts[0].email);
      })
      .end(done);
  });
});

describe('POST /contact/create', () => { 
    it('should create a new contact', done => {
      const contact3 = { name : "Third Contact",
      email: "contact3@gmail.com" };
      request(app)
        .post('/contact/create')
        .send(contact3)
        .expect(200)
        .expect( res => { // check the response
          const {contact} = res.body;
          expect(contact).toExist();
          expect(contact.name).toBe(contact3.name);
          expect(contact.email).toBe(contact3.email);
          contacts.push(contact);
        })
        .end( (err, res) => { // query DB block
          if(err){ return done(err); }
          const {contact} = res.body;
          Contact.findOne({ name: contact.name, email: contact.email })
            .then( contact => {
              expect(contact._id).toExist();
              done();
            }).catch( e => done(e));
        });
    });
});

//   it('handles a PUT request to /contact/edit', (done) => {
//     const updateTestContact = new Contact({ name: 'John Doe', email: 'test@test.com' })
//       updateTestContact.save().then( contact => {
//         request(app)
//           .put('/contact/edit')
//           .send({ id: contact._id, email: 'test@test.com', name: 'Jane Doe' })
//           .end( (err, response) => {
//              assert(response.body.name === 'Jane Doe');
//              assert(response.body.email === 'test@test.com');
//             done();
//         });
//       });
//   });

//   it('handles a DELETE request to /contact/delete', (done) => {
//     const testUser = new Contact({ name: 'John Doe', email: 'test@test.com'});
//     const testUser2 = new Contact({ name: 'Jane Doe', email: 'test2@test.com'});
//     const testUser3 = new Contact({ name: 'John Snow', email: 'test3@test.com'});
//     Promise.all([ testUser.save(), testUser2.save(), testUser3.save() ])
//       request(app)
//           .delete('/contact/delete?email=test@test.com')
//           .end( (err, response) => {        
//             assert(response.body.contacts.length === 2);
//             assert( typeof response.body.contacts === 'object' );
//             assert(response.body.message === 'the contact was successfully deleted');
//             Contact.findOne({ email: 'test@test.com' })
//               .then( contact => {
//                assert(contact === null);
//             })
//             done();
//         });
//   });

// });
