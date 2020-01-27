const {Sequelize, connection} = require('../connection');
const Model = Sequelize.Model;
const pessoaEndereco = require('./endereco.model');
const pessoaTelefone = require('./telefone.model');

class Pessoa extends Model {}
Pessoa.init( {
		id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		nome: {
			type: Sequelize.STRING(60),
			allowNull: false,
			field: 'nome'
		},
		dataNascimento: {
			type: Sequelize.DATEONLY,
			allowNull: true,
			field: 'data_nascimento'
		}
	}, {
		sequelize: connection,
		tableName: 'pessoa',
		freezeTableName : true,
		timestamps : false,
		name:{
            singular:'pessoa',
            plural: 'pessoa'
		},
		underscored : false
    });

    Pessoa.hasMany(pessoaEndereco, {
        foreignKey: 'pessoa_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    });
    
    Pessoa.hasMany(pessoaTelefone, {
        foreignKey: 'pessoa_id',
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION'
    }); 

module.exports = Pessoa;    

