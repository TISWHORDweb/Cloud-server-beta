const sequelize = require('../database');
const { DataTypes, Model, col } = require('sequelize');
const queryInterface = sequelize.getQueryInterface();
const sha1 = require('sha1');;
const tableName = "patient";

/**
 * Model extending sequelize model class
 */
class ModelPatient extends Model {
}

ModelPatient.init({
    pid: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "Must be a valid email address",
            },
        },
    },
    gender: {
        type: DataTypes.STRING,
    },
    birthDate: {
        type: DataTypes.BOOLEAN,
    },
    doctor: {
        type: DataTypes.STRING,
    }
}, {
    sequelize, tableName
});

sequelize.sync();
module.exports = ModelPatient;