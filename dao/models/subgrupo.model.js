const {Sequelize ,connection} = require('../connection')
const Model = Sequelize.Model
const produto = require('./produto.model')

class Subgrupo extends Model{}
Subgrupo.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    grupoId: {
        type: Sequelize.INTEGER
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
    modelName: 'subgrupo',
    tableName: 'subgrupo',
    freezeTableName : true,
    timestamps : false,
    name:{
        singular:'subgrupo',
        plural: 'subgrupos'
    },
    underscored : false
});

Subgrupo.hasMany(produto, {
    foreignKey: 'subgrupoId',
    onDelete: 'RESTRICT',
    onUpdate: 'NO ACTION'
});


module.exports = Subgrupo