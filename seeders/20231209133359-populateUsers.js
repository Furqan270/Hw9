'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Users', [
    {
      name: 'admin',
      email: 'admin@gmail.com',
      password: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()

   },{
   name: 'admin2',
      email: 'admin2@gmail.com',
      password: 'admin2',
      createdAt: new Date(),
      updatedAt: new Date()
   }
  ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
