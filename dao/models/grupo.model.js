const { Sequelize, connection } = require('../connection')
const Model = Sequelize.Model
const Subgrupo = require('./subgrupo.model')

class Grupo extends Model { }
Grupo.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descricao: Sequelize.STRING,
    log_criacao: {
        type: Sequelize.DATE
    },
    log_atualizacao: {
        type: Sequelize.DATE
    },
    log_pct_usuario: {
        type: Sequelize.INTEGER
    }
},
    {
        sequelize: connection,
        tableName: 'grupo',
        freezeTableName: true,
        timestamps: false,
        name: {
            singular: 'grupo',
            plural: 'grupos'
        },
        underscored: false
    });

Grupo.hasMany(Subgrupo, {
    foreignKey: 'grupoId',
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION'
});

Subgrupo.belongsTo(Grupo);

module.exports = Grupo