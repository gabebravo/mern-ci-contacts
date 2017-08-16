// import mongoose db & models
const express = require('express');
const router = express.Router();
const { Contact } = require('../models/contact');

const getConnected = (req, res) => {
  res.send({ message: 'most basic get route'});
}

const createContact = (req, res) => {
  const newContact = new Contact(req.body);
  newContact.save()
    .then( contact => {
      res.status(200).json({ 
        contact: { name: contact.name, email: contact.email },
        message: 'the contact was successfully saved'
      });
    })
    .catch( error => {
      console.log(error);
      res.status(400).json({ message: 'the user could not be saved' });
    });
}

const getContacts = (req, res) => {
  Contact.find({}, { _id: 1, name: 1, email: 1 })
    .then( contacts => {
      res.status(200).json(contacts);
    })
    .catch( error => {
      console.log(error);
      res.status(400).json({ message: error.message });
    });
}

const editContact = (req, res) => {
  Contact.findByIdAndUpdate(req.body.id, { name: req.body.name, email: req.body.email}, {new: true})
    .then( contact => {
      res.status(200).json({
        name: contact.name,
        email: contact.email, 
        message: 'the contact was successfully updated'
      });
    })
    .catch( error => {
      console.log(error);
      res.status(400).json({ message: error.message });
    });
}

const deleteContact = (req, res) => {
  Contact.remove({ email: req.query.email })
    .then( () => {
      Contact.find({}, { _id: 0, name: 1, email: 1 })
        .then( contacts => {
          res.status(200).json({contacts, message: 'the contact was successfully deleted'});
        })
    })
    .catch( error => {
      console.log(error);
      res.status(400).json({ message: error.message });
    });
}

const findContact = (req, res) => {
  Contact.findById(req.query.id, { _id: 0, name: 1, email: 1 })
    .then( contact => {
      res.status(200).json(contact);
    })
    .catch( error => {
      console.log(error);
      res.status(400).json({ message: error.message });
    });
}

// tester
router.get('/start', getConnected);

// routes
router.post('/create', createContact);
router.get('/', getContacts);
router.put('/edit', editContact);
router.delete('/delete', deleteContact);
router.get('/find', findContact);

//export routes
module.exports = router;