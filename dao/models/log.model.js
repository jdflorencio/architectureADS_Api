const { Sequelize, connection } = require('../connection')
const Model = Sequelize.Model

class Log extends Model { }
Log.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: Sequelize.INTEGER,
    },
    acao: {
        type: Sequelize.ENUM,
        values: ["CADASTRAR", "EDITAR", "ATUALIZAR", "DELETAR"]
    },
    registro: {
        type: Sequelize.STRING
    },
    log_atualizacao: {
        type: Sequelize.DATE
    }
}, {
    sequelize: connection,
    tableName: 'log',
    freezeTableName: true,
    timestamps: false,
    name: {
        singular: 'log',
        plural: 'logs'
    },
    underscored: false
});

// ("TELFONES >>", PessoaTelefone === connection.models.PessoaTelefone)
module.exports = Log;

