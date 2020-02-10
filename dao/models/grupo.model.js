const {Sequelize ,connection} = require('../connection')
const Model = Sequelize.Model
const produto = require('./produto.model')
const subgrupo = require('./produto.model')

class Grupo extends Model{}
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
	log_pct_usuario:{
        type: Sequelize.INTEGER
    }
},
{
    sequelize: connection,
    modelName: 'grupo',
    tableName: 'grupo',
    freezeTableName : true,
    timestamps : false,
    name:{
        singular:'grupo',
        plural: 'grupos'
    },
    underscored : false
});

Grupo.hasMany(subgrupo, {
    foreignKey: 'grupoId',
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION'
});

Grupo.hasMany(produto, {
    foreignKey: 'grupoId',
    onDelete: 'RESTRICT',
    onUpdate: 'NO ACTION'
});

module.exports = Grupo