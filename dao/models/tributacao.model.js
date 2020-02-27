const {Sequelize ,connection} = require('../connection')
const Produto = require('./produto.model')
const Model = Sequelize.Model

class Tributacao extends Model {}
Tributacao.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },  
    descricao: {
        type: Sequelize.STRING
    },
    cfop_dentro_estado: {
        type: Sequelize.STRING
    },
    cfop_fora_estado: {
        type: Sequelize.STRING
    },
    aliq_icms_venda_dentro_estado: {
        type: Sequelize.DECIMAL
    },
    aliq_icms_venda_fora_estado: {
        type: Sequelize.DECIMAL
    },
    aliq_icms_reducao_venda: {
        type: Sequelize.DECIMAL
    },
    cst_base_venda: {
        type: Sequelize.DECIMAL
    },
    cst_pis_venda: {
        type: Sequelize.DECIMAL
    },
    aliq_pis_venda: {
        type: Sequelize.DECIMAL
    },
    cst_cofins_venda: {
        type: Sequelize.DECIMAL
    },
    aliq_cofins_venda: {
        type: Sequelize.DECIMAL
    },
    aliq_icms_compra_dentro_estado: {
        type: Sequelize.DECIMAL
    },
    aliq_icms_compra_fora_estado: {
        type: Sequelize.DECIMAL
    },
    aliq_icms_reducao_compra: {
        type: Sequelize.DECIMAL
    },
    cst_base_compra: {
        type: Sequelize.STRING
    },
    cst_pis_compra: {
        type: Sequelize.STRING
    },
    aliq_pis_compra: {
        type: Sequelize.STRING
    },
    cst_cofins_compra: {
        type: Sequelize.STRING
    },
    aliq_cofins_compra: {
        type: Sequelize.STRING
    },
    mva: {
        type: Sequelize.DECIMAL
    },
    log_criacao: {
        type: Sequelize.DATEONLY
    },
    log_atualizacao: {
        type: Sequelize.DATEONLY
    },
    log_pct_usuario: {
        type: Sequelize.DATEONLY
    },
},{
    sequelize: connection,
    tableName: 'tributacao',
    freezeTableName : true,
    timestamps : false,
    name: {
        singular: 'tributacao',
        plural: 'tributacoes'
    },
    underscored: false
})

Tributacao.hasMany(Produto, {
    foreignKey: 'tributacaoId',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
});

Produto.belongsTo(Tributacao)


module.exports = Tributacao