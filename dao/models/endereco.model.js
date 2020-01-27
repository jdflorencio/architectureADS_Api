const {Sequelize, connection} = require('../connection');
const Model = Sequelize.Model;

class PessoaEndereco extends Model {}
PessoaEndereco.init( {
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
		logradouro: {
			type: Sequelize.STRING(40),
			allowNull: true,
			field: 'logradouro'
        },
        numero: {
			type: Sequelize.STRING(6),
			allowNull: true,
			field: 'numero'
        },
        bairro: {
			type: Sequelize.STRING(60),
			allowNull: true,
			field: 'bairro'
        },
        cidade: {
			type: Sequelize.STRING(60),
			allowNull: true,
			field: 'cidade'
        },
        uf: {
			type: Sequelize.STRING(2),
			allowNull: true,
			field: 'uf'
		}
	}, {
		sequelize: connection,
		tableName: 'endereco',
		freezeTableName : true,
		timestamps : false,
		name:{
            singular:'endereco',
            plural: 'enderecos'
		},
		underscored : false
    });

module.exports = PessoaEndereco;    

