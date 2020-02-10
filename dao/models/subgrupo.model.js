const {Sequelize ,connection} = require('../connection')
const Model = Sequelize.Model
const produto = require('./produto.model')

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

Grupo.hasMany(produto, {
    foreignKey: 'pessoaId',
    onDelete: 'RESTRICT',
    onUpdate: 'NO ACTION'
});