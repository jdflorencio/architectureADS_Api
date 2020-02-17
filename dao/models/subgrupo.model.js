const {Sequelize ,connection} = require('../connection')
const Produto = require('./produto.model')
const Model = Sequelize.Model

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
    tableName: 'subgrupo',
    freezeTableName : true,
    timestamps : false,
    name:{
        singular:'subgrupo',
        plural: 'subgrupos'
    },
    underscored : false
});



module.exports = Subgrupo