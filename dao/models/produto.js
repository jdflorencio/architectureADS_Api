const {Sequelize ,connection} = require('../connection')
const Model = Sequelize.Model

class Produto extends Model{}

PermissionStatus.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    referencia: {
        type: Sequelize.INTEGER     
    },
	descricao: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    codigo_ean: {
        type: Sequelize.STRING,
        allowNull: true,
    },    
	estoque_atual: {
        type: Sequelize.DECIMAL,
    },
    estoque_minino: {
        type: Sequelize.DECIMAL,
    },	 
	estoque_maximo: {
        type: Sequelize.DECIMAL,
    },
	vl_custo: {
        type: Sequelize.DECIMAL
    },
	vl_venda: {
        type: Sequelize.DECIMAL
    },
	ncm: {
        type: Sequelize.STRING
    },
	status: {
        type: Sequelize.ENUM,
        values: ['ATIVO', 'INATIVO']
    },
	fabricante: {
        type: Sequelize.STRING
    },
	log_criacao: {
        type: Sequelize.DATE
    },
	log_atualizacao: {
        type: Sequelize.DATE    },
	log_pct_usuario:{
        type: Sequelize.INTEGER
    }
}, {
    sequelize: connection,
    modelName: 'produto',
    tableName: 'produto',
    freezeTable: true,
    timestamp: false,
    name: {
        singular: 'produto',
        plural: 'produtos'
    },
    underscored: false
})

module.exports = Produto