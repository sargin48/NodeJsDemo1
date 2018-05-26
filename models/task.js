module.exports = function(sequelize, DataTypes) {
    var task = sequelize.define('Task', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        description: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
                len: [0, 50]
            }
        },
        project_id: {
            type: DataTypes.INTEGER,
            notEmpty: true
        },
    }, {
        timestamps: true,
        createdAt: 'due_date',
        updatedAt: 'updated_at'
    });
    return task;
};