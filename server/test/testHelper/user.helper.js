import faker from 'faker';

const helper = {
  users: {
    username : faker.internet.userName(),
    firstname : faker.name.firstName(),
    lastname : faker.name.lastName(),
    email : faker.internet.email(),
    password : '012345',
    password_confirmation : '012345',
  },

  adminRole: {
    title: 'Admin'
  },
  regularRole: {
    title: 'Regular'
  },
  wrongUser: {
    username : 'Adamu234',
    firstname : 'Adamu',
    lastname : 'Musa',
    email : 'musa@musa.com',
    password : '1234',
    password_confirmation : '1234'
  },

  secondUser: {
    username : 'Chiomsky',
    firstname : 'Chioma',
    lastname : 'Chimeze',
    email : 'chiomsky@email.com',
    password : '123456',
    password_confirmation : '123456'
  },

  thirdUser: {
    username : faker.internet.userName(),
    firstname : faker.name.firstName(),
    lastname : faker.name.lastName(),
    email : faker.internet.email(),
    password : '987765',
    password_confirmation : '987765'
  },
  fourthUser: {
    username : faker.internet.userName(),
    firstname : faker.name.firstName(),
    lastname : faker.name.lastName(),
    email : faker.internet.email(),
    password : '865347',
    password_confirmation : '865347'
  },

  updateUserDetails: {
    username : faker.internet.userName(),
    firstname : faker.name.firstName(),
    lastname : faker.name.lastName(),
    email : faker.internet.email(),
    // password : '45567',
    // password_confirmation : '45567',
    roleId: 2

  },

};

export default helper;