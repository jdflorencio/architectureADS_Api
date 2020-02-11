const {Sequelize ,connection} = require('../connection')
const Model = Sequelize.Model

class NotaItens extends Model {}
NotaItens.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    notaId: {
        type: Sequelize.INTEGER
    },
    produtoId: {
        type: Sequelize.INTEGER
    },
    cfop: {
        type: Sequelize.STRING
    },
    cst: {
        type: Sequelize.STRING
    },
    quantidade: {
        type: Sequelize.DECIMAL
    },
    valor: {
        type: Sequelize.DECIMAL
    },
    desconto: {
        type: Sequelize.DECIMAL
    },
    acrescimo: {
        type: Sequelize.DECIMAL
    },
    subtotal: {
        type: Sequelize.DECIMAL
    },
    total: {
        type: Sequelize.DECIMAL
    },
    aliq_icms: {
        type: Sequelize.DECIMAL
    },
    base_icms: {
        type: Sequelize.DECIMAL
    },
    valor_icms: {
        type: Sequelize.DECIMAL
    },
    aliq_subst: {
        type: Sequelize.DECIMAL
    },
    base_subst: {
        type: Sequelize.DECIMAL
    },
    aliq_ipi: {
        type: Sequelize.DECIMAL
    },
    base_ipi: {
        type: Sequelize.DECIMAL
    }
},{
    sequelize: connection,
    modelName: 'nota_itens',
    tableName: 'nota_itens',
    freezeTableName : true,
    timestamps : false,
    name: {
        singular: 'nota_itens',
        plural: 'nota_itens'
    },
    underscored: false
})

module.exports =  NotaItens

