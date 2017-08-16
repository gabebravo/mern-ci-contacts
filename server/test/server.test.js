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
        .expect( res => { // check the test response
          const {contact} = res.body;
          expect(contact).toExist();
          expect(contact.name).toBe(contact3.name);
          expect(contact.email).toBe(contact3.email);
          contacts.push(contact);
        })
        .end( (err, res) => { // check the actual DB response
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

describe('PUT /contact/edit', () => {
    it('handles a PUT request to /contact/edit', done => {
      request(app)
        .put('/contact/edit')
        .send({ id: contacts[0]._id, name: "First Contact Updated", email: "contact1@gmail.com", })
        .expect(200)
        .expect( res => {
          expect(res.body.name).toBe('First Contact Updated');
          expect(res.body.email).toBe(contacts[0].email);
        })
        .end( (err, res) => { // query DB block
          if(err){ return done(err); }
          const {name, email} = res.body;
          Contact.findOne({ name, email })
            .then( contact => {
              expect(contact.name).toBe('First Contact Updated');
              done();
            }).catch( e => done(e));
        });
    });
})

describe('DELETE /contact/delete', () => {
  it('handles a DELETE request to /contact/delete', done => { 
    request(app)
      .delete(`/contact/delete?email=${contacts[2].email}`)
      .expect(200)
      .expect( res => {
        expect(res.body).toExist(); // data should be there
        expect(res.body.contacts.length).toEqual(2); // contacts array length
        expect(res.body.contacts[0]).toIncludeKeys(['name', 'email']); // has these keys
      })
      .end( (err, res) => { // query DB block
        if(err){ return done(err); }
        Contact.find({})
          .then( contact => {
            expect(contact.length).toEqual(2); // contacts array length 2 => 3rd user deleted
            done();
          }).catch( e => done(e));
      });
  });
});
