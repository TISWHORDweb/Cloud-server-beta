const sequelize = require('../database');
const { DataTypes, Model, col } = require('sequelize');
const queryInterface = sequelize.getQueryInterface();
const sha1 = require('sha1');;
const tableName = "doctor";

function isJson(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Model extending sequelize model class
 */
class ModelDoctor extends Model {
}

ModelDoctor.init({
    did: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
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
    isApproved: {
        type: DataTypes.BOOLEAN,
    },
    password: {
        type: DataTypes.STRING,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
    },
    pin: {
        type: DataTypes.STRING,
    },
    preferredName: {
        type: DataTypes.STRING,
    },
    referringHospitalName: {
        type: DataTypes.STRING,
    },
    referringHospitalAddress: {
        type: DataTypes.STRING,
    },
    otherAffiliatedHospital: {
        type: DataTypes.STRING,
    },
    otherAffiliatedHospitalAddress: {
        type: DataTypes.STRING,
    },
    speciality: {
        type: DataTypes.STRING,
    },
    bvn: {
        type: DataTypes.STRING,
    },
    doctorsSignature: {
        type: DataTypes.STRING,
    },
    doctorsPicture: {
        type: DataTypes.STRING,
    },
    marketersName: {
        type: DataTypes.STRING,
    },
    nameofFirstPatientReferred: {
        type: DataTypes.STRING,
    },
    blocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    registrationToken: { type: DataTypes.STRING  },
    ip: { type: DataTypes.STRING  },
    apiKey: { type: DataTypes.STRING, unique: true },
    token: { type: DataTypes.STRING, unique: true },
    whoIs: { type: DataTypes.INTEGER, defaultValue: 0 },
    lastLogin: { type: DataTypes.STRING },
    marketersName: {
        type: DataTypes.STRING,
    },
}, {
    sequelize, tableName
});
//queryInterface.removeColumn('doctor', 'password');

// queryInterface.addColumn(tableName, 'marketersName', { type: DataTypes.STRING });
// queryInterface.addColumn(tableName, 'password', { type: DataTypes.STRING });
// queryInterface.addColumn(tableName, 'token', { type: DataTypes.STRING });
// queryInterface.addColumn(tableName, 'ip', { type: DataTypes.STRING });
// queryInterface.addColumn(tableName, 'whoIs', { type: DataTypes.STRING });
// queryInterface.addColumn(tableName, 'lastLogin', { type: DataTypes.STRING });
// queryInterface.addColumn(tableName, 'blocked', { type: DataTypes.BOOLEAN, defaultValue: false });


sequelize.sync();
module.exports = ModelDoctor;