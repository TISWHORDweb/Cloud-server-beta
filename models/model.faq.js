const sequelize = require('../database');
const { DataTypes, Model, col } = require('sequelize');
const queryInterface = sequelize.getQueryInterface();
const sha1 = require('sha1');;
const tableName = "faq";

/**
 * Model extending sequelize model class
 */
class ModelFaq extends Model {
}

ModelFaq.init({
    fid: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    question: {
        type: DataTypes.STRING,
    },
    answer: {
        type: DataTypes.BOOLEAN,
    },
    description: {
        type: DataTypes.STRING,
    }
}, {
    sequelize, tableName
});

sequelize.sync();
module.exports = ModelFaq;