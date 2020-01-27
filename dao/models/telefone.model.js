const {Sequelize, connection} = require('../connection');
const Model = Sequelize.Model;

class PessoaTelefone extends Model {}
PessoaTelefone.init( {
		id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
        },
        pessoaId: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'pessoa',
				key: 'id'
			},
			field: 'pessoa_id'
		},
		tipo: {
			type: Sequelize.INTEGER,
			allowNull: true,
			field: 'tipo'
        },
        numero: {
			type: Sequelize.INTEGER,
			allowNull: true,
			field: 'numero'
        }
	}, {
		sequelize: connection,
		tableName: 'telefone',
		freezeTableName : true,
		timestamps : false,
		name:{
            singular:'telefone',
            plural: 'telefones'
		},
		underscored : false
    });

module.exports = PessoaTelefone;    

