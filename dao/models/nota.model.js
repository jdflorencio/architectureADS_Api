const {Sequelize ,connection} = require('../connection')
const NotaItens = require('./nota_itens.model')
const Model = Sequelize.Model

class Nota extends Model {}
Nota.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pessoaId: {
        type: Sequelize.INTEGER
    }, 
    numero: {
        type: Sequelize.INTEGER
    }, 
    chave_nfe: {
        type: Sequelize.STRING
    }, 
    data_emissao: {
        type: Sequelize.DATEONLY
    }, 
    data_entrada: {
        type: Sequelize.DATEONLY
    }, 
    valor_desconto: {
        type: Sequelize.DECIMAL
    }, 
    valor_acrecismo: {
        type: Sequelize.DECIMAL
    }, 
    subtotal: {
        type: Sequelize.DECIMAL
    }, 
    total: {
        type: Sequelize.DECIMAL
    }, 
    tipo: {
        type: Sequelize.DECIMAL
    }, 
    base_icms: {
        type: Sequelize.DECIMAL
    }, 
    valor_icms: {
        type: Sequelize.DECIMAL
    }, 
    base_subst: {
        type: Sequelize.DECIMAL
    }, 
    base_ipi: {
        type: Sequelize.DECIMAL
    }, 
    valor_ipi: {
        type: Sequelize.DECIMAL
    }, 
    valor_frete: {
        type: Sequelize.DECIMAL
    }, 
    valor_outros: {
        type: Sequelize.DECIMAL
    }, 
    valor_seguro: {
        type: Sequelize.DECIMAL
    }, 
    log_criacao: {
        type: Sequelize.DECIMAL
    }, 
    log_atualizacao: {
        type: Sequelize.DECIMAL
    }, 
    log_pct_usuario: {
        type: Sequelize.DECIMAL
    }, 
}, {
    sequelize: connection,
    modelName: 'nota',
    tableName: 'nota',
    freezeTableName : true,
    timestamps : false,
    name: {
        singular: 'nota',
        plural: 'notas'
    },
    underscored: false
})

Nota.hasMany(NotaItens, {
    foreignKey: 'notaId',
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION'
});




module.exports = Nota