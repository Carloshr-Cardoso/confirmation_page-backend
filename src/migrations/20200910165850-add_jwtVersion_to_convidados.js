'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Convidados', 'jwtVersion', {
      type: Sequelize.INTEGER,
      allowNull: false,
      after: 'invitations',
      defaultValue: 0,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Convidados', 'jwtVersion');
  }
};
