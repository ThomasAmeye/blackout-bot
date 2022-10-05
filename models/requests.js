// Require Sequelize
const { Sequelize, DataTypes } = require("sequelize");
const { dbhost, dbuser, dbpass, dbname } = require('./../config.json');
const sequelize = new Sequelize(
    dbname,
    dbuser,
    dbpass, {
        host: dbhost,
        dialect: 'mysql',
    });

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});
const Requests = sequelize.define('Requests', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    material: DataTypes.STRING,
    location: DataTypes.STRING,
    requested_by: DataTypes.STRING,
    completed_by: DataTypes.STRING
});
Requests.sync();

module.exports = {
    name: 'requests',
    async getAllRequests() {
        const requests = await Requests.findAll({ where: { completed_by: null } });
        return requests;
    },
    async createRequest(request) {
        const createdRequest = await Requests.create({ material: request.resourceNeeded, location: request.location, requested_by: request.user });
        return createdRequest;
    },
    async updateRequest(request) {
        const updateRequest = await Requests.update({ completed_by: request.completed_by }, { where: { id: request.id } });
        return updateRequest;
    }
};