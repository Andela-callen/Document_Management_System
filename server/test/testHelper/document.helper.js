/* eslint import/no-extraneous-dependencies: 0 */
/* eslint import/no-unresolved: 0 */
import faker from 'faker';

module.exports = {
  first: {
    title: faker.lorem.words(),
    content: faker.lorem.paragraph()
  },

  second: {
    title: faker.lorem.words(),
    content: faker.lorem.paragraph()
  },

  third: {
    title: faker.lorem.words(),
    content: faker.lorem.paragraph(),
    access: false
  },

  badDoc: {
    title: faker.lorem.words()
  },

  searchPublicDoc: {
    title: 'cooking',
    content: `cooking or cookery is the art, technology and craft of preparing 
      food for consumption with the use of heat. Cooking techniques and ingredients 
      vary widely across the world, from grilling food over an open fire to using 
      electric stoves, to baking in various types of ovens, reflecting     
      unique environmental, economic, and cultural traditions and trends.`
  },

  searchPrivateDoc: {
    title: 'Shoes',
    content: `Give a girl the right shoes, and she can conquer the world.`,
    access: false
  }
};